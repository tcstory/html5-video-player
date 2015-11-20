/**
 * Created by tcstory on 11/12/15.
 */

"use strict";

var configMap = {
    defaultVolume: 0.7,
    hideTime: 2000,
    delayId: null,
    initTime: '0:00',
    videoPlayer: '#video-player'
};


var vm = new Vue({
    el: '#video-player',
    data: {
        isPlaying: false,
        curVolume: configMap.defaultVolume,
        curProgress: 0,
        isFullscreen: false,
        isInvisible: false,
        duration: '',
        initTime: configMap.initTime
    },
    computed: {
        volumeLength: function () {
            return this.curVolume * 100 + '%';
        },
        progressLength: function () {
            return this.curProgress * 100 + '%';
        }
    },
    methods: {
        playVideo: function () {
            if (this.isPlaying) {
                videoObj.video.pause();
                this.isPlaying = false;
            } else {
                videoObj.video.play();
                this.isPlaying = true;
            }
        },
        handleVolumeMousedown: function (ev) {
            volumer.handleVolumeMousedown(ev)
        },
        handleVolumeMouseup: function (ev) {
            volumer.handleVolumeMouseup(ev)
        },
        handleVolumeMousemove: function (ev) {
            volumer.handleVolumeMousemove(ev)
        },
        handleVolumeClick: function (ev) {
            volumer.handleVolumeClick(ev)
        },
        handleVolumeMouseleave: function (ev) {
            volumer.handleVolumeMouseleave(ev)
        },
        handleProgressbarMousedown: function (ev) {
            progressbarer.handleProgressbarMousedown(ev)
        },
        handleProgressbarMouseup: function (ev) {
            progressbarer.handleProgressbarMouseup(ev)
        },
        handleProgressbarMousemove: function (ev) {
            progressbarer.handleProgressbarMousemove(ev)
        },
        handleProgressbarClick: function (ev) {
            progressbarer.handleProgressbarClick(ev)
        },
        handleProgressbarMouseleave: function (ev) {
            progressbarer.handleProgressbarMouseleave(ev)
        },
        handleFullscreen: function () {
            handleFullscreen(this);
        }
    }
});

var videoObj = (function (vm) {
    var _video_obj = {};
    var _video = document.querySelector(configMap.videoPlayer + ' video');
    _video_obj.video = _video;
    _video_obj.duration = _video.duration;
    _video_obj.controlBar = document.querySelector(configMap.videoPlayer + ' .control-bar');
    _video.addEventListener('loadedmetadata', function (ev) {
        vm.duration =  convertTime(_video.duration);
    });
    return _video_obj;
})(vm);

var volumer = (function (vm) {
    var _volumer = {};
    _volumer._isGrag = false;
    _volumer._pos1 =
        document.querySelector(configMap.videoPlayer + ' .volume .outer')
            .getBoundingClientRect().left;
    _volumer._pos2 =
        document.querySelector(configMap.videoPlayer + ' .volume .outer')
            .getBoundingClientRect().right;
    _volumer._width =
        parseFloat(getComputedStyle(
            document.querySelector(configMap.videoPlayer + ' .volume .outer')).width
        );
    _volumer.handleVolumeClick = function (ev) {
        if (_volumer._pos1 <= ev.clientX && ev.clientX <= _volumer._pos2) {
            var _diff = ev.clientX - _volumer._pos1;
            vm.curVolume = _diff / _volumer._width
        }
    };
    _volumer.handleVolumeMousedown = function (ev) {
        _volumer._isGrag = true;
    };
    _volumer.handleVolumeMouseup = function (ev) {
        _volumer._isGrag = false;
    };
    _volumer.handleVolumeMousemove = function (ev) {
        if (_volumer._isGrag) {
            if (_volumer._pos1 <= ev.clientX && ev.clientX <= _volumer._pos2) {
                var _diff = ev.clientX - _volumer._pos1;
                vm.curVolume = _diff / _volumer._width
            }
        }
    };
    _volumer.handleVolumeMouseleave = function (ev) {
        _volumer._isGrag = false;
    };
    return _volumer;
})(vm);


