const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API route
app.post("/summarize", (req, res) => {

    const text = req.body.text;

    if (!text) {
        return res.json({ summary: "No text provided" });
    }

    // 🔹 Step 1: Split into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    // 🔹 Step 2: Word frequency
    const words = text.toLowerCase().match(/\w+/g);
    const freq = {};

    words.forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
    });

    // 🔹 Step 3: Score sentences
    const scored = sentences.map(sentence => {
        const sentenceWords = sentence.toLowerCase().match(/\w+/g);
        let score = 0;

        sentenceWords.forEach(word => {
            score += freq[word] || 0;
        });

        return { sentence, score };
    });

    // 🔹 Step 4: Sort by importance
    scored.sort((a, b) => b.score - a.score);

    // 🔹 Step 5: Pick top 2 sentences
    const summary = scored
        .slice(0, 2)
        .map(item => item.sentence.trim())
        .join(" ");

    res.json({ summary });
});

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});