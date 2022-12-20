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

function changeCity(newCity) {
  let cities = Array.from(document.querySelectorAll(".cls-2"));
  cities.forEach((city) => {
    if (city.classList.contains("city-location-active")) {
      city.classList.remove("city-location-active");
    }
    if (city.classList.contains("city-location-" + newCity)) {
      city.classList.add("city-location-active");
    }
  });

  cities = Array.from(document.querySelectorAll(".city"));
  cities.forEach((city) => {
    if (city.classList.contains("city-active")) {
      city.classList.remove("city-active");
    }
    if (city.classList.contains("city-" + newCity)) {
      city.classList.add("city-active");
    }
  });
}

function changeConveyance(newConveyance) {
  console.log(newConveyance);
  let conveyances = Array.from(document.querySelectorAll(".getto-option"));
  conveyances.forEach((conveyance) => {
    if (conveyance.classList.contains("active")) {
      conveyance.classList.remove("active");
    }
    if (conveyance.classList.contains("getto-option" + newConveyance)) {
      conveyance.classList.add("active");
    }
  });

  conveyances = Array.from(document.querySelectorAll(".getto-info"));
  conveyances.forEach((conveyance) => {
    if (conveyance.classList.contains("getto-info-active")) {
      conveyance.classList.remove("getto-info-active");
    }
    if (conveyance.classList.contains("getto-info" + newConveyance)) {
      conveyance.classList.add("getto-info-active");
    }
  });
}

function changeRoutePhoto(route, day) {
  let photo = $(".route" + route + "-photo")
    .attr("class")
    .split(" ")[3];
  $(".route" + route + "-photo")
    .removeClass(photo)
    .addClass("route" + route + "-photo" + day);
}
