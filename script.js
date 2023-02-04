// Initialize the camera stream
Quagga.init({
  inputStream: {
    type : "LiveStream",
    constraints: {
      width: {min: 640},
      height: {min: 480},
      facingMode: "environment"
    }
  },
  locator: {
    patchSize: "medium",
    halfSample: true
  },
  numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
  decoder: {
    readers: [{
      format: "code_128_reader",
      config: {}
    }]
  },
  locate: true
}, function(err) {
  if (err) {
    return console.log(err);
  }
  var cameraContainer = document.getElementById("camera-container");
  cameraContainer.dataset.initialized = true;
  Quagga.start();
});

// Handle the detection of a QR code
Quagga.onDetected(function(result) {
  var output = document.getElementById("output");
  output.innerHTML = result.codeResult.code;
});
