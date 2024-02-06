const http = require("http");
const fs = require("fs");
const multer = require('multer');

// Create a Multer storage instance with destination and filename options
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Specify the directory where files should be uploaded
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create an instance of Multer with the configured storage options
const upload = multer({ storage: storage });



http.createServer(function(req, res) {
    const path = req.url;

    if (path === "/") {
        res.end("This is Home Page")
    } else if (path === "/about") {
        res.end("This is About Page")
    } else if (path === "/contact") {
        res.end("This is Contact Page")
    } else if (path === "/file-write") {
        fs.writeFile('demo.text', 'hello world', function(err) {
            if (err) {
                res.end("File Writing Fail")
            } else {

                res.end("File Write Success")
            }
        });
    } else if (path === "/file-img" && req.method === 'POST') {

        upload.single('img')(req, res, (err) => {
            if (err) {
                return res.end('Error uploading file.');
            }

            return res.end('Image uploaded successfully.');
        });


    }




}).listen(5500, function() {
    console.log('it starts listening on port 5500.');
});