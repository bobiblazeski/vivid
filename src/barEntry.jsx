var Rx = require('rx');
var R = require('ramda');
var Ease = require('ease-functions');

var BarChart = require('./BarChart');

React.render(<BarChart items={[4, 8, 15, 16, 23, 42, 87]} />, document.getElementById('content'));

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


//var lancia = document.getElementById('lancia');


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
        //lancia.style.left = x.value.current+'px';    
       
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    }
)