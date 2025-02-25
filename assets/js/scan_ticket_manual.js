$(document).ready(function(){
    // ticket search control
    $(".search_btn").on("click",function(){
        let bookingCode=$(".search_input").val().trim();
        searchTicket(bookingCode);
    });

    function searchTicket(bookingCode){
        if(bookingCode==="7781GV3"){

            // loaded data
            let ticketDetails={
                ticketType: "✨ VIP",
                ticketDate: "20 Jan 2024",
                ticketStatus: "error",
                userName: "Damian Rhino",
                userPhone: "08123456789",
                userEmail: "damian@mail.com",
                userGender: "Male",
            }
    
            // preparing to template
            let {ticketType,ticketDate,ticketStatus,userName,userPhone,userEmail,userGender}= ticketDetails;

            // preparing search item
            let searchItem=`
                <div class="search_item">
                    <div class="d-flex justify-content-between">
                        <div class="pe-2 fw-bold">
                            ${ticketType} Ticket
                        </div>
                        <div>
                            Kode Booking: <b>${bookingCode}</b>
                        </div>
                    </div>
                    <div class="fs_14">
                        <i class="icon icon_calender"></i> ${ticketDate}
                    </div>
                    <div>
                        <div class="fs_14 mb-1">${userName}</div>
                        <div class="fs_12 d-flex flex-wrap">
                            <div class="pe-2 me-2 border-end"><a href="tel:${userPhone}"><i class="icon icon_phone"></i> ${userPhone}</a></div>
                            <div class="pe-2 me-2 border-end"><a href="mailto:${userEmail}"><i class="icon icon_mailbox"></i> ${userEmail}</a></div>
                            <div class="pe-2 me-2 border-end"><i class="icon icon_gender"></i> ${userGender}</div>
                        </div>
                    </div>
                    <div>
                        <div class="alert alert_danger ${ticketStatus=="error"?"":"d-none"}">
                            Tanggal tidak sesuai
                        </div>
                        <div class="alert alert_success ${ticketStatus=="success"?"":"d-none"}">
                            Tiket Valid
                        </div>
                    </div>
                </div>
            `;

            // inserting result items
            $(`.search_result`).html(searchItem);
            
        }else{
            let notFoundMsg=`<div class="alert alert-danger p_10 c_danger text-center fw-semibold border-0 rounded_10">😅 Oops, kode booking tidak ditemukan</div>`;
            $(`.search_result`).html(notFoundMsg);
        }

    }

    // confirm ticket decline 
    function confirm_ticket_decline(ticketId){
        $("#ticketDeclineModal").modal("show");
    }
    window.confirm_ticket_decline=confirm_ticket_decline;

})