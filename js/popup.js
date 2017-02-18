let sentencesArray = [
    "Wow, impressive stuff! keep up the good work!",
    "Seems like your willpower is strong, don't give up!",
    "Don't worry, you aren't missing anything...",
    "You're awesome! Remember, pointless scrolling is the enemy!",
    "You're almost in the Guinness world records, great job!"
]

let imagesArray = [
    "images/happy.jpg",
    "images/happy2.jpg",
    "images/happy3.jpg",
    "images/happy4.jpg",
    "images/happy5.jpg",
]

function createAndAppendElement(text, element) {
    let newElement = document.createElement(element);
    let textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
    document.body.appendChild(newElement);
}

function createAndAppendImage(imageSrc) {
    let oImg = document.createElement("img");
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

function lessThanAnHour() {
    createAndAppendElement("That is less than 1 hour - too much facebook!", "h4");
    createAndAppendImage("images/angry.png");
}

function calculateTimes(visits) {
    let currentTime = new Date().getTime();
    let latestVisit = visits[visits.length - 1].visitTime;
    let timeFromLastVisit = currentTime - latestVisit;
    let timeFromLastVisitInMinutes = Math.floor((timeFromLastVisit / 60000));
    let timeFromLastVisitInHours = timeFromLastVisitInMinutes / 60;
    let timeFromLastVisitInMinutesRemain = (timeFromLastVisitInHours % 1) * 60;
    return {
        timeFromLastVisitInHours: Math.floor(timeFromLastVisitInHours),
        timeFromLastVisitInMinutesRemain: Math.floor(timeFromLastVisitInMinutesRemain)
    };
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.history.getVisits({
        url: "https://www.facebook.com/"
    }, visits => {
        let visitsLength = visits.length >= 1;
        if (visits && visitsLength) {
            let times = calculateTimes(visits);
            createAndAppendElement(`${times.timeFromLastVisitInHours} Hours, ${times.timeFromLastVisitInMinutesRemain} Minutes`, "h3");
            if (times.timeFromLastVisitInHours === 0) {
                lessThanAnHour();
            } else {
                let hours = localStorage.getItem("hours");
                let sentence = localStorage.getItem("sentence");
                let image = localStorage.getItem("image");
                if (!image) {
                    image = generateRandomImage();
                    localStorage.setItem("image", image);
                }
                if (!hours) {
                    hours = times.timeFromLastVisitInHours;
                    localStorage.setItem("hours", hours);
                }
                if (!sentence) {
                    sentence = generateRandomSentence();
                    localStorage.setItem("sentence", sentence);
                }
                if (parseInt(hours) !== times.timeFromLastVisitInHours) {
                    sentence = generateRandomSentence();
                    image = generateRandomImage();
                    localStorage.setItem("hours", times.timeFromLastVisitInHours);
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
            createAndAppendImage("images/happy.jpg");
        }
    });
});
