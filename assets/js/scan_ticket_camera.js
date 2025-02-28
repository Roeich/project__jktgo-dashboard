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
                qrbox: { width: 230, height: 230 } // Bounded box size
                // ,showTorchButtonIfSupported: true
            },
            (decodedText, decodedResult) => {
                html5QrCode.stop();
                
                searchTicket(decodedText);
            
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
    openQrScanner();


    // search Ticket modal
    // searchTicket("7781GV3");
    function searchTicket(bookingCode){
        // loaded data
        let ticketDetails={
            isRedeemed: false,
            redeemDate: "Friday, 9 Okt 2024 16:10:12",
            voucherName: "Voucher Name",
            placeName: "Precious Billiard",
            placeArea: "Hotel",
            date: "01 Dec 2024 - 31 Dec 2024",
            userName: "Guido Aprilio",
            userPhone: "0857218721897",
            userEmail: "guido@gmail.com"
        }

        // preparing to template
        let {isRedeemed,redeemDate,voucherName,placeName,placeArea,date,userName,userPhone,userEmail}= ticketDetails;
       
        if(bookingCode==="7781GV3"){
            // preparing search item
            let searchItem=`
                <div class="modal-header">
                    <h3 class="modal-title fs_20 mb-0" id="searchResultModalLabel">${voucherName}</h3>
                    <button type="button" class="btn-close rounded-circle decline_cancel_btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0 pb-4">
                    <div class="search_result">
                        <div class="search_item">
                            <div class="fs_14 mb-2">
                                <i class="fa-solid fa-store me-1"></i> ${placeName} 
                            </div>
                            <div class="fs_14 c_darkGray mb_16">
                                <i class="fa-solid fa-ticket-simple me-1"></i> ${placeArea} | <i class="fa-solid fa-calendar me-1"></i> ${date}
                            </div>
                            <div class="p_12 border rounded_10 bg_light mb_16">
                                <table class="table-sm w-100">
                                    <tr>
                                        <td class="c_darkGray">
                                            <i class="fa-solid fa-user c_white me-1"></i> Name
                                        </td>
                                        <td class="fw-medium">${userName}</td>
                                    </tr>
                                    <tr>
                                        <td class="c_darkGray">
                                            <i class="fa-solid fa-phone c_white me-1"></i> Phone Number
                                        </td>
                                        <td class="fw-medium">${userPhone}</td>
                                    </tr>
                                    <tr>
                                        <td class="c_darkGray">
                                            <i class="fa-solid fa-envelope c_white me-1"></i> E-mail
                                        </td>
                                        <td class="fw-medium">${userEmail}</td>
                                    </tr>
                                </table>
                            </div>
                        `;
            if(isRedeemed){
                searchItem+=`
                            <div class="mb_16">
                                <div class="alert alert-danger p_10 c_danger text-center fw-semibold border-0 rounded_10">
                                    This booking code has been redeemed
                                </div>
                            </div>
                            <div class="d-flex justify-content-between gap-2 mb_16">
                                <div class="c_darkGray">Redeem date</div>
                                <div>${redeemDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }else{
                searchItem+=`
                            <div>
                                <div class="row gx-2">
                                    <div class="col-6">
                                        <button class="btn btn_def btn_shadow btn-danger rounded-pill w-100" type="button" onclick="confirmTicketDecline('${bookingCode}')">Decline</button>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn_def btn_shadow btn_primary rounded-pill w-100" type="button" onclick="redeemTicket('${bookingCode}')">Redeem</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }

            // inserting result items
            $(`#searchResultModal .modal-content`).html(searchItem);
            $("#searchResultModal").modal("show");
            
        }else{
            let notFoundMsg=`
                <div class="modal-header">
                    <button type="button" class="btn-close rounded-circle decline_cancel_btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0 pb-4">
                    <div class="alert alert-danger p_10 c_danger text-center fw-semibold border-0 rounded_10 mb-0">😅 Oops, kode booking tidak ditemukan</div>
                </div>
            `;
            $(`#searchResultModal .modal-content`).html(notFoundMsg);
            $("#searchResultModal").modal("show");
        }

    }

    // confirm ticket decline 
    function confirmTicketDecline(ticketId){
        $("#searchResultModal").modal("hide");
        $("#ticketDeclineModal").modal("show");
    }
    function redeemTicket(ticketId){
        showSuccessToast(`<i class="fa-solid fa-circle-check icon_normal fs_16 me-2"></i> <b class="fw-semibold me-1">Successfully Redeemed</b> ${ticketId} - Guido Aprilio`);
    }

    window.confirmTicketDecline=confirmTicketDecline;
    window.redeemTicket=redeemTicket;

    // decline button
    $(".decline_btn").click(function(){
        let declineReason = $("#decline_reason").val();
        let ticketId=$(this).attr("data-ticket-id");

        $("#decline_reason").val("");
        $("#ticketDeclineModal").modal("hide");

        // show success toast
        showSuccessToast(`<i class="fa-solid fa-circle-check icon_normal fs_16 me-2"></i> <b class="fw-semibold me-1">Successfully declined</b> ${ticketId} - Guido Aprilio`);
    });

    $(".decline_cancel_btn").click(function(){
        $("#decline_reason").val("");
    });

    function showSuccessToast(msg){
        $("#successToast .toast_msg").html(msg);
        $("#successToast").toast("show");
    }
})