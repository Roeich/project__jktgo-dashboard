$(document).ready(function(){
    /* ----------------- start common functionality ----------------- */
    // password toggle functionality
    $(".pwd_tglBtn").click(function() {
        const parentWrapper = $(this).parents(".pwd_inpItem");
        const inpItem = $(parentWrapper).find(".inp_password");

        if (inpItem.attr("type") == "password") {
            $(parentWrapper).addClass("show_pwd");
            $(inpItem).attr("type", "text");
        } else {
            $(parentWrapper).removeClass("show_pwd");
            $(inpItem).attr("type", "password");
        }
    });
    /* ----------------- end common functionality ----------------- */
})