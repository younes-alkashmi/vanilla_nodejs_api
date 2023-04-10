const fs = require("fs");

function writeToFile(filename, contnet) {
  fs.writeFileSync(filename, JSON.stringify(contnet), "utf8", (err) => {
    if (err) console.log(err);
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunck) => {
        body += chunck.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeToFile,
  getPostData,
};
