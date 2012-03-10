#!/usr/bin/env bash
wget https://raw.github.com/coolaj86/node-jquery/master/src/header.js
wget http://code.jquery.com/jquery-1.7.1.js
wget https://raw.github.com/coolaj86/node-jquery/master/src/footer.js
cat header.js jquery-1.7.1.js footer.js >nodethejson.js
rm header.js jquery-1.7.1.js footer.js