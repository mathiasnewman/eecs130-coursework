const makeBigger = () => {
  document.querySelector(".content").style.fontSize = "2em";
   // alert('make bigger!');
};

const makeSmaller = () => {
  document.querySelector(".content").style.fontSize = "0.75em";
   // alert('make smaller!');
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;
