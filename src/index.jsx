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
        console.log(i);
		return i * INTERVAL_LENGTH;
	});

var start = 0;
var end = 400;
var duration= 3000;

var flow = timer//.takeWithTime(duration)
                .select(function(time) { 
                    var mod = time % duration;
                    //console.log('take',mod);
                    return Ease.linear(mod, start, end-start,duration);
                })   
                .concat(Rx.Observable.returnValue(end));


var logo = document.getElementById('lancia');

flow.subscribe(function(left){
    //console.log(left);
    logo.style.left = left+'px';
});


//// var fraction = time / duration
//function linear(begin, change, fraction) {
//        return begin + change * fraction;
//}
//
//function cubicIn(begin, change, fraction) {
//    return change * fraction * fraction * fraction + begin;
//};
//
//function cubicOut(begin, change, fraction) {
//    return change * ((fraction = fraction - 1) * fraction * fraction + 1) + begin;
//};
//
//
//var flow = timer.takeWithTime(duration)
//                .select((time) =>  linear(start, end-start,time/duration))   
//                .concat(Rx.Observable.returnValue(end));
//

function frame(){
    
}



