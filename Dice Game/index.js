// if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //console.info( Math.floor(Math.random()*6) + 1 );
  var heading=document.querySelector("h1");
  var p1=Math.floor(Math.random()*6) + 1;
  var p2=Math.floor(Math.random()*6) + 1;
  var image1="images/dice"+p1+".png";
  var image2="images/dice"+p2+".png";
  var p1img=document.querySelector(".img1").setAttribute("src",image1);;
  var p2img=document.querySelector(".img2").setAttribute("src",image2);;

  if(p1===p2) {
    heading.textContent="🏁Draw!🏁";
  }
  else if(p1<p2) {
    heading.textContent="Player2 Wins!🏁";
  }
  else {
    heading.textContent="🏁Player1 Wins!";
  }
// }
