const fs = require('fs').promises;

(async () => {
  try {
    const fileHandleRead = await fs.open('src.txt', 'r');
    const fileHandleWrite = await fs.open('dest.txt', 'w');

    const streamRead = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });
    const streamWrite = fileHandleWrite.createWriteStream();

    streamRead.pipe(streamWrite);

    streamRead.on('end', () => {
      console.log('File read complete.');
    });

    streamWrite.on('finish', () => {
      console.log('File write complete.');
    });
  } catch (err) {
    console.error(err);
  }
})();
