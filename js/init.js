
(function () {
  
  window.gameMain = new Main({
    element: document.querySelector("#main-board"),
    load: document.querySelector("#loading")
  })
  // console.log(auth);
  gameMain.init();
})()

