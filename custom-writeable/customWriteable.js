const { Writable } = require('node:stream');
//This syntax is used to import Node.js core modules explicitly. Starting with Node.js 13.2.0, you can use the node: prefix to require core modules directly. This allows you to differentiate between built-in core modules and modules installed via npm.

const fs = require('node:fs');

class FileWriteStream extends Writable {
    constructor({ highWatherMark, fileName }) {
        super({ highWatherMark });

        this.fileName = fileName;
        this.fd = null;
        this.chuncks = [];
        this.chunksSize = 0;
        this.writesCount = 0
    }

    //this will run after the constructor and it will put of all
    //methods until we callback the function
    _construct(callback) {
        fs.open(this.fileName, 'w', (err, fd) => {
            //so if we call the callback with an argument its means that we have
            // an error and we should not proceed
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _write(chunck, encoding, callback) {
      this.chuncks.push(chunck)
      this.chunksSize += chunck.lenght

      if(this.chunksSize > this.writeableHighWaterMark){
    fs.write(this.fd,Buffer.concat(this.chunks),(err)=>{
      if(err){
        return callback(err);
      }
      this.chuncks = []
      this.chunksSize = 0
      ++this.writesCount
      callback()
    })
      }else{
        callback()
      }


        //when we are dibe we should call the callback funtion

        //callback()
        // never ever emit from child classes
        //this.emit('drain')
    }
    //write() bad practice
    //_final(){
}
//_destroy() {

const stream = new FileWriteStream({
    highWatherMark: 1800,
    fileName: 'ali.txt',
});

stream.write(Buffer.from('this is some string'));
//stream._write(Buffer.from("this is some string) bad practice")

stream.end(Buffer.from('Our Last write'));

stream.on('drain', () => {});
