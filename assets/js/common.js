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

    // search reset button
    function toggleResetButton(input) {
        let resetBtn = input.siblings(".search_resetBtn");
        input.val().trim().length > 0 ? resetBtn.show() : resetBtn.hide();
    }
    
    $(document).ready(function() {
        $(".search_inpWrap .form-control").each(function() {
            toggleResetButton($(this));
        });
    });
    
    $(document).on("input", ".search_inpWrap .form-control", function() {
        toggleResetButton($(this));
    });
    
    $(document).on("click", ".search_resetBtn", function() {
        let input = $(this).siblings(".form-control");
        input.val("").trigger("input"); 
        $(".search_result").html("");
        $(this).hide();
    });
})