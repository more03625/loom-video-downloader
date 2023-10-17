const axios = require('axios');
const fs = require('fs');
const https = require('https');

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
    const file = fs.createWriteStream(filename);
    const request = https.get(url, function (response) {
      response.pipe(file);
    });

    console.log('request', request);
    return { success: true, message: 'Video has been downloaded successfully.' }
  } catch (error) {
    return { success: false, message: 'There are some issues while downloading video.' }
  }

};

const main = async (urlFromMain) => {
  const id = urlFromMain.split('/').pop();
  const urlResponse = await fetchLoomDownloadUrl(id);

  if (urlResponse.success) {
    const filename = `${id}.mp4`;
    const response = downloadLoomVideo(urlResponse.data, filename);
    return response;
  }

  return urlResponse;
};

module.exports = {
  main
}