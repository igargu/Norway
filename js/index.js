function collapsed() {
  document.getElementById("collapsed").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".collapsed-nav")) {
    var dropdowns = document.getElementsByClassName("collapsed-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

/*function changeMenu(numMenu) {
      switch(numMenu) {
          case 1:
              document.getElementById("tasting-menu-1").hidden = false;
              document.getElementById("tasting-menu-2").hidden = true;
              break;
          case 2:
              document.getElementById("tasting-menu-1").hidden = true;
              document.getElementById("tasting-menu-2").hidden = false;
              break;
      }
  }*/
