var sentencesArray = [
    "Wow, impressive stuff! keep up the good work!",
    "Seems like your willpower is strong, don't give up!",
    "Don't worry, you aren't missing anything...",
    "You're awesome! Remember, pointless scrolling is the enemy!",
    "You're almost in the Guinness world records, great job!"
]

var imagesArray = [
    "images/happy.jpg",
    "images/happy2.jpg",
    "images/happy3.jpg",
    "images/happy4.jpg",
    "images/happy5.jpg",
]

function createAndAppendElement(text, element) {
    var newElement = document.createElement(element);
    var text = document.createTextNode(text);
    newElement.appendChild(text);
    document.body.appendChild(newElement);
}

function createAndAppendImage(imageSrc) {
    var oImg = document.createElement("img");
    oImg.setAttribute('src', imageSrc);
    document.body.appendChild(oImg);
}

function generateRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomSentence() {
  return generateRandomFromArray(sentencesArray);
}

function generateRandomImage() {
  return generateRandomFromArray(imagesArray);
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.history.getVisits({
        url: "https://www.facebook.com/"
    }, function(visits) {
        var visitsLength = visits.length >= 1;
        if (visits && visitsLength) {
            var currentTime = new Date().getTime();
            var latestVisit = visits[visits.length - 1].visitTime;
            var timeFromLastVisit = currentTime - latestVisit;
            var timeFromLastVisitInMinutes = Math.floor((timeFromLastVisit / 60000));
            var timeFromLastVisitInHours = timeFromLastVisitInMinutes / 60;
            var timeFromLastVisitInMinutesRemain = (timeFromLastVisitInHours % 1) * 60;
            createAndAppendElement(Math.floor(timeFromLastVisitInHours) + " Hours, " + Math.floor(timeFromLastVisitInMinutesRemain) + " minutes", "h3");
            if (Math.floor(timeFromLastVisitInHours) === 0) {
                createAndAppendElement("That is less than 1 hour - too much facebook!", "h4");
                createAndAppendImage("angry.png");
            } else {
                var hours = localStorage.getItem("hours");
                var sentence = localStorage.getItem("sentence");
                var image = localStorage.getItem("image");
                if (!image) {
                  image = generateRandomImage();
                  localStorage.setItem("image", image);
                }
                if (!hours) {
                  hours = Math.floor(timeFromLastVisitInHours);
                  localStorage.setItem("hours", hours);
                }
                if (!sentence) {
                  sentence = generateRandomSentence();
                  localStorage.setItem("sentence", sentence);
                }
                if (parseInt(hours) !== Math.floor(timeFromLastVisitInHours)) {
                    sentence = generateRandomSentence();
                    image = generateRandomImage();
                    localStorage.setItem("hours", Math.floor(timeFromLastVisitInHours));
                    localStorage.setItem("sentence", sentence);
                    localStorage.setItem("image", image);
                    createAndAppendElement(sentence, "h4");
                    createAndAppendImage(image);
                } else {
                    createAndAppendElement(sentence, "h4");
                    createAndAppendImage(image);
                }
            }
        } else {
            createAndAppendElement("You haven't visited facebook since the begining of time!", "h3");
            createAndAppendImage("happy.jpg");
        }
    });
});
