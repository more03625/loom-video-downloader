const express = require('express');
const { main, isLoomVideoUrl } = require('./download');
const app = express();
const port = 8080;

app.use(express.json());

app.post('/download-video', async (req, res) => {
    const url = req.body.url;

    if (!url || (url && !isLoomVideoUrl(url))) {
        return res.json({ success: false, message: "Please provide a loom video URL!" });
    }

    const response = await main(url);
    return res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});