var startDate = new Date("Aug 25, 2023 08:03:00").getTime();
var endDate = new Date("Dec 23, 2023 22:30:00").getTime();
var totalTime = endDate - startDate;

var x = setInterval(function() {
    var now = new Date().getTime();
    var elapsedTime = now - startDate;

    var progress = (elapsedTime / totalTime) * 100;
    var progressBarWidth = progress.toFixed(2);

    var days = Math.floor((endDate - now) / (1000 * 60 * 60 * 24));
    var hours = Math.floor((endDate - now) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor((endDate - now) % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor((endDate - now) % (1000 * 60) / 1000);

    document.getElementById("counter").innerHTML = days + "d " + hours + "h " +
        minutes + "m " + seconds + "s ";

    document.getElementById("progress-bar").style.width = progressBarWidth + "%";

    if (now > endDate || now < startDate) {
        clearInterval(x);
        document.getElementById("bigtext").innerHTML = "FIM DO SEMESTRE <div id='counter'>Boas férias!</div>";
        document.getElementById("progress-bar").style.width = "100%";
    }
}, 1000);