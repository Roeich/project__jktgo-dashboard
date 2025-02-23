$(document).ready(function(){
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

    // collapse side menu
    $(".header_tglBtn,.header_backdrop").click(function(){
        $(".header").toggleClass("active_header");
    });

    // select2 js 
    $('.select2default').select2({minimumResultsForSearch: Infinity});

    // smooth scrollbar
    Scrollbar.initAll();
})