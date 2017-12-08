/*
 * build.js
 *
 */

var config = require('./config');
var archiver = require('archiver');
var fs = require('fs');
var s3 = require('s3');
var readline = require('readline');
var queue = require('d3-queue').queue;


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

var stats = {};

fs.readdir('../LINEWORK', function(err, sets) {
  var q = new queue(1);

  sets.forEach(function(set, i) {
    stats[set] = { amount: -1, current: -1, line: i };
    q.defer(upload, set);
  });

  q.awaitAll(function(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('done!');
  });
});



// runs for each file object, and uploads to s3
function upload(name, callback) {
  var path = './linework-sets/' + name;
  var name = name;
  if (fs.lstatSync(path).isDirectory()) {
    var archive = archiver('zip');
    var output = fs.createWriteStream(path + '.zip');
    archive.pipe(output);

    output.on('close', function(){
      var object = this;
      var params = {
        localFile: object.path,
        s3Params: {
          Bucket: 'giscollective',
          Key: 'projectlinework/' + name + '.zip',
          ACL: 'public-read'
        },
      };
      var uploader = client.uploadFile(params);
      uploader.on('error', callback);
      uploader.on('progress', function() {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${name}: ${Math.round(((uploader.progressAmount/uploader.progressTotal)*100)*100)/100}%`);
      });
      uploader.on('end', function() {
        process.stdout.write('\n');
        return callback(null);
      });
    });
    archive.on('error', function(err) {
      throw err;
    });
    archive.bulk([
      { expand: true, cwd: path, src: ['**/*.*'] }
    ]);
    archive.finalize();
  }
}
