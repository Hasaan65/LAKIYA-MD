const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");
const axios = require("axios");
//==============================================
const downloadAndExtractMegaZip = (megaLink) => 
  new Promise((resolve, reject) => {
    try {
      console.log("Downloading Files...📥");
      const megaFile = File.fromURL(megaLink);
      const currentDirectory = process.cwd();
      const zipFilePath = path.join(currentDirectory, "lakiya.zip");

      megaFile.download((error, fileBuffer) => {
        if (error) {
          return reject(error);
        }

        fs.writeFileSync(zipFilePath, fileBuffer);
        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(currentDirectory, true);
        fs.unlinkSync(zipFilePath);

        console.log("Downloading Success And Starting ✅");
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });

const main = async () => {
  try {
    console.log("Fetching Sula MD data...🚀");
    const response = await axios.get(
      "https://raw.githubusercontent.com/ahdamayasidkhndfamayailoveyou/ffffv/refs/heads/main/sfh.json"
    );
    const { zip } = response.data;
    await downloadAndExtractMegaZip(zip);

    require("./index.js");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

main();
