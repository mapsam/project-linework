var config = require('./config'),
    archiver = require('archiver');
    fs = require('fs'),
    s3 = require('s3');

// sets up the amazon credentials from the
// config module
var client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.accessKeySecret,
  },
});

// read the directory
fs.readdir('./linework-sets', callback);

// callback for finding linework sets files
function callback(err, data) {
  // for each file object, create a zip stream
  for (var i = 0; i < data.length; i++) {
    (function(object) {
      var path = './linework-sets/' + object;
      var name = object;
      if (fs.lstatSync(path).isDirectory()) {
        var output = fs.createWriteStream(path + '.zip');
        var archive = archiver('zip');
        archive.pipe(output);

        // when the zip stream is finalized, pass the 
        // object information to the upload function
        output.on('close', function(){
          upload(this, object);
        });
        archive.on('error', function(err) {
          throw err;
        });
        archive.bulk([
          { expand: true, cwd: path, src: ['**/*.*'] }
        ]);
        archive.finalize();
      }
    }(data[i]));
  }
}

// runs for each file object, and uploads to s3
function upload(object, name) {
  var params = {
    localFile: object.path,
    s3Params: {
      Bucket: 'giscollective',
      Key: 'projectlinework/' + name + '.zip',
      ACL: 'public-read'
    },
  };
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}