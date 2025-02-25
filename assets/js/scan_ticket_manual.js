$(document).ready(function(){
    // ticket search control
    $(".search_btn").on("click",function(){
        let bookingCode=$(".search_input").val().trim();
        searchTicket(bookingCode);
    });

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
                <div class="search_item">
                    <h3 class="fs_20 mb-2">${voucherName}</h3>
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
                `
            }

            // inserting result items
            $(`.search_result`).html(searchItem);
            
        }else{
            let notFoundMsg=`<div class="alert alert-danger p_10 c_danger text-center fw-semibold border-0 rounded_10">😅 Oops, kode booking tidak ditemukan</div>`;
            $(`.search_result`).html(notFoundMsg);
        }

    }

    // confirm ticket decline 
    function confirmTicketDecline(ticketId){
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