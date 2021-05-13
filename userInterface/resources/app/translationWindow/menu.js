function updateh1family() {
	var selector = document.getElementById('selecth1FontFamily');
	var family = selector.options[selector.selectedIndex].value;
	var h1 = document.getElementById('translatedText')
	h1.style.fontFamily = family;        
}

document.addEventListener("DOMContentLoaded", function () {
  const menuElement = document.getElementById('example-menu');
  const menu = new SlideMenu(document.getElementById('example-menu'),{
     showBackLink: false,
     position: 'left',
     submenuLinkAfter: ' <strong>â‡?</strong>'
 });

  // Attach the event listener to the *DOM element*, not the SlideMenu instance
  menuElement.addEventListener('sm.open', function () {
    console.log('The menu opens');
  });

  menuElement.addEventListener('sm.close', function () {
    console.log('The menu has closed');
    addJSON()
  });
});

function creaseFontSize() {
    txt = document.getElementById('translatedText');
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    var theInput = document.getElementById("creaseFontSize").value;
    currentSize = parseFloat(style);
    txt.style.fontSize = (theInput) + 'px';
}

function creaseFontSize2() {
    txt = document.getElementById('extractedText');
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    var theInput = document.getElementById("creaseFontSize2").value;
    currentSize = parseFloat(style);
    txt.style.fontSize = (theInput) + 'px';
}

//function increaseFontSizeBy1px() {
//    txt = document.getElementById('translatedText');
//    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
//    currentSize = parseFloat(style);
//    txt.style.fontSize = (currentSize + 1) + 'px';
//}

//function decreaseFontSizeBy1px() {
//    txt = document.getElementById('translatedText');
//    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
//    currentSize = parseFloat(style);
//    txt.style.fontSize = (currentSize - 1) + 'px';
//}

var theInput = document.getElementById("favcolor");
theInput.addEventListener("input", function() {
var theColor = theInput.value;
document.getElementById("translatedText").style.color = theInput.value;

}, false);

var theInput4 = document.getElementById("favcolor3");
theInput4.addEventListener("input", function() {
var theColor4 = theInput4.value;
document.getElementById("extractedText").style.color = theInput4.value;

}, false);

//var theInput5 = document.getElementById("favcolor2");
//theInput5.addEventListener("input", function() {
//var theColor5 = theInput5.value;
//document.getElementById("menubar").style.backgroundColor = theInput5.value;
//document.getElementById("container").style.backgroundColor = theInput5.value;
//
//}, false);

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

var theInput2 = document.getElementById("baccolor");
theInput2.addEventListener("input", function() {
var theColor2 = hexToRgbA(theInput2.value);
var theColor3 = theInput3.value;
theColor2 = theColor2.replace(/[\d\.]+\)$/g, theColor3+')')
theColor4 = theColor2.replace(/[\d\.]+\)$/g, 1+')')
document.getElementById("container").style.backgroundColor = theColor2;
document.getElementById("menubar").style.backgroundColor = theColor4;

}, false);

var theInput3 = document.getElementById("opacolor");
theInput3.addEventListener("input", function() {
var theColor3 = theInput3.value;	
var theColor2 = hexToRgbA(theInput2.value);
document.getElementById("container").style.backgroundColor = theColor2.replace(/[\d\.]+\)$/g, theColor3+')');
}, false);

const {ipcRenderer} = require('electron');
const closeApp = document.getElementById('close-btn');
closeApp.addEventListener('click', () => {
    ipcRenderer.send('close-me')
});

const checkBox = document.getElementById('subscribeNews');
checkBox.addEventListener("change", updateBackground);
updateBackground();

function updateBackground() {
  document.getElementById("menubar").className = checkBox.checked ? "" : "menubaroff";
  //document.getElementById("container").className = checkBox.checked ? "" : "rad";
}

const checkBox2 = document.getElementById('subscribeNews2');
checkBox2.addEventListener("change", updateBackground2);
updateBackground2();

function updateBackground2() {
  document.getElementById("translatedText").className = checkBox2.checked ? "texshad" : "";
}

const checkBox3 = document.getElementById('subscribeNews3');
checkBox3.addEventListener("change", updateBackground3);
updateBackground3();

function updateBackground3() {
  document.getElementById("container").className = checkBox3.checked ? "" : "non";
}

const checkBox4 = document.getElementById('subscribeNews4');
checkBox4.addEventListener("change", updateBackground4);
updateBackground4();

function updateBackground4() {
  document.getElementById("extractedText").className = checkBox4.checked ? "texshad" : "";
}

