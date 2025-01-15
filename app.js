const express = require('express');
const { main, isLoomVideoUrl } = require('./download');
const app = express();
let port = 8080;

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Check if port is in use and set to a different port if necessary
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        port++;
        console.log(`Port 8080 in use, switching to port ${port}`);
        server.close(); // Close the previous server
        server.listen(port); // Start a new server on the new port
    }
});

app.use(express.json());

app.post('/download-video', async (req, res) => {
    const url = req.body.url;

    if (!url || (url && !isLoomVideoUrl(url))) {
        return res.json({ success: false, message: "Please provide a loom video URL!" });
    }

    const response = await main(url);
    return res.json(response);
});