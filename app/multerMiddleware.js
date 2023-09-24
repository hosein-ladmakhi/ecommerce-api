const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: "./dest",
  filename: (req, file, cb) => {
    console.log(file);
    const filename =
      new Date().getTime() +
      "-" +
      Math.random() * 100000000 +
      path.extname(file.originalname);
    return cb(null, filename);
  },
});

exports.multerUploader = multer({ storage: diskStorage });