//var info = [];
//function addJSON() {
//    var menubar = document.getElementById('menubar').className;
//    var container = document.getElementById('container').className;
//    var translatedText = document.getElementById('translatedText').className;
//    var container2 = document.getElementById('container').style.backgroundColor;
//    var translatedText2 = document.getElementById('translatedText').style.fontSize;
//    var translatedText3 = document.getElementById('translatedText').style.color;
//    var newObject = {
//        "menubar": menubar,
//       "container": container,
//        "translatedText": translatedText,
//        "container2": container2,
//        "translatedText3": translatedText3
//    };
//    info.push(newObject);
//}
var fs = require('fs');
function addJSON() {
// create a JSON object
var menubar = document.getElementById('menubar').className;
var container = document.getElementById('container').className;
var translatedText = document.getElementById('translatedText').className;
var container2 = document.getElementById('container').style.backgroundColor;
var translatedText2 = document.getElementById('translatedText').style.fontSize;
var translatedText3 = document.getElementById('translatedText').style.color;
var translatedText4 = document.getElementById('translatedText').style.fontFamily;

var menubar2 = document.getElementById('menubar').style.backgroundColor;
var extractedText = document.getElementById('extractedText').className;
var extractedText2 = document.getElementById('extractedText').style.fontSize;
var extractedText3 = document.getElementById('extractedText').style.color;

const user = {
        "menubar": menubar,
        "container": container,
        "translatedText": translatedText,
        "container2": container2,
        "translatedText2": translatedText2,
        "translatedText3": translatedText3,
        "translatedText4": translatedText4,
        "menubar2": menubar2,
        "extractedText": extractedText,
        "extractedText2": extractedText2,
        "extractedText3": extractedText3
};

// convert JSON object to string
const data = JSON.stringify(user);

// write JSON string to a file
fs.writeFile('./savedata.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
}

function readJSON() {
fs.open('./savedata.json', 'r', function (err, fd) {
    
                            if (err) {
                            return console.error(err);
    }
    
                            var buffr = new Buffer(1024);
    
    fs.read(fd, buffr, 0, buffr.length, 0, function (err, bytes) {
       
                            if (err) throw err;
            
                            // Print only read bytes to avoid junk.
                            if (bytes > 0) {
            //console.log(buffr.slice(0, bytes).toString());
            var users = JSON.parse(buffr.slice(0, bytes).toString());
            console.log(users)
            if(!users.menubar == "") {
              document.getElementById("subscribeNews").checked = false;
            }
            if(!users.container == "") {
              document.getElementById("subscribeNews3").checked = false;
            }
            if(users.translatedText == "") {
              document.getElementById("subscribeNews2").checked = false;
            }
            if(users.container2) {
              const color = users.container2;
              const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
              const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
              document.getElementById("baccolor").value = hex;
            }
            if(users.translatedText2) {
              document.getElementById("creaseFontSize").value = parseInt(users.translatedText2, 10);
            }
            if(users.translatedText3) {
              const color = users.translatedText3;
              const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
              const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
              document.getElementById("favcolor").value = hex;
            }
            if(users.translatedText4) {
              var delayInMilliseconds = 3000; //1 second

              setTimeout(function() {
                document.getElementById("selecth1FontFamily").value = users.translatedText4;
              }, delayInMilliseconds);
              
            }
            //if(users.menubar2) {
            //  const color = users.menubar2;
            //  const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
            //  const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
            //  document.getElementById("favcolor2").value = hex;
            //}
            if(users.extractedText == "") {
              document.getElementById("subscribeNews4").checked = false;
            }
            if(users.extractedText2) {
              document.getElementById("creaseFontSize2").value = parseInt(users.extractedText2, 10);
            }
            if(users.extractedText3) {
              const color = users.extractedText3;
              const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
              const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
              document.getElementById("favcolor3").value = hex;
            }
             document.getElementById('menubar').className = users.menubar ;
             document.getElementById('container').className = users.container ;
             document.getElementById('translatedText').className = users.translatedText ;
             document.getElementById('container').style.backgroundColor = users.container2 ;
             document.getElementById('translatedText').style.fontSize = users.translatedText2 ;
             document.getElementById('translatedText').style.color = users.translatedText3 ;
             document.getElementById('translatedText').style.fontFamily = users.translatedText4 ;

             document.getElementById('menubar').style.backgroundColor = users.menubar2;
             document.getElementById('extractedText').className = users.extractedText;
             document.getElementById('extractedText').style.fontSize = users.extractedText2;
             document.getElementById('extractedText').style.color = users.extractedText3;
        }
        
                            // Close the opened file.
        fs.close(fd, function (err) {
                            if (err) throw err;
        });
    });
});
}
readJSON()