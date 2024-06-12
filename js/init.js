(function () {
  
  const gameMain = new Main({
    element: document.querySelector("#main-board"),
    load: document.querySelector("#loading")
  })

  gameMain.init();
})()

