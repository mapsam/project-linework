var config = require('./config'),
    archiver = require('archiver');
    fs = require('fs');




// console.log(config.waka);

fs.readdir('./linework-sets', callback);

function callback(err, data) {
  console.log(data);

  for (var i = 0; i < data.length; i++) {
    (function(object) {

      var path = './linework-sets/' + object;
      if (fs.lstatSync(path).isDirectory()) {
        var output = fs.createWriteStream(path + '.zip');
        var archive = archiver('zip');

        output.on('close', function() {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        archive.on('error', function(err) {
          throw err;
        });

        archive.pipe(output);

        archive.bulk([
          { expand: true, cwd: path, src: ['**/*.*'] }
        ]);

        archive.finalize();
      }

    }(data[i]));
  }
}




