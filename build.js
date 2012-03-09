#!/usr/bin/env node

var program = require('commander');
var util = require('util');
var http = require('http');
var temp = require ('temp');
var fs = require('fs');

program
    .version('0.0.1')
    .option('-j, --jquery <jquery>',
      'The jQuery version to download. Default 1.7.1',
      String,
      '1.7.1')
    .option('-d, --directory <directory>',
      'The directory to do the build in. Default /tmp',
      String,
      '/tmp')
    .parse(process.argv);


temp.mkdir('nodethequery',function(err, dirPath) {
  if(err){
    throw err;
  }
  var stream = fs.createWriteStream(dirPath+"/nodethejson.js", {
    flags: "a",
    mode: 0666
  });

  download({},dirPath,stream, function(stream){
    download({},dirPath,stream,function(stream){
      download({},stream,function(){});
    });
  });
  stream.end();

  //add package.json
  //tar and is ready
});

var download = function(options, stream, callback){
  return http.get(
    options,
    function(res) {
      util.log("Got response: " + res.statusCode);
      res.on('data', function(chunk) {
        util.log("Body: " + chunk);
        stream.write(chunk)
        .on('error', function(e) {
          util.log("Got error: " + e.message);
          throw e;
        });
        callback(stream);
      });
    })
    .on('error', function(e) {
      util.log("Got error: " + e.message);
        throw e;
      });
};