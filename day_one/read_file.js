const fs = require('fs');
const read_file = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = read_file;