var progressbarer = (function (vm) {
    var _progressbarer = {};
    _progressbarer._isGrag = false;
    _progressbarer._pos1 =
        document.querySelector(configMap.videoPlayer + ' .progress-bar .outer')
            .getBoundingClientRect().left;
    _progressbarer._pos2 =
        document.querySelector(configMap.videoPlayer + ' .progress-bar .outer')
            .getBoundingClientRect().right;
    _progressbarer._width =
        parseFloat(getComputedStyle(
            document.querySelector(configMap.videoPlayer + ' .progress-bar .outer')).width
        );
    _progressbarer.handleProgressbarClick = function (ev) {
        if (_progressbarer._pos1 <= ev.clientX && ev.clientX <= _progressbarer._pos2) {
            var _diff = ev.clientX - _progressbarer._pos1;
            vm.curProgress = _diff / _progressbarer._width
        }
    };
    _progressbarer.handleProgressbarMousedown = function (ev) {
        _progressbarer._isGrag = true;
    };
    _progressbarer.handleProgressbarMouseup = function (ev) {
        _progressbarer._isGrag = false;
    };
    _progressbarer.handleProgressbarMousemove = function (ev) {
        if (_progressbarer._isGrag) {
            if (_progressbarer._pos1 <= ev.clientX && ev.clientX <= _progressbarer._pos2) {
                var _diff = ev.clientX - _progressbarer._pos1;
                vm.curProgress = _diff / _progressbarer._width
            }
        }
    };
    _progressbarer.handleProgressbarMouseleave = function (ev) {
        _progressbarer._isGrag = false;
    };
    return _progressbarer;
})(vm);

function convertTime(seconds) {
    seconds = parseInt(seconds);
    if (seconds >= 3600) {
        var _hour = parseInt(seconds / 3600);
        seconds = parseInt(seconds % 3600);
        var _time = _hour + '';
    } else {
        var _time = '0';
    }
    var _minute = parseInt(seconds / 60);
    if (_minute < 10) {
        _time = _time + ':0' + _minute;
    } else {
        _time = _time + ':' +_minute;
    }
    var _second = seconds % 60;
    if (_second < 10) {
        _time = _time + ':0' + _second;
    } else {
        _time = _time + ':' + _second;
    }
    return _time;
}

function handleFullscreen(vm) {
    if (isFullScreen()) {
        vm.isFullscreen = false;
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    else {
        vm.isFullscreen = true;
        if (videoObj.video.requestFullscreen) videoObj.video.requestFullscreen();
        else if (videoObj.video.mozRequestFullScreen) videoObj.video.mozRequestFullScreen();
        else if (videoObj.video.webkitRequestFullScreen) videoObj.video.webkitRequestFullScreen();
        else if (videoObj.video.msRequestFullscreen) videoObj.video.msRequestFullscreen();
    }
}
function isFullScreen() {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

document.addEventListener('fullscreenchange', function (e) {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        configMap.delayId = setTimeout(function () {
            vm.isInvisible = true;
        }, configMap.hideTime)
    } else {
        clearTimeout(configMap.delayId);
        vm.isFullscreen = false;
        vm.isInvisible = false;

    }
});
document.addEventListener('webkitfullscreenchange', function () {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        configMap.delayId = setTimeout(function () {
            vm.isInvisible = true;

        }, configMap.hideTime)
    } else {
        clearTimeout(configMap.delayId);
        vm.isFullscreen = false;
        vm.isInvisible = false;

    }
});
document.addEventListener('mozfullscreenchange', function () {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        configMap.delayId = setTimeout(function () {
            vm.isInvisible = true;

        }, configMap.hideTime)
    } else {
        clearTimeout(configMap.delayId);
        vm.isFullscreen = false;
        vm.isInvisible = false;
    }
});
document.addEventListener('msfullscreenchange', function () {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        configMap.delayId = setTimeout(function () {
            vm.isInvisible = true;

        }, configMap.hideTime)
    } else {
        clearTimeout(configMap.delayId);
        vm.isFullscreen = false;
        vm.isInvisible = false;
    }
});
