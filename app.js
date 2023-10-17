const express = require('express');
const { main } = require('./download');
const app = express();
const port = 8080;

app.use(express.json());

app.post('/download-video', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.json({ success: false, message: "Please provide Loom URL download video!" });
    }

    const response = await main(url);
    return res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});