 const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "info",
    aliases: [],
    author: "Zenilde",// don't change the author name 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "Un instant je vous envoie les informations de mon père 😪...";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: 'MERDI MADIMBA',
          gender: '𝑴𝒂𝒍𝒆',
          hobby: ',,,',
          relationship: 'EN couple avec marcy mk 🌹',
          facebookLink: 'https://www.facebook.com/merdi.madimba.39',
          bio: 'Toujours faire de mon mieux '
        };
         const videoUrl = "https://drive.google.com/uc?export=download&id=1uFLIV0C-yqArk-Ne-_4HfWa-KtRw4S7d"

        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
          Name: ${ownerInfo.name}
          Gender: ${ownerInfo.gender}
          Hobby: ${ownerInfo.hobby}
          Relationship: ${ownerInfo.relationship}
          Facebook: ${ownerInfo.facebookLink}
          Status: ${ownerInfo.bio}
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();

        if (lowerCaseBody === "info" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };

/*

To add new video 
1. upload your video on drive
2. after uploading change the video acces to anyone with the link 
3. copy video link
4. go to direct drive link convert website
5. paste that link there and copy direct link
6. paste that link in code 

*/
