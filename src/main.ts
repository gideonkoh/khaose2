import command from '../config.json' assert {type: 'json'};
import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { DEFAULT } from "./commands/default";

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isPasswordInput = false;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["help", "banner", "clear"];
const HISTORY : string[] = [];
const REPO_LINK = command.repoLink;

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
      e.preventDefault();
      if (!isPasswordInput) {
        enterKey();
      } 

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;

  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `<span id="prompt">${PROMPT.innerHTML}</span> ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {

  switch(input) {
    // Test questions here
    case 'access':
      writeLines(["<br>"]);
      writeLines(["To access Level 2 and Level 1 content on the main website:"]);
      writeLines(["- Type in the correct commands in the next line to obtain their passwords immediately."]);
      writeLines(["- Else, type <span class='command'>'access level 2'</span> to start finding these commands."]);
      writeLines(["<br>"]);
      break;

    case 'access level 2':
      writeLines(["<br>"]);
      writeLines(["Under maintenance."]);
      writeLines(["Wait for it."]);
      writeLines(["<br>"]);
      break;

    // Other commands

    case 'clear':
      setTimeout(() => {
        if(!TERMINAL || !WRITELINESCOPY) return
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
      })
      break;
    case 'banner':
      writeLines(BANNER);
      break;
    case 'help':
      writeLines(HELP);
      break;
    case 'whoami':     
    //add stuff here 
      break;
    case 'repo':
      writeLines(["Redirecting to github.com...", "<br>"]);
      setTimeout(() => {
        window.open(REPO_LINK, '_blank');
      }, 500);
      break;
    case 'linkedin':
      //add stuff here
      break;
    case 'github':
      //add stuff here
      break;
    case 'email':
      //add stuff here
      break;
    case 'rm -rf':
        //add stuff here
        break;
    case 'sudo':
      //add stuff here
      break;
    case 'ls':
      //add stuff here
      break;
    default:
      writeLines(DEFAULT);
      break;
  }  
}

function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item : string, idx : number) {
  setTimeout(() => {
    if(!mutWriteLines) return
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}


const initEventListeners = () => {
  if(HOST) {
    HOST.innerText= command.hostname;
  }

  if(USER) {
    USER.innerText = command.username;
  }

  if(PRE_HOST) {
    PRE_HOST.innerText= command.hostname;
  }

  if(PRE_USER) {
    PRE_USER.innerText = command.username;
  } 

    window.addEventListener('load', () => {
    writeLines(BANNER);
  });
  
  USERINPUT.addEventListener('keypress', userInputHandler);
  USERINPUT.addEventListener('keydown', userInputHandler);

  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  // pleading message
  console.log(`Are you trying to violate me and force vulnerable answers out of me? I know I CANNOT stop you from doing so, but what if I tell you that you're violating me by doing so. Would you still do it?`);
}

// stop visitors from opening up Developer Tools
window.addEventListener("keydown", (event) => {
  if(event.ctrlKey && (event.key === "S" || event.key === "s")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "C")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "E" || event.key === "e")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "I" || event.key === "i")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "K" || event.key === "k")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "U" || event.key === "u")) {
     event.preventDefault();
  }
});

initEventListeners();
