const fs = require('fs').promises;
//const fs = require('node:fs');
//Its takes 2.252ms to run uses 100% of the cpu(one core)
// this code is not good for production

(async ()=>{
  console.time('writeMany')
  const fileHandle= await fs.open("test.txt", "w")

  const stream = fileHandle.createWriteStream();
  //const buff = Buffer.alloc(10000000,10);
  //stream.write(buff)
//console.log(stream.writableLength)
let i = 0
const writeMany=()=>{
  while( i<1000000){
    const buff = Buffer.from(`${i}`,"utf-8")
    //this our last write
    if(i ===999999){
return stream.end(buff)
    }
    //if stream.write return false,stop the loop
    if(!stream.write(buff)) break;
   i++

  }

}
writeMany();

  stream.on("drain", ()=>{
    console.log("Drainied!")
    writeMany()
  })

  stream.on("finish",()=>{
    console.timeEnd("writeMany")
    //fileHandle.close()
  })

})()

//Its takes 536.549ms to run uses 20% of the cpu(one core)
/*
(async ()=>{
  console.time('writeMany')
 fs.open("test.txt", "w",(err,fd)=>{
  const buff = Buffer.from(`${i}`,"utf-8")
  for(let i=0; i<100000;i++){

    fs.writeSync(fd,buff)

  }
  console.timeEnd("writeMany")

 })



})()*/