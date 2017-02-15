document.addEventListener('DOMContentLoaded', function() {
  chrome.history.getVisits({url: "https://www.facebook.com/"}, function (visits) {
      var visitsLength = visits.length >= 1;
      if (visits && visitsLength){
        var currentTime = new Date().getTime();
        var latestVisit = visits[visits.length - 1].visitTime;
        var timeFromLastVisit = currentTime - latestVisit;
        var timeFromLastVisitInMinutes = Math.floor((timeFromLastVisit/60000));
        var timeFromLastVisitInHours = timeFromLastVisitInMinutes/60;
        var timeFromLastVisitInMinutesRemain = (timeFromLastVisitInHours % 1) * 60;
        createAndAppendElement(Math.floor(timeFromLastVisitInHours) + " Hours, " + Math.floor(timeFromLastVisitInMinutesRemain) + " minutes", "h3");
        if (timeFromLastVisitInHours === 0) {
          createAndAppendElement("That is less than 1 hour - too much facebook!", "h4");
          createAndAppendImage("angry.png");
        }
        else {
          createAndAppendElement("More than an hour - you can have some face time", "h4");
          createAndAppendImage("happy.jpg");
        }
      }
      else {
        createAndAppendParagraph("You haven't visited facebook since the begining of time!", "h3");
        createAndAppendImage("happy.jpg");
      }
    });

  function createAndAppendElement(text, element) {
    var p = document.createElement(element);
    var text = document.createTextNode(text);
    p.appendChild(text);
    document.body.appendChild(p);
  }

  function createAndAppendImage(imageSrc) {
    var oImg = document.createElement("img");
    oImg.setAttribute('src', imageSrc);
    document.body.appendChild(oImg);
  }
});
