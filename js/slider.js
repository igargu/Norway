let i = 0;

const btnSliderRestaurant = document.querySelectorAll(".btn-chevron");
const btnSliderHistory = document.querySelectorAll(".btn-chevron-history");

let moveRestaurant = () => {
  switch (i) {
    case 0:
      $(".restaurant1").removeClass("slider-image-deactive");
      $(".restaurant2").removeClass("slider-image-deactive");
      $(".restaurant4").addClass("slider-image-deactive");
      $(".restaurant5").addClass("slider-image-deactive");
      break;
    case 1:
      $(".restaurant1").addClass("slider-image-deactive");
      $(".restaurant2").removeClass("slider-image-deactive");
      $(".restaurant4").removeClass("slider-image-deactive");
      $(".restaurant5").addClass("slider-image-deactive");
      break;
    case 2:
      $(".restaurant1").addClass("slider-image-deactive");
      $(".restaurant2").addClass("slider-image-deactive");
      $(".restaurant4").removeClass("slider-image-deactive");
      $(".restaurant5").removeClass("slider-image-deactive");
      break;
  }
};

let moveAge = () => {
  switch (i) {
    case 0:
      $(".history-item1").removeClass("history-item-deactive");
      $(".history-item2").removeClass("history-item-deactive");
      $(".history-item5").addClass("history-item-deactive");
      $(".history-item6").addClass("history-item-deactive");
      break;
    case 1:
      $(".history-item1").addClass("history-item-deactive");
      $(".history-item2").removeClass("history-item-deactive");
      $(".history-item5").removeClass("history-item-deactive");
      $(".history-item6").addClass("history-item-deactive");
      break;
    case 2:
      $(".history-item1").addClass("history-item-deactive");
      $(".history-item2").addClass("history-item-deactive");
      $(".history-item5").removeClass("history-item-deactive");
      $(".history-item6").removeClass("history-item-deactive");
      break;
  }
};

btnSliderRestaurant.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action == "right" && i < 2) {
      i++;
    } else if (btn.dataset.action == "left" && i > 0) {
      i--;
    }
    return moveRestaurant();
  });
});

btnSliderHistory.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action == "right" && i < 2) {
      i++;
    } else if (btn.dataset.action == "left" && i > 0) {
      i--;
    }
    return moveAge();
  });
});
