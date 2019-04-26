const defaultTheme = () => {
  document.querySelector(".container").className = "container";
   // alert('switch to default theme');
};

const oceanTheme = () => {
  document.querySelector(".container").className = "container ocean";
   // alert('switch to ocean theme');
};

const desertTheme = () => {
  document.querySelector(".container").className = "container desert";
   // alert('switch to desert theme');
};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;
