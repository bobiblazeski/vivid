var Rx = require('rx');
var R = require('ramda');
var Ease = require('ease-functions');

//  function linear(time, begin, change, duration) {
//        return change * time / duration + begin;
// };

var FRAME_RATE = 60;
var INTERVAL_LENGTH = 1000/60;


var timer = Rx.Observable
	.timer(0, INTERVAL_LENGTH, Rx.Scheduler.requestAnimationFrame || Rx.Scheduler.timeout)
	.select(function(i) {
		return i * INTERVAL_LENGTH;
	});

var start = 0;
var end = 500;
var duration= 3000;




var flow = timer.takeWithTime(duration)
                .select((time) =>  Ease.linear(time, start, end-start,duration))   
                .concat(Rx.Observable.returnValue(end));


var logo = document.getElementById('lancia');

flow.subscribe(function(left){
    logo.style.left = left+'px';
});
