var log = require('./login');
module.exports = function(app, path, multer) {

    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './freshcodeit.github.io/images')
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        }
    });

    app.post('/upload', log.isLoggedInByPass, function(req, res) {
        var upload = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
                var ext = path.extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
                    return callback(res.end('Only images are allowed'), null);
                }

                callback(null, true);
            }
        }).single('file');
        upload(req, res, function(err) {
            if(err)
                res.end("File is not uploaded");
            res.end('File is uploaded')
        });
    });

};