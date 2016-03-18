(function () {
    var video = document.querySelector('.camera__video'),
        canvas = document.querySelector('.camera__canvas');
 
    var getVideoStream = function (callback) {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
 
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
                function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.onloadedmetadata = function (e) {
                        video.play();
 
                        callback();
                    };
                },
                function (err) {
                    console.log("The following error occured: " + err.name);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    };
 
     
   
 
    var applyFilter = function () {
        var filterName = document.querySelector('.controls__filter').value;
        var imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
 
        switch (filterName){
            case ("invert"):
                for (var i = 0; i < data.length; i += 4) {
 
 
                    // red
                    data[i] = 255-data[i];
                    // green
                    data[i + 1] = 255-data[i+1];
                    // blue
                    data[i + 2] = 255-data[i+2];
                }
                break;
            case ("grayscale"):
                for (var i = 0; i < data.length; i += 4) {
                    var r = data[i];
                    var g = data[i+1];
                    var b = data[i+2];
                    var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
 
                    data[i] = data[i+1] = data[i+2] = v;
                }
                break;
            case ("threshold"):
                for (var i = 0; i < data.length; i += 4) {
                    var r = data[i];
                    var g = data[i+1];
                    var b = data[i+2];
                    var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 128) ? 255 : 0;
 
                    data[i] = data[i+1] = data[i+2] = v;
                }
                break;
        }
 
 
        canvas.getContext('2d').putImageData(imageData, 0, 0);
         
    };
 
    var captureFrame = function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
 
        canvas.getContext('2d').drawImage(video, 0, 0);
        applyFilter();
    };
 
    getVideoStream(function () {
        captureFrame();
 
        setInterval(captureFrame, 160);
    });
})();