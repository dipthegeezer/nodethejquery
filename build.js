#!/usr/bin/env node

var program = require('commander');
var util = require('util');
var https = require('https');
var http = require('http');
var fs = require('fs');

var download = function(client, options, stream, callback){
  var req = client.get(
    options,
    function(res) {
      util.log("Got response: " + res.statusCode);
      res.on('data', function(chunk) {
        stream.write(chunk);
        if (callback!=null){
          callback(stream);
        }
      });
    })
    .on('error', function(e) {
      util.log("Got error: " + e.message);
        throw e;
      });
  req.end();
  return;
};

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

var stream = fs.createWriteStream("nodethejson.js", {
  flags: "w",
  encoding: null,
  mode: 0666,
  end: false
});

download( https,
  {
  host: 'raw.github.com',
  path: '/coolaj86/node-jquery/master/src/header.js'
  },
  stream,
  function(stream2){
    download( http,
      {
      host: 'code.jquery.com',
      path: '/jquery-'+ program.jquery +'.js'
      },
      stream2,
      function(stream3){
        download( https,
          {
          host: 'raw.github.com',
          path: '/coolaj86/node-jquery/master/src/footer.js'
          },
          stream3,
          null
        );
      }
    );
  }
);
