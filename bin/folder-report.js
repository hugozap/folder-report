#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var Hogan = require('hogan.js');
var lib = path.join(path.dirname(fs.realpathSync(__filename)),'../lib')
var generator = require('../lib/generator');


var folders = generator.loadFolderStructure(__dirname);
folders.forEach(function(folder){
	console.log('folder:'+folder.path);
	folder.files.forEach(function(folderFile){
		console.log('--'+folderFile.path);
	})
})