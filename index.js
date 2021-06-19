const fs = require('fs');
const config = require('./config.json');
fs.writeFileSync("./"+config.name+".sbv", '', {'flag':'w'})
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
config.sub.forEach((i,index) => {
    var forcedOffset = 0;
    if(!config.sub[index+1]) {
        forcedOffset = i.time+10000;
    } else forcedOffset = config.sub[index+1].time;
    fs.appendFileSync("./"+config.name+".sbv", msToTime(config.offset+i.time)+','+msToTime(config.offset+forcedOffset)+"\n"+i.words[0].string+"\n\n");
})