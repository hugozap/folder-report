/* Generador de reportes de resumen de la contabilidad para obassi ltda 
   Genera un archivo html con las carpetas y documentos Al hacer click en 
   una imagen se muestra en el panel de contenido */
   
var path = require('path');
var Hogan = require('hogan.js');
var fs = require('fs');


function Folder(){
	this.name = "";
	this.files = [];
	this.path = "";
}

function FolderFile(){
	this.name = "";
	this.path = "";
}



/* Fase 1: Leer estructura Leer lista de carpetas y archivos 
   TODO: soportar recursion
*/

function loadFolderStructure(){
	var folders = [];
	var basePath = "."
	var files = fs.readdirSync(basePath);
	console.log("processing path: "+basePath);
	files.forEach(function(file){
		var filePath = path.join(basePath,file);
		
		if(fs.statSync(filePath).isDirectory()){
			console.log("processing folder:"+filePath);
			var dirname = file;
			var folder = new Folder();
			folder.name = dirname;
			folder.path = filePath;
			folders.push(folder);
			var folderContents = fs.readdirSync(dirname);
			folderContents.forEach(function(folderItem){
				var itemPath = path.join(folder.path,folderItem);
				if(fs.statSync(itemPath).isFile()){
					var folderFile = new FolderFile();
					console.log("processing file",itemPath);
					folderFile.name = folderItem;
					folderFile.path  = itemPath;
					folder.files.push(folderFile);
				}
			});
		}
		
	});

	return folders;
	
}

/* Fase 2: Generar output */

function generateReport(folders){
	var outputFile = path.join(".","report.html");
	var templatePath = path.join(__dirname,'../templates/index.html');
	var templateContent = fs.readFileSync(templatePath,'utf-8');
	var template = Hogan.compile(templateContent);
	var output = template.render({folders:folders});
	fs.writeFileSync(outputFile,output,'utf-8');

}

module.exports = {
	loadFolderStructure:loadFolderStructure,
	generateReport:generateReport
}