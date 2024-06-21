let originalPage = window.location.href;
let toggled = false;

document.getElementById('toggleButton').addEventListener('click', function() {
    if (!toggled) {
        window.location.href = 'file:///D:/web2/dopamin-b.html';
        toggled = true;
    } else {
        window.location.href = 'file:///D:/web2/dopamin-b.html';
        toggled = false;
    }
});









document.addEventListener("DOMContentLoaded", function() {
    var videoElement = document.getElementById('videoElement');
    var playButton = document.getElementById('playButton');
    var isFullscreen = false; // 전체 화면 상태를 나타내는 변수
    var controlsTimeout = null; // 컨트롤 숨김 타임아웃 변수

    // 초기에 컨트롤 숨기기
    videoElement.controls = false;

    function openFullscreen(element) {
        if (element.requestFullscreen) {
            return element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            return element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
            return element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            return element.msRequestFullscreen();
        }
        return Promise.reject(new Error('Fullscreen API is not supported'));
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            return document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            return document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            return document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            return document.msExitFullscreen();
        }
        return Promise.reject(new Error('Fullscreen API is not supported'));
    }

    // 전체 화면 상태 변경 이벤트
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement === videoElement) {
            // 전체 화면 모드에서는 컨트롤 숨기기
            videoElement.controls = false;
            isFullscreen = true;
            startControlTimeout();
        } else {
            // 전체 화면 종료 시 기본 컨트롤 보이지 않기
            videoElement.controls = false;
            isFullscreen = false;
            clearTimeout(controlsTimeout);
        }
    });

    // 재생 버튼 클릭 시 전체 화면으로 진입
    playButton.addEventListener('click', function() {
        openFullscreen(videoElement).then(() => {
            videoElement.play();
            playButton.style.display = 'none';
            startControlTimeout(); // 컨트롤 숨기기 시작
        }).catch(err => {
            console.error('Error attempting to enable full-screen mode:', err);
            videoElement.play();
            playButton.style.display = 'none';
            startControlTimeout(); // 컨트롤 숨기기 시작
        });
    });

    // 마우스가 움직일 때마다 컨트롤 숨기기
    document.addEventListener('mousemove', function() {
        startControlTimeout(); // 마우스가 움직일 때마다 숨김 타임아웃 시작
    });

    // 컨트롤 숨기기
    function startControlTimeout() {
        if (isFullscreen && !videoElement.paused) {
            videoElement.controls = false;
            clearTimeout(controlsTimeout); // 이전 타임아웃 클리어
            controlsTimeout = setTimeout(function() {
                videoElement.controls = false;
            }, 0); // 바로 숨기기
        }
    }

    // 동영상 종료 시 처리
    videoElement.addEventListener('ended', function() {
        closeFullscreen().then(() => {
            playButton.style.display = 'block';
            videoElement.controls = false; // 동영상 종료 시 컨트롤 숨기기
            isFullscreen = false;
        }).catch(err => {
            console.error('Error attempting to exit full-screen mode:', err);
            playButton.style.display = 'block';
            videoElement.controls = false; // 동영상 종료 시 컨트롤 숨기기
            isFullscreen = false;
        });
    });
});


