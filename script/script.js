"use strict";

function startClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock-value').innerHTML = h + ":" + m;
    var t = setTimeout(startClock, 500);
};

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

document.addEventListener('DOMContentLoaded', function () {
	startClock();
});
