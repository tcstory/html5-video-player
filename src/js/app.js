/**
 * Created by tcstory on 11/12/15.
 */

var stateMap = {
    defaultVolume: 0.7,
    hideTime: 2000
};
var videoObj = (function () {
    var _video_obj = {};
    var _video = document.querySelector('#video-player video');
    _video_obj.video = _video;
    _video_obj.duration = _video.duration;
    _video_obj.controlBar = document.querySelector('#video-player .control-bar');
    return _video_obj;
})();


var vm = new Vue({
    el: '#video-player',
    data: {
        isPlaying: false,
        curVolume: stateMap.defaultVolume,
        curProgress: 0,
        isFullscreen: false,
        isInvisible: false
    },
    computed: {
        volumeLength: function () {
            return this.curVolume * 100 + '%';
        },
        progressLength: function () {
            return this.curProgress * 100 + '%'
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
        handleFullscreen: function () {
            handleFullscreen(this);
        }
    }
});


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
        setTimeout(function () {
            vm.isInvisible = true;
        }, stateMap.hideTime)
    } else {
        vm.isFullscreen = false;
        vm.isInvisible = false;

    }
});
document.addEventListener('webkitfullscreenchange', function () {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        setTimeout(function () {
            vm.isInvisible = true;

        }, stateMap.hideTime)
    } else {
        vm.isFullscreen = false;
        vm.isInvisible = false;

    }
});
document.addEventListener('mozfullscreenchange', function () {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        setTimeout(function () {
            vm.isInvisible = true;

        }, stateMap.hideTime)
    } else {
        vm.isFullscreen = false;
        vm.isInvisible = false;
    }
});
document.addEventListener('msfullscreenchange', function () {
    if (isFullScreen()) {
        vm.isFullscreen = true;
        setTimeout(function () {
            vm.isInvisible = true;

        }, stateMap.hideTime)
    } else {
        vm.isFullscreen = false;
        vm.isInvisible = false;
    }
});
