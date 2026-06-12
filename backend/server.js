import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Helper function to validate a URL using a HEAD or GET request with a timeout
async function validateUrl(url) {
  if (!url || typeof url !== "string" || !url.startsWith("http")) {
    return false;
  }
  
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("example.com") || lowerUrl.includes("...") || lowerUrl.endsWith("/...")) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    let response;
    try {
      response = await fetch(url, {
        method: "HEAD",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        signal: controller.signal
      });
    } catch (headErr) {
      // If HEAD fails, fall back to GET (some servers block HEAD)
      const getController = new AbortController();
      const getTimeoutId = setTimeout(() => getController.abort(), 4000);
      response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        signal: getController.signal
      });
      clearTimeout(getTimeoutId);
    }

    clearTimeout(timeoutId);

    // 404 means the resource does not exist
    if (response.status === 404) {
      return false;
    }
    
    // Server errors (5xx) mean the resource is broken/inaccessible
    if (response.status >= 500) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(`URL validation failed for ${url}: ${err.message}`);
    // If DNS resolve fails or connection refused or timeout
    if (err.message.includes("ENOTFOUND") || err.message.includes("ECONNREFUSED") || err.name === "AbortError") {
      return false;
    }
    return false;
  }
}

// Perform validation pass on all roadmap urls
async function performValidationPass(roadmap) {
  if (!roadmap || !roadmap.months) return roadmap;

  const validationPromises = [];

  for (const month of roadmap.months) {
    if (month.courses) {
      for (const course of month.courses) {
        validationPromises.push((async () => {
          const isValid = await validateUrl(course.url);
          if (!isValid) {
            console.log(`[Validation] Invalid course URL found and marked unverified: ${course.url}`);
            course.url = "Resource could not be verified";
          }
        })());
      }
    }

    if (month.youtube) {
      for (const yt of month.youtube) {
        validationPromises.push((async () => {
          const isValid = await validateUrl(yt.url);
          if (!isValid) {
            console.log(`[Validation] Invalid YouTube URL found and marked unverified: ${yt.url}`);
            yt.url = "Resource could not be verified";
          }
        })());
      }
    }
  }

  await Promise.all(validationPromises);
  return roadmap;
}

app.post("/api/roadmap", async (req, res) => {
  const { career, scores } = req.body;

  const fitScoreClassification = scores.fitScore >= 51 ? "Strong Fit" : scores.fitScore >= 38 ? "Moderate Fit" : scores.fitScore >= 26 ? "Explore Further" : "Weak Fit";
  const prompt = `You are a career counselor for Indian science students.
Student wants to pursue ${career}. 

Engineering Career-Fit Assessment Results:
- Engineering Fit Score: ${scores.fitScore}/60 (Classification: ${fitScoreClassification})
- Analytical Thinking: ${scores.analytical}%
- Problem Solving: ${scores.problem}%
- Technical Curiosity: ${scores.curiosity}%
- Learning Commitment: ${scores.commitment}%
- Persistence Level: ${scores.persistence}%
- Academic Readiness: ${scores.academic}%
- Financial Capacity: ${scores.financial}%

Generate a 4-month personalized roadmap. Use encouraging language. NEVER say "you cannot". 

CRITICAL RESOURCE RULES:
1. ONLY provide real, working, and highly stable educational links (e.g. from official documentation, Coursera, edX, NPTEL, YouTube channels, Khan Academy, freeCodeCamp, GeeksforGeeks).
2. Never invent or hallucinate URLs. If you are not certain a specific course URL exists, provide the main domain page of a reliable platform (e.g., "https://www.coursera.org" or "https://www.nptel.ac.in").
3. For every course and YouTube channel, specify a difficulty level ("Beginner", "Intermediate", or "Advanced") and a brief "why" explaining why it is recommended.

Respond ONLY in this JSON structure (no markdown wrapper, no extra text):
{
  "summary": "2 sentence encouraging summary",
  "strengths": ["s1","s2","s3"],
  "gaps": ["g1","g2","g3"],
  "months": [
    {
      "month": 1,
      "title": "Title",
      "focus": "Focus area",
      "topics": ["t1","t2","t3"],
      "courses": [
        {
          "name": "Course Name",
          "platform": "Platform Name",
          "url": "Exact working URL or reliable platform domain",
          "free": true,
          "why": "Brief reason why it fits their profile",
          "difficulty": "Beginner/Intermediate/Advanced"
        }
      ],
      "youtube": [
        {
          "channel": "YouTube Channel Name",
          "topic": "Topic Name",
          "url": "Exact working video/channel URL or 'https://youtube.com'",
          "why": "Brief reason why it fits their profile",
          "difficulty": "Beginner/Intermediate/Advanced"
        }
      ],
      "goal": "Monthly goal"
    }
  ],
  "certifications": ["c1","c2"],
  "scholarships": ["s1","s2"],
  "tip": "Final tip"
}`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7
      }),
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data));

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "Groq error: " + JSON.stringify(data) });
    }

    const text = data.choices[0].message.content;
    const roadmap = JSON.parse(text.replace(/```json|```/g, "").trim());
    
    // Run validation pass to filter/flag broken URLs
    const validatedRoadmap = await performValidationPass(roadmap);
    res.json(validatedRoadmap);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Wildcard route to serve React's index.html for client-side routing
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(3001, () => console.log("✅ Backend running on http://localhost:3001"));