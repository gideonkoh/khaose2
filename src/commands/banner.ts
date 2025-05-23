import command from '../../config.json' assert {type: 'json'};

const createBanner = () : string[] => {
  const banner : string[] = [];
  command.ascii.forEach((ele) => {
    let bannerString = "";
    //this is for the ascii art
    for (let i = 0; i < ele.length; i++) {
      if (ele[i] === " ") {
        bannerString += "&nbsp;";
      } else {
        bannerString += ele[i];
      }
    }
    
    let eleToPush = `<pre>${bannerString}</pre>`;
    banner.push(eleToPush);
  });  
  banner.push("<br>");
  banner.push("backend.khaose.com")
  banner.push("v36.0.0");
  banner.push("<br>")
  banner.push("Welcome. You're currently at the outer layer.");
  banner.push("<br>")
  banner.push("Type <span class='command'>'help'</span> to see a list of all available commands.");
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();
