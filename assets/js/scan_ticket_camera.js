$(document).ready(function(){
    // .......... control scanning
    var cameraId;
    const html5QrCode = new Html5Qrcode("reader");

    function openQrScanner() {
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                const cameraSelect = $("#cameraSelect");
                cameraSelect.empty();

                let backCamera = devices.find(device => device.label.toLowerCase().includes("back"));
                let frontCamera = devices.find(device => device.label.toLowerCase().includes("front"));

                // Prioritize back camera by default
                cameraId = backCamera ? backCamera.id : devices[0].id;

                devices.forEach((device) => {
                    cameraSelect.append(new Option(device.label, device.id));
                });

                cameraSelect.val(cameraId); // Set the selected camera

                cameraSelect.change(() => {
                    cameraId = cameraSelect.val(); // Update cameraId when selection changes
                    html5QrCode.stop().then(() => {
                        startQrScanner(); 
                    });
                });


                startQrScanner();
            }
        }).catch(err => {
            console.error("Error getting cameras: ", err);
        });
    }

    function startQrScanner() {
        html5QrCode.start(
            cameraId,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 } // Bounded box size
                // ,showTorchButtonIfSupported: true
            },
            (decodedText, decodedResult) => {
                html5QrCode.stop();
                
                searchTicket("#scanInputModal",decodedText);

                var offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('scanInputModal'));
                if (offcanvas) {
                    offcanvas.hide();
                }
            },
            (errorMessage) => {
                // Ignore errors
            }
        ).catch(err => {
            console.error("Start failed: ", err);
        });
    };

    function powerTorch(powerOn){    
        if(html5QrCode.getState() === Html5QrcodeScannerState.SCANNING || html5QrCode.getState() === Html5QrcodeScannerState.PAUSED){
            html5QrCode.applyVideoConstraints({
                advanced: [{torch: powerOn}]
            });
        }
    };
    $(".stop_scan_btn").click(() => {
        html5QrCode.stop().then(() => {
            console.log("QR scanner stopped.");
        }).catch(err => {
            console.error("Stop failed: ", err);
        });
    });

    let flashlightOn = false; 
    $(".toggle_flashlight_btn").click(() => {
        flashlightOn = !flashlightOn; 
        powerTorch(flashlightOn);
        if(flashlightOn){
            $(".toggle_flashlight_btn").addClass("active");
        }else{
            $(".toggle_flashlight_btn").removeClass("active");
        }
    });

    $(".open_camera_btn").click(() => {
        openQrScanner();
    });
    // openQrScanner();
})