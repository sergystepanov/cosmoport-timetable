"use strict";



function startClock() {
	var time = document.getElementById('clock-value'),
	day = document.getElementById('month-day'),
	month = document.getElementById('month-name'),
	year = document.getElementById('year');

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    time.innerHTML = h + ":" + m;

	day.innerHTML = today.getDate();
	var monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сеп", "Окт", "Нов", "Дек"];
	month.innerHTML = monthNames[today.getMonth()];
	year.innerHTML = today.getFullYear();

    var t = setTimeout(startClock, 500);
};

var updateDate = function(date) {

};

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

document.addEventListener('DOMContentLoaded', function () {
	startClock();
});
