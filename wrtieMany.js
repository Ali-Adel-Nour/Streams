//const fs = require('node:fs/promises');
const fs = require('node:fs');
//Its takes 2.252ms to run uses 100% of the cpu(one core)

/*(async ()=>{
  console.time('writeMany')
  const fileHandle= await fs.open("test.txt", "w")

  for(let i=0; i<100000;i++){
    fileHandle.write(`${i}`)

  }
  console.timeEnd('writeMany')
})()
*/

(async ()=>{
  console.time('writeMany')
 fs.open("test.txt", "w",(err,fd)=>{
  for(let i=0; i<100000;i++){
    fs.writeSync(fd,`${i}`,()=>{})

  }
  console.timeEnd('writeMany')
 })



})()