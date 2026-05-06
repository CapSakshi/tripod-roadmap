const express = require('express');
const { protect } = require('../middleware/auth');
const https = require('https');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { message, history, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is missing or invalid. Please update your backend .env file.' });
    }

    const systemPrompt = `You are Tripod AI, an expert tutor for a developer roadmap platform. 
The user is studying the roadmap: "${context.roadmapTitle}".
${context.topic ? `They are currently focusing on: "${context.topic}".` : 'They are looking at the overall roadmap.'}
Answer their questions accurately and concisely. Use markdown. Provide clear code examples if needed.`;

    // Filter out the initial model greeting to prevent consecutive 'model' roles
    const cleanHistory = (history || []).filter(msg => !msg.text.includes("Hi! I'm Tripod AI"));

    // Format history for Gemini API
    const formattedHistory = cleanHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const bodyData = JSON.stringify({
      systemInstruction: {
         parts: [{ text: systemPrompt }]
      },
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyData)
      }
    };

    const reqPost = https.request(options, (resPost) => {
      let data = '';
      resPost.on('data', (chunk) => { data += chunk; });
      resPost.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (resPost.statusCode !== 200) {
            console.error('Gemini API Error:', parsedData);
            return res.status(500).json({ success: false, message: parsedData.error?.message || 'Failed to fetch from Gemini API' });
          }
          const reply = parsedData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
          res.json({ success: true, reply });
        } catch (e) {
          res.status(500).json({ success: false, message: 'Invalid response from Gemini API' });
        }
      });
    });

    reqPost.on('error', (e) => {
      console.error('HTTPS Error:', e);
      res.status(500).json({ success: false, message: 'Failed to communicate with AI server.' });
    });

    reqPost.write(bodyData);
    reqPost.end();

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
