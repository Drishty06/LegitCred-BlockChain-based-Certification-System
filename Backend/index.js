import express from "express";

import { getJSONData } from "./controllers/getJSONData.js";

const app = express();


import multer from "multer";
import cors from "cors";
import path from 'path';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(cors());
// import fs from 'fs';
// import multipartMiddleware from 'connect-multiparty';
// const filePath = './static' + '/document/Document.pdf';
// import fileUpload from 'express-fileupload';
// import bodyParser from 'body-parser';

// app.use(express.json());

// app.use(fileUpload());
// app.post("/", (req, res) => {
//     const filename = Date.now() + "_";
//     const file = req.body;
//     console.log(file);
//     let uploadPath = __dirname + "/uploads/" + filename;
//     file.mv(uploadPath, (err) => {
//       if (err) {
//         return res.send(Err);
//       }
//     });
//     res.send(200);
//   });





// app.post('/receive', multipartMiddleware, (request, response) => {
//     console.log(request.files.pdf_file.path);
//     fs.readFile(request.files.pdf_file.path, (err, data) => {
//         fs.writeFile(filePath, data, function (err) {
//             if (err) throw err;
//             response.send('Done')
//         });
//     })
// })


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.single("pdf"), (req, res) => {
//     const data = req.body.file;
//     // const fileName = "temp.pdf";
//     console.log(JSON.stringify(data));
//     // fs.writeFile(`uploads/${fileName}`, data, (err) => {
//     //     if (err) {
//     //     console.error(err);
//     //     res.status(500).send("Error uploading file");
//     //     } else {
//     //     res.send("File uploaded successfully");
//     //     }
//     // });
//     res.send("hello");
// });


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const Storage = multer.diskStorage({
    // Destination to store pdf  
    destination: 'uploads', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field 
            // path.extname get the uploaded file extension
    }
});
const upload = multer({
    storage: Storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf)$/)) { 
         // upload only pdf
         console.log("in filefilter----")
         return cb(new Error('Please upload a pdf'))
       }
     cb(undefined, true)
  }
}) 


//Upload route
app.post('/upload', upload.single('pdf'), (req, res) => {
  console.log("in post route---");
  console.log(req.file);
    res.send(req.file);
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

  

app.get("/getjsondata/:jsonCID", getJSONData);

app.listen(5000, () => console.log("Server is running on port 5000"));
