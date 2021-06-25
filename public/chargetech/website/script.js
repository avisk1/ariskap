function nav(iinput) {
    window.location.href = iinput;
  }
  
  const imgs = document.getElementsByTagName("img");
  [...imgs].forEach((element) => {
    element.draggable = false;
  });
  
  const dark = localStorage.getItem("darkToggled");
  console.log(dark);
  if (parseInt(dark)) togDarkMode();
  
  function togDarkMode() {
    const nav = document.getElementById("nav");
    // const frontImg = document.getElementById("front-img");
    const computer = document.querySelector(".front-img");
    const dropdowns = document.getElementsByClassName("dropdown");
    const imgText = document.getElementsByClassName("img-text");
    const darkEl = document.getElementById("dark");
    if (nav.style.backgroundColor == "black") {
      darkEl.innerHTML = "Dark Mode";
      nav.style.backgroundColor = "white";
      document.body.style.backgroundColor = "white";
      if (computer && computer.src == "https://i.ibb.co/GtWcydz/output-onlinepngtools-4.png") {
        computer.src = "https://www.iwaste.co.uk/images/2020/02/27/laptop-recycling__1500x955.jpg";
      }
      [...dropdowns].forEach((dropdown) => {
        dropdown.style.backgroundColor = "white";
        dropdown.style.boxShadow = "0px 0px 2px black";
        [...dropdown.children].forEach((child) => {
          child.style.backgroundColor = "white";
        })
      });
      [...imgText].forEach((container) => {
        [...container.getElementsByClassName("switch")].forEach((text) => {
          text.style.color = "white";
        })
      });
      localStorage.setItem("darkToggled", 0);
    } else {
      darkEl.innerHTML = "Light Mode";
      nav.style.backgroundColor = "black";
      document.body.style.backgroundColor = "black";
      if (computer && computer.src == "https://www.iwaste.co.uk/images/2020/02/27/laptop-recycling__1500x955.jpg") {
        computer.src = "https://i.ibb.co/GtWcydz/output-onlinepngtools-4.png";
      }
      [...dropdowns].forEach((dropdown) => {
        console.log("here");
        dropdown.style.backgroundColor = "black";
        dropdown.style.boxShadow = "0px 0px 2px #465C69";
        console.log(dropdown.style.backgroundColor);
        [...dropdown.children].forEach((child) => {
          child.style.backgroundColor = "black";
        })
      });
      [...imgText].forEach((container) => {
        [...container.getElementsByClassName("switch")].forEach((text) => {
          text.style.color = "#465C69";
        })
      });
      localStorage.setItem("darkToggled", 1);
    }
  }