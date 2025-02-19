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

    // form validation
    $("#login_form").validate({
        rules: {
            username: {
                required: true, 
                minlength: 1,
                notOnlySpaces: true
            },
            password: {
                required: true,
                minlength: 1, 
                notOnlySpaces: true 
            }
        },
        messages: {
            username: {
                required: "Please enter your username.",
                notOnlySpaces: "Username cannot be empty."
            },
            password: {
                required: "Please enter your password.",
                notOnlySpaces: "Password cannot be empty."
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "password") {
                error.appendTo($('.pwd_inpErr')[0]);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            form.submit(); 
        }
    });
    
    $.validator.addMethod("notOnlySpaces", function(value, element) {
        return value.trim().length > 0; 
    }, "This field cannot be empty.");
})