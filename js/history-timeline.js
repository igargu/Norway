jQuery(document).ready(function ($) {
  var timelines = $(".cd-horizontal-timeline"),
    eventsMinDistance = 60,
    cont = 0;

  timelines.length > 0 && initTimeline(timelines);

  function initTimeline(timelines) {
    timelines.each(function () {
      var timeline = $(this),
        timelineComponents = {};
      //cache timeline components
      timelineComponents["timelineWrapper"] = timeline.find(".events-wrapper");
      timelineComponents["eventsWrapper"] =
        timelineComponents["timelineWrapper"].children(".events");
      timelineComponents["fillingLine"] =
        timelineComponents["eventsWrapper"].children(".filling-line");
      timelineComponents["timelineEvents"] =
        timelineComponents["eventsWrapper"].find("a");
      timelineComponents["timelineDates"] = parseDate(
        timelineComponents["timelineEvents"]
      );
      timelineComponents["timelineNavigation"] = timeline.find(
        ".cd-timeline-navigation"
      );
      timelineComponents["eventsContent"] =
        timeline.children(".events-content");

      //assign a left postion to the single events along the timeline
      //setDatePosition(timelineComponents, eventsMinDistance);
      //assign a width to the timeline
      var timelineTotWidth = 500;
      //the timeline has been initialize - show it
      timeline.addClass("loaded");

      //detect click on the next arrow
      timelineComponents["timelineNavigation"].on(
        "click",
        ".next",
        function (event) {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, "next");
        }
      );
      //detect click on the prev arrow
      timelineComponents["timelineNavigation"].on(
        "click",
        ".prev",
        function (event) {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, "prev");
        }
      );
      //detect click on the a single event - show new event content
      timelineComponents["eventsWrapper"].on("click", "a", function (event) {
        event.preventDefault();
        timelineComponents["timelineEvents"].removeClass("selected");
        $(this).addClass("selected");
        updateOlderEvents($(this));
        updateVisibleContent($(this), timelineComponents["eventsContent"]);
      });

      //on swipe, show next/prev event content
      timelineComponents["eventsContent"].on("swipeleft", function () {
        var mq = checkMQ();
        mq == "mobile" &&
          showNewContent(timelineComponents, timelineTotWidth, "next");
      });
      timelineComponents["eventsContent"].on("swiperight", function () {
        var mq = checkMQ();
        mq == "mobile" &&
          showNewContent(timelineComponents, timelineTotWidth, "prev");
      });

      //keyboard navigation
      $(document).keyup(function (event) {
        if (event.which == "37" && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, "prev");
        } else if (event.which == "39" && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, "next");
        }
      });
    });
  }

  function updateSlide(timelineComponents, timelineTotWidth, string) {
    //retrieve translateX value of timelineComponents['eventsWrapper']
    var translateValue = getTranslateValue(timelineComponents["eventsWrapper"]),
      wrapperWidth = Number(
        timelineComponents["timelineWrapper"].css("width").replace("px", "")
      );
    //translate the timeline to the left('next')/right('prev')
  }

  function showNewContent(timelineComponents, timelineTotWidth, string) {
    //go from one event to the next/previous one
    var visibleContent = timelineComponents["eventsContent"].find(".selected"),
      newContent =
        string == "next" ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) {
      //if there's a next/prev event - show it
      var selectedDate = timelineComponents["eventsWrapper"].find(".selected"),
        newEvent =
          string == "next"
            ? selectedDate.parent("li").next("li").children("a")
            : selectedDate.parent("li").prev("li").children("a");
      updateVisibleContent(newEvent, timelineComponents["eventsContent"]);
      newEvent.addClass("selected");
      selectedDate.removeClass("selected");
      updateOlderEvents(newEvent);
    }
  }

  function updateVisibleContent(event, eventsContent) {
    var eventDate = event.data("date"),
      visibleContent = eventsContent.find(".selected"),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]');

    if (selectedContent.index() > visibleContent.index()) {
      var classEnetering = "selected enter-right",
        classLeaving = "leave-left";
    } else {
      var classEnetering = "selected enter-left",
        classLeaving = "leave-right";
    }

    selectedContent.attr("class", classEnetering);
    visibleContent
      .attr("class", classLeaving)
      .one(
        "webkitAnimationEnd oanimationend msAnimationEnd animationend",
        function () {
          visibleContent.removeClass("leave-right leave-left");
          selectedContent.removeClass("enter-left enter-right");
        }
      );
    //eventsContent.css("height", 600 + "px");
  }

  function updateOlderEvents(event) {
    event
      .parent("li")
      .prevAll("li")
      .children("a")
      .addClass("older-event")
      .end()
      .end()
      .nextAll("li")
      .children("a")
      .removeClass("older-event");
  }

  function getTranslateValue(timeline) {
    var timelineStyle = window.getComputedStyle(timeline.get(0), null),
      timelineTranslate =
        timelineStyle.getPropertyValue("-webkit-transform") ||
        timelineStyle.getPropertyValue("-moz-transform") ||
        timelineStyle.getPropertyValue("-ms-transform") ||
        timelineStyle.getPropertyValue("-o-transform") ||
        timelineStyle.getPropertyValue("transform");

    if (timelineTranslate.indexOf("(") >= 0) {
      var timelineTranslate = timelineTranslate.split("(")[1];
      timelineTranslate = timelineTranslate.split(")")[0];
      timelineTranslate = timelineTranslate.split(",");
      var translateValue = timelineTranslate[4];
    } else {
      var translateValue = 0;
    }

    return Number(translateValue);
  }

  //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  function parseDate(events) {
    var dateArrays = [];
    events.each(function () {
      var dateComp = $(this).data("date").split("/"),
        newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  function daydiff(first, second) {
    return Math.round(second - first);
  }

  /*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  function checkMQ() {
    //check if mobile or desktop device
    return window
      .getComputedStyle(
        document.querySelector(".cd-horizontal-timeline"),
        "::before"
      )
      .getPropertyValue("content")
      .replace(/'/g, "")
      .replace(/"/g, "");
  }
});
