---

# Loom Video Downloader

Loom Video Downloader is a simple Node.js api to download videos from loom.com.

## Getting Started

To run this tool, you need to have Node.js and npm installed on your machine.

### Installation

1. Clone the repo: `git clone https://github.com/more03625/loom-video-downloader.git`
2. Install NPM packages: `npm install`

### Dependencies

This tool uses the following npm packages:

- `axios` - Promise based HTTP client for the browser and Node.js.
- `fs` - File system module that allows you to work with the file system on your computer.
- `https` - HTTPS is the HTTP protocol over TLS/SSL.

## Usage

To download a video from loom.com, run the following command, replacing the URL with the URL of the video you want to download:

1. npm install
2. npm run dev
3. Go to the postman & create POST request with `url` parameter.
4. Your loom video will be downloaded to your local folder.
5. This will download the video and save it as `[VideoId].mp4`.
---