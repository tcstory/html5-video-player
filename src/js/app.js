/**
 * Created by tcstory on 11/12/15.
 */

"use strict";

var configMap = {
    defaultVolume: 0.7,
    defaultVideoQuality: 'medium',
    hideTime: 2000,
    delayId: null,
    initTime: '0:00:00',
    videoPlayer: '#video-player'
};


var videoVM = new Vue({
    el: '#video-player',
    data: {
        isPlaying: false,
        isSetting: false,
        isSettingQuality: false,
        curVolume: configMap.defaultVolume,
        curProgress: 0,
        isFullscreen: false,
        isInvisible: false,
        duration: '',
        buffered: 0,
        timeStr: configMap.initTime,
        whichQuality: ''
    },
    watch: {
        curVolume: function (newVal) {
            videoObj.video.volume = newVal;
        }
    },
    methods: {
        playVideo: function () {
            if (this.isPlaying) {
                videoObj.video.pause();
            } else {
                videoObj.video.play();
                configMap.delayId = setTimeout(function () {
                    videoVM.isInvisible = true;
                }, configMap.hideTime)
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
        },
        handleSettingClick: function (ev) {
            if (this.isSettingQuality) {
                this.isSetting = false;
                this.isSettingQuality = false;
            } else {
                this.isSetting = !this.isSetting;
                this.isSettingQuality = false;
            }
        },
        toggleDanmuClick: function (ev) {
            danmu.toggle();
        },
        openQualityWindow: function (ev) {
            this.isSettingQuality = true;
            this.isSetting = false;
        },
        changeQualityClick: function (which) {
            videoQuality.changeVideoQuality(which);
        }
    }
});

var videoObj = (function (videoVM) {
    var _video_obj = {};
    var _video = document.querySelector(configMap.videoPlayer + ' video');
    _video_obj.video = _video;
    _video_obj.duration = _video.duration;
    _video.volume = configMap.defaultVolume;
    _video_obj.controlBar = document.querySelector(configMap.videoPlayer + ' .control-bar');
    _video.addEventListener('loadedmetadata', function (ev) {
        videoVM.duration = convertTime(_video.duration);
    });
    _video.addEventListener('timeupdate', function () {
        var timeId = null;
        if (!timeId) {
            timeId = setTimeout(function () {
                videoVM.curProgress = _video.currentTime / _video.duration;
                videoVM.timeStr = convertTime(_video.currentTime);
                clearTimeout(timeId);
            }, 800);
        }
    });
    _video.addEventListener('playing', function () {
        configMap.delayId = setTimeout(function () {
            videoVM.isInvisible = true;
        });
        videoVM.isPlaying = true;
    });
    _video.addEventListener('pause', function () {
        videoVM.isInvisible = false;
        videoVM.isPlaying = false;
    });
    _video.addEventListener('progress', function () {
        var _len = _video.buffered.length;
        if (_len != 0) {
            videoVM.buffered = _video.buffered.end(_len - 1) / _video.duration;
        }
    });
    _video_obj.changeVideoQuality = function (src) {
        _video.src = src;
    };
    return _video_obj;
})(videoVM);

var volumer = (function (videoVM) {
    var _volumer = {};
    _volumer._isGrag = false;
    _volumer._outer = document.querySelector(configMap.videoPlayer + ' .volume .outer');
    _volumer.handleVolumeClick = function (ev) {
        var _diff = ev.clientX - _volumer._outer.getBoundingClientRect().left;
        videoVM.curVolume = _diff / parseFloat(getComputedStyle(_volumer._outer, null).width)
    };
    _volumer.handleVolumeMousedown = function (ev) {
        _volumer._isGrag = true;
    };
    _volumer.handleVolumeMouseup = function (ev) {
        _volumer._isGrag = false;
    };
    _volumer.handleVolumeMousemove = function (ev) {
        if (_volumer._isGrag) {
            var _diff = ev.clientX - _volumer._outer.getBoundingClientRect().left;
            var _max_width = parseFloat(getComputedStyle(_volumer._outer, null).width);
            if (_diff <= _max_width && _diff > 0) {
                videoVM.curVolume = _diff / _max_width;
            }
        }
    };
    _volumer.handleVolumeMouseleave = function (ev) {
        _volumer._isGrag = false;
    };
    return _volumer;
})(videoVM);

var progressbarer = (function (videoVM) {
    var _progressbarer = {};
    _progressbarer._isGrag = false;
    _progressbarer._outer = document.querySelector(configMap.videoPlayer + ' .progress-bar .outer');
    _progressbarer.handleProgressbarClick = function (ev) {
        var _diff = ev.clientX - _progressbarer._outer.getBoundingClientRect().left;
        videoVM.curProgress = _diff / parseFloat(getComputedStyle(_progressbarer._outer, null).width)
        videoObj.video.currentTime = videoObj.video.duration * videoVM.curProgress;
        videoVM.timeStr = convertTime(videoObj.video.currentTime);
        if (videoObj.video.paused) {
            videoObj.video.play()
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
            var _diff = ev.clientX - _progressbarer._outer.getBoundingClientRect().left;
            var _max_width = parseFloat(getComputedStyle(_progressbarer._outer, null).width);
            if (_diff <= _max_width && _diff > 0) {
                videoVM.curProgress = _diff / _max_width;
                videoObj.video.currentTime = videoObj.video.duration * videoVM.curProgress;
                videoVM.timeStr = convertTime(videoObj.video.currentTime);
                if (videoObj.video.paused) {
                    videoObj.video.play()
                }
            }
        }
    };
    _progressbarer.handleProgressbarMouseleave = function (ev) {
        _progressbarer._isGrag = false;
    };
    return _progressbarer;
})(videoVM);

var settingMenu = (function () {
    var _menu = document.querySelector('.control-bar .setting-window .menu');

})(videoVM);
var danmu = (function () {
    var _danmu = {};
    var toggle_danmu_btn = document.querySelector('#video-player .toggle-danmu-btn');
    _danmu.toggle = function () {
        toggle_danmu_btn.classList.toggle('clicked')
    };
    return _danmu;
})();

var videoQuality = (function () {
    var btn_array = Array.prototype.slice.call(document.querySelectorAll('.change-quality-window  .toggle-btn'));
    var quality_map = {
        high: '超清',
        medium: '高清',
        low: '标清'
    };
    var _v = {};
    _v.changeVideoQuality = function (which) {
        btn_array.forEach(function (item) {
            if (item.dataset['quality'] === which) {
                item.classList.add('clicked');
                videoVM.whichQuality = quality_map[which];
            } else {
                item.classList.remove('clicked');
            }
        })
    };
    _v.setDefaultQuality = function () {
        if (!sessionStorage.getItem('video-quality')) {
            sessionStorage.setItem('video-quality', configMap.defaultVideoQuality);
            videoVM.whichQuality = configMap.defaultVideoQuality;
            videoObj.changeVideoQuality('');
        } else {
            videoVM.whichQuality = quality_map[sessionStorage.getItem('video-quality')];
            videoObj.changeVideoQuality('');
        }
    };
    return _v;
})();


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
        _time = _time + ':' + _minute;
    }
    var _second = seconds % 60;
    if (_second < 10) {
        _time = _time + ':0' + _second;
    } else {
        _time = _time + ':' + _second;
    }
    return _time;
}

function handleFullscreen(videoVM) {
    if (isFullScreen()) {
        videoVM.isFullscreen = false;
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    else {
        videoVM.isFullscreen = true;
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
        videoVM.isFullscreen = true;
    } else {
        videoVM.isFullscreen = false;
    }
});
document.addEventListener('webkitfullscreenchange', function () {
    if (isFullScreen()) {
        videoVM.isFullscreen = true;
    } else {
        videoVM.isFullscreen = false;
    }
});
document.addEventListener('mozfullscreenchange', function () {
    if (isFullScreen()) {
        videoVM.isFullscreen = true;
    } else {
        videoVM.isFullscreen = false;
    }
});
document.addEventListener('msfullscreenchange', function () {
    if (isFullScreen()) {
        videoVM.isFullscreen = true;
    } else {
        videoVM.isFullscreen = false;
    }
});
