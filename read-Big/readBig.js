const fs = require('fs').promises;

(async()=>{

  const fileHandleRead = await fs.open("test.txt", "r")

  const stream = fileHandleRead.createReadStream({highWaterMark:64*1024})
  stream.on("data", (chunk)=>{
    console.log(chunk)
  })
})()