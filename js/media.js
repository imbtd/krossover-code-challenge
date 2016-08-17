var video, sources, playbutton;

function onload() {
	video = document.querySelector('video#frag1');
	sources = video.getElementsByTagName('source');
	playbutton = document.getElementById("playButton");
}

function playVideo() {
	var url = location.href;
	var hash = location.href.split("#")[1];

	sources[0].setAttribute(
		'src', (sources[0].getAttribute('data-original')
		.concat(hash)));

	if (video.paused) {
		video.play();
		playbutton.textContent = "|| P A U S E";
	} else {
		video.pause();
		playbutton.textContent = "> P L A Y";
	}
}

function jumpToTime(start,end) {
	var startend = start;

	if (end != undefined) {
		startend = start+","+end;
	}

	//debug: location.hash = "#t=" + startend;
	sources[0].setAttribute(
		'src', (sources[0].getAttribute('data-original')
		.concat('#t=' + start + "," + end)));

	// load video at fragment start-time, change play button text
	video.load();
	playbutton.textContent = "> P L A Y";
}

function jumpAndPlay(start,end) {
	var startend = start;

	if (end != undefined) {
		startend = start+","+end;
	}

	//debug: location.hash = "#t=" + startend;
	sources[0].setAttribute(
		'src', (sources[0].getAttribute('data-original')
		.concat('#t=' + start + "," + end)));

	// load/play video at fragment start-time, change play button text
	video.load();
	video.play();
}

var todoApp = angular.module('todoApp', [])
	todoApp.controller('TodoListController', function($scope) {

		var todoList = this;

		todoList.todos = [
			{text:'Fragment ', start:'15', end:'20'},
			{text:'Fragment ', start:'25', end:'30'}
		];

		$scope.jumpToTime = function(start,end) {
			var video = angular.element(document.querySelector('video#frag1'));
			var sources = angular.element(document.querySelector('video#frag1').getElementsByTagName('source'));
			var newTime = sources[0].getAttribute('data-original')+'#t='+start+','+end;
			var playButton = angular.element(document.getElementById('playButton'));

			sources[0].setAttribute('src',newTime);

			// load video at fragment start-time, change play button text
			angular.element(document.getElementById('frag1').load());
			playButton[0].textContent = '> P L A Y';

			//debug: todoList.msg = sources[0].getAttribute('src');
		};

		$scope.jumpAndPlayToTime = function(start,end) {
			var newTime;
			var video = angular.element(document.querySelector('video#frag1'));
			var sources = angular.element(document.querySelector('video#frag1').getElementsByTagName('source'));
			var playButton = angular.element(document.getElementById('playButton'));

			if (end != undefined) {
				if (end <= start) {
					alert('Please enter an end time greater than start time');
				}
				newTime = sources[0].getAttribute('data-original')+'#t='+start+','+end;
			} else {
				newTime = sources[0].getAttribute('data-original')+'#t='+start;
			}

			sources[0].setAttribute('src',newTime);

			// load video at fragment start-time, change play button text
			angular.element(document.getElementById('frag1').load());
			angular.element(document.getElementById('frag1').play());

			playButton[0].textContent = '> P L A Y';

			//debug: todoList.msg = sources[0].getAttribute('src');
		};

		todoList.add = function() {
			todoList.todos.push({text:todoList.todoText+' ', start:todoList.startTime, end:todoList.endTime});
			todoList.todoText = '';
			todoList.startTime = '';
			todoList.endTime = '';
		};

		$scope.remove = function(index) {
			todoList.todos.splice(index,1);
			//debug: todoList.msg = 'index='+index;
		};

	});
