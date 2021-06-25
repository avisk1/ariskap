const dir = "https://rubish.netlify.app/";
const downloads = document.getElementsByClassName("download");
const nav = document.getElementById("nav");
const navOptions = nav.getElementsByTagName("a");
const hamburger = document.getElementById("hamburger-container");
const hamburgerChildren = hamburger.children;
const navChildren = nav.children;

function writeToServerFile(output, file) {
    var data = new FormData();
    data.append("data" , output);
    data.append("file", file);
    const xhttp = new XMLHttpRequest();
    xhttp.open( 'POST', "../pleaseWork.php", true );
    xhttp.send(data);
}

function request(file, func) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText);
        } else {
            console.log("@$?#%!");
        }
    };
    xhttp.open("GET", "../" + file, true);
    xhttp.send();
}

function incrementVisits(currentVisits) {
    localStorage.setItem("visitedcap", "true");
    writeToServerFile((parseInt(currentVisits) + 1).toString(), "visits.txt");
}

window.addEventListener('load', (event) => {
    const element = document.querySelector('[title="Hosted on free web hosting 000webhost.com. Host your own website for FREE."]');
    if (element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
    }
    if (!localStorage.getItem("visitedcap")) {
        request("visits.txt", incrementVisits);
    }
});

//====SITE-NAVIGATION====

function navPage(branch) {
    window.location.href = dir + branch;
}

//=====MENU DROPDOPWN====
const project = document.getElementsByClassName("project-container");
[...project].forEach((element) => {
    let open;
    let close;
    let toggled = false;
    const header = element.querySelector(".project-header");
    header.addEventListener("click", () => {
        const details = element.querySelector(".project-details");
        if (toggled) {
            toggled = false;
            clearInterval(open);
            let maxHeight = getComputedStyle(details).height.slice(0, -2);
            close = setInterval(() => {
                if (maxHeight == 0) {
                    clearInterval(close);
                } else {
                    details.style.maxHeight = (maxHeight -= 5) + "px";
                }
            }, 5);
            header.style.backgroundColor = "white";
        } else {
            clearInterval(close);
            toggled = true;
            let maxHeight = parseInt(getComputedStyle(details).maxHeight.slice(0, -2));
            open = setInterval(() => {
                if (maxHeight > getComputedStyle(details).height.slice(0, -2)) {
                    clearInterval(open);
                } else {
                    details.style.maxHeight = (maxHeight += 5) + "px";
                }
            }, 5);
            header.style.backgroundColor = "#DDDCDC";
        }
    })
})

//========ERRORS=========

const error = { };
error.elementNotFound = (el) => {
    console.error(`"${el}" element not found`);
}

//=========MOBILE========

function mobileDisplay(px) {
    if (screen.width <= px) {
        return true;
    } else {
        return false;
    }
}


//==========NAV==========

//this was a huge waste of time lol
// if (mobileDisplay(800)) {
//     //this is horrible practice, but it's the best way I can think of right now
//     const as = nav.getElementsByTagName("a");
//     let count = 0;
//     //iterate through all a elements in nav
//     [...as].forEach((a) => {
//         //get all down arrows in nav
//         const downArrows = a.getElementsByClassName("arrow-down");
//         //iterate through all down arrows in nav
//         [...downArrows].forEach((arrow) => {
//             //converts it to a right arrow
//             arrow.classList.remove("arrow-down");
//             arrow.classList.add("arrow-right");
//             count++;
//         })
//     })
//     //if it isn't found, error to the console
//     if (count == 0) {
//         error.elementNotFound(".arrow-down");
//     }
// }

for (let i = 0; i < nav.children.length; i++) {
    if (nav.children[i].id == "hamburger-container") continue;
    nav.children[i].addEventListener("click", () => navOptionClick(nav.children[i]));
}

document.addEventListener("click", (event) => {
    if (navOpened() && !event.target.classList.contains("nav-link") && event.target.id != "hamburger-container" && !event.target.classList.contains("hamburger") && event.target.id != "nav") {
        console.log("removed responsive tag");
        closeNav();
    }
});

function navOpened() {
    if (nav.classList.contains("responsive")) return true;
    return false;
}

function closeNav() {
    [...hamburgerChildren].forEach((hamburgerChild) => {
        hamburgerChild.classList.remove("clicked");
    });
    nav.classList.remove("responsive");
}

function navOptionClick(element) {
    [...navChildren].forEach((child) => {
        [...child.children].forEach((childChild) => {
            if (childChild.classList.contains("selected")) childChild.classList.remove("selected");
         })
        if (child.classList.contains("selected")) child.classList.remove("selected");
    })
    element.classList.add("selected");
    [...element.children].forEach((childChild) => {
       childChild.classList.add("selected");
    })
}

function openNav() {
    [...hamburgerChildren].forEach((hamburgerChild) => {
        if (hamburgerChild.className === "hamburger") {
            hamburgerChild.classList.add("clicked");
        } else {
            hamburgerChild.classList.remove("clicked");
        }
    });
    if (nav.className === "nav") {
        nav.classList.add("responsive");
    } else {
        nav.classList.remove("responsive");
    }
}

//=======DOWNLOADS=======

//if the mobile display is 500px or less, changes the text in download buttons to download symbols
if (mobileDisplay(550)) {
    [...downloads].forEach((element) => {
        const os = element.id.slice(element.id.lastIndexOf("-") + 1, element.id.length);
        element.innerHTML = `<u style='font-size: 15px !important;'>${os}</u><br/>⤓`;
        element.style.fontSize = "30px";
    })
}
