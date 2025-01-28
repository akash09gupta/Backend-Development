//Importing fs module (File System)
const fs = require("fs");
//Writing a text in a file (filename, data, callback)
fs.writeFile("demo.txt", "kaise ho", function(err) {
    if (err) console.error(err);
    else console.log("Done");
})

//Append a text in existing file (filename, data, callback)
fs.appendFile("demo.txt", ", mai acha hu", function(err) {
    if (err) console.error(err);
    else console.log("Done");
})

//Rename file (oldfilename, oldfilename, callback)
fs.rename("demo.txt", "newDemo.txt", function(err) {
    if (err) console.error(err);
    else console.log("File renamed");
})

//copy a file in a destination folder (src file, destination, callback)
fs.copyFile("newDemo.txt", "../Nodejs Practice/copy/demo.txt", function(err) {
    if(err) console.error(err);
    else console.log("File copied");
})

//deleting a file using unlink (path, callback)
fs.unlink("newDemo.txt", function(err) {
    if(err) console.error(err);
    else console.log("removed");
})

//removing empty folders using rmdir (path, [options if any thing in folder], callback), it will also we can use as rm only
fs.rmdir("../Nodejs Practice/copy", {recursive:true}, function(err) {
    if(err) console.error(err);
    else console.log("Folder removed");
})

//reading a data from a file
fs.readFile("../JavaScript-Practice/hello.txt", (err, data) => {
    if (err) console.error(err.message);
    else console.log(data.toString());
})