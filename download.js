const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path');

const fetchLoomDownloadUrl = async (id) => {
  try {
    const { data } = await axios.post(`https://www.loom.com/api/campaigns/sessions/${id}/transcoded-url`);
    return { success: true, message: 'Fetched data', data: data.url }
  } catch (error) {
    return { success: false, message: 'There are some issues while fetching loom download URL.', data: null }
  }
};

const downloadLoomVideo = (url, filename) => {

  try {
    const dir = 'downloaded-videos'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(path.join(dir, filename));
    const request = https.get(url, function (response) {
      response.pipe(file);
    });

    return { success: true, message: 'Video has been downloaded successfully.' }
  } catch (error) {
    return { success: false, message: 'There are some issues while downloading video.' }
  }

};

const isLoomVideoUrl = (url) => {
  const loomDomain = 'www.loom.com';
  const trimmedUrl = url.trim();
  return trimmedUrl.startsWith('https://') && trimmedUrl.includes(loomDomain);
}

const getId = (videoUrl) => {
  const id = videoUrl.split('/').pop().split("?").shift();
  return id
}

const main = async (videoUrl) => {
  const id = getId(videoUrl);
  const urlResponse = await fetchLoomDownloadUrl(id);
  if (urlResponse.success) {
    const filename = `${id}.mp4`;
    const response = downloadLoomVideo(urlResponse.data, filename);
    return response;
  }

  return urlResponse;
};

module.exports = {
  main, isLoomVideoUrl
}