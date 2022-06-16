const static = require('node-static');
const http = require('http');
const path = require('path');
const multiparty = require('multiparty');
const { exec } = require("child_process");
const Str = require('@supercharge/strings')

var file = new (static.Server)(path.join(__dirname, "static"));

http.createServer(function (req, res) {
    if (req.url == "/uploadQuilt") {
        const form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            try {
                const quiltTmpPath = files['quilt'][0].path;
                console.log('quiltTmpPath', quiltTmpPath);
                const key = Str.random(50)
                const out = path.join(__dirname, "static", "quilts", `${key}.mp4`)
                exec(`liquilt "${quiltTmpPath}" "${out}"`, (error, stdout, stderr) => {
                    console.log("done", error, stdout, stderr);
                    if (error) {
                        res.end("liquilt cli error: " + error.message);
                        return;
                    }
                    res.writeHead(301, {
                        Location: 'viewer.html#' + key
                    }).end();
                });
            }
            catch (e) {
                console.error(e);
                res.end("Error: " + e);
            }
        });
        return;
    }
    file.serve(req, res);
}).listen(8080);
