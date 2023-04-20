const fs = require('fs').promises;
//const fs = require('node:fs');
//Its takes 2.252ms to run uses 100% of the cpu(one core)
// this code is not good for production

(async ()=>{
  console.time('writeMany')
  const fileHandle= await fs.open("test.txt", "w")

  const stream = fileHandle.createWriteStream();

  for(let i=0; i<100000;i++){
    const buff = Buffer.from(`${i}`,"utf-8")
    stream.write(buff)
    fileHandle.write(`${i}`)

  }
  console.timeEnd('writeMany')
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