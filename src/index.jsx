var Rx = require('rx');
var R = require('ramda');
var Ease = require('ease-functions');

//  function linear(time, begin, change, duration) {
//        return change * time / duration + begin;
// };

var FRAME_RATE = 30;
var INTERVAL_LENGTH = 1000/60;


var timer = Rx.Observable
	.timer(0, INTERVAL_LENGTH, Rx.Scheduler.requestAnimationFrame || Rx.Scheduler.timeout)
	.select(function(i) {
        //console.log(i);
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


var lancia = document.getElementById('lancia');


function linear(time, begin, change, duration) {
        
        var res= change * time / duration + begin;
        console.log('res',res,time, begin, change, duration);
        return res;
};

var source = Rx.Observable.generateWithRelativeTime(
    { start: 0,  change: 600, current : 0, time: 0, duration: 2000},
    function (x) {         
        return x.time <= x.duration; 
    },
    function (x) {         
        return R.merge(x, {
            current: linear(x.time, x.start, x.change, x.duration),
            time: x.time+INTERVAL_LENGTH
        }); 
    },
    function (x) { return x; },
    function (x) { return INTERVAL_LENGTH; },
    Rx.Scheduler.requestAnimationFrame || Rx.Scheduler.timeout
).timeInterval();

var subscription = source.subscribe(
    function (x) {                 
        lancia.style.left = x.value.current+'px';    
       
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    }
)


/*
var lrLancia = motion(0, function(n){ return n < 400? n +1 : 0; });
var udMaserati = motion(0, function(n){ return n < 400? n +1 : 0; });

lrLancia.subscribe(function(left){
    lancia.style.left = left+'px';
});

udMaserati.subscribe(function(n){
    maserati.style.top = n+'px';
});
*/

//flow.subscribe(function(left){    
//    lancia.style.left = left+'px';
//});
/*
var motion  = function motion(start, advance){
    var current = R.clone(start); 
    return timer.select(function (time){
        current = advance(current);
        return current;
    });
}


var lrLancia = motion(0, function(n){ return n < 400? n +1 : 0; });
var udMaserati = motion(0, function(n){ return n < 400? n +1 : 0; });

lrLancia.subscribe(function(left){
    lancia.style.left = left+'px';
});

udMaserati.subscribe(function(n){
    maserati.style.top = n+'px';
});
*/

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
/*
var source = Rx.Observable.generateWithRelativeTime(
    1,
    function (x) { return x < 4; },
    function (x) { 
        console.log(x);
        return x + 1; 
    },
    function (x) { return x; },
    function (x) { return 100; },
    Rx.Scheduler.requestAnimationFrame || Rx.Scheduler.timeout
).timeInterval();

var subscription = source.subscribe(
    function (x) { console.log('Next: ' + JSON.stringify(x)); },
    function (err) { console.log('Error: ' + err); },
    function () { console.log('Completed'); });
*/


