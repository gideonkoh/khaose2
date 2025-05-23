const helpObj = {
  "commands": [
    ["'outest'",
      "Return to the outest layer."
    ],
    [
      "'lyrics'",
      "Check out the lyrics of each song in the very first EP written by Khaosé."
    ],
    [
      "'blog'",
      "Read parts of Khaosé journey - if you're interested that is."
    ],
    [
      "'photos'",
      "If you want to see Khaosé being awkward..."
    ],
    ["'banner'",
      "Display the banner again."
    ],
    ["'clear'",
      "Clear the terminal."
    ]
  ],
}

const createHelp = () : string[] => {
  const help : string[] = []
  help.push("<br>")

  helpObj.commands.forEach((ele) => {
    const SPACE = "&nbsp;";
    let string = "";
    string += SPACE.repeat(2);
    string += "<span class='command'>";
    string += ele[0];
    string += "</span>";
    string += SPACE.repeat(17 - ele[0].length);
    string += ele[1];
    help.push(string);
  })

  help.push("<br>");
  help.push("You may find more commands highlighted by the system when you visit the various pages at the outest layer.");
  help.push("<br>");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push("Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands.");
  help.push("<br>");
  return help
}

export const HELP = createHelp();
