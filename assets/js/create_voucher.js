$(document).ready(function(){
    // date range picker 
    $("#date_rangePicker").daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment(), 
        endDate: moment().add(14, 'days'), 
        minDate: moment(),
    }, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });

    // image upload previewer 
    $('.img_inpFile').on('change', function(event) {
        let input = event.target;
        let preview = $(this).siblings('.img_inpPreview');
        let box = $(this).closest('.img_inpBox'); 
        let defaultImage = preview.attr('src');

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                preview.attr('src', e.target.result);
                box.addClass('img_uploaded'); 
            };
            reader.readAsDataURL(input.files[0]);
        }

        preview.data('default-src', defaultImage);
    });

    $('.img_inpResetBtn').on('click', function() {
        let box = $(this).closest('.img_inpBox');
        let preview = $(this).siblings('.img_inpPreview');
        let input = $(this).siblings('.img_inpFile');

        preview.attr('src', preview.data('default-src'));
        input.val('');
        box.removeClass('img_uploaded'); // Remove class when reset
    });

    // 
    function togglediscountPrice() {
        if ($('.discountActive').is(':checked')) {
            $('[name="price"]').attr("placeholder","Price From");
            $(".discountPriceCol").show();
        } else {
            $(".discountPriceCol").hide();
            $('[name="price"]').attr("placeholder","Price");
        }
    }
    togglediscountPrice();
    $('.discountActive').on('change', function() {
        togglediscountPrice();
    });

    // create voucher form validation
    $("#createVoucherForm").validate({
        ignore: "",
        rules: {
            voucherName: {
                required: true,
                minlength: 3
            },
            description: {
                required: true
            },
            period: {
                required: true,
                date: false, // Disable default date validation
                validatePeriod: true // Custom rule for daterangepicker
            },
            category: {
                required: true
            },
            termsAndConditions: {
                required: true
            },
            quata: {
                required: true,
                number: true,
                min: 1
            },
            qtyVoucher: {
                required: true,
                number: true,
                min: 1
            },
            thumbnail: {
                required: true,
                extension: "jpg|jpeg|png",
                accept: "image/jpeg, image/jpg, image/png"
            },
            "photoGallery[]": {
                required: true,
                extension: "jpg|jpeg|png",
                accept: "image/jpeg, image/jpg, image/png"
            },
            price: {
                required: true,
                number: true,
                min: 1
            },
            discountPrice: {
                required: function () {
                    return $("#discountActive").is(":checked"); // Only required if discountActive is checked
                },
                number: true,
                max: function () {
                    return parseFloat($("input[name='price']").val()) || 0;
                }
            }
        },
        messages: {
            voucherName: {
                required: "Please enter a voucher name",
                minlength: "Voucher name must be at least 3 characters"
            },
            description: "Please enter a description",
            period: "Please select a valid date range",
            category: "Please select a category",
            termsAndConditions: "Please enter terms and conditions",
            quata: {
                required: "Please enter the quota",
                number: "Please enter a valid number",
                min: "Quota must be at least 1"
            },
            qtyVoucher: {
                required: "Please enter quantity",
                number: "Please enter a valid number",
                min: "Quantity must be at least 1"
            },
            thumbnail: {
                required: "Please upload a thumbnail",
                extension: "Only .jpg, .jpeg, .png formats are allowed"
            },
            "photoGallery[]": {
                required: "Please upload at least one photo",
                extension: "Only .jpg, .jpeg, .png formats are allowed"
            },
            price: {
                required: "Please enter price",
                number: "Please enter a valid number",
                min: "Price must be at least 1"
            },
            discountPrice: {
                required: "Please enter an ending price (required if discount is active)",
                number: "Please enter a valid number",
                max: "Discount price must be less than actual price"
            }
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            if (element.attr("name") === "quata") {
                error.appendTo("#quata_errMsg");
            } else if (element.attr("name") === "category") {
                error.appendTo("#category_errMsg");
            } else if (element.attr("name") === "thumbnail") {
                error.appendTo("#thumbnail_errMsg");
            } else if (element.attr("name") === "photoGallery[]") {
                error.appendTo("#photoGallery_errMsg");
            } else if (element.attr("name") === "price") {
                error.appendTo("#price_errMsg");
            } else if (element.attr("name") === "discountPrice") {
                error.appendTo("#discountPrice_errMsg");
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            form.submit();
            /* 
                $.ajax({
                    url: "your-server-endpoint-url",
                    method: "POST",
                    data: $(form).serialize(), // Serialize the form data
                    success: function(response) {
                    console.log("Form submitted successfully.");
                    },
                    error: function(xhr, textStatus, errorThrown) {
                    console.error("Form submission failed:", errorThrown);
                    }
                });
            */
        }
    });
    $.validator.addMethod("validatePeriod", function (value, element) {
        return value.trim() !== ""; // Ensure it is not empty
    }, "Please select a valid date range.");
    $('select[name="category"]').on("change", function () {
        $(this).valid();
    });
    $('input[name="thumbnail"], input[name="photoGallery[]"]').on("change", function () {
        $(this).valid(); 
    });
    $('input[name="price"],input[name="discountPrice"]').on("input", function(){
        calculateDiscount();
        $(this).valid();
    });
    function calculateDiscount(){
        let actualPrice=$('input[name="price"]').val();
        let discountPrice=$('input[name="discountPrice"]').val();

        let discountPercent= ((actualPrice-discountPrice)/actualPrice)*100;
        if(discountPercent>0){
            $(".discount_percent").text("-"+discountPercent.toFixed(2)+"%");

        }else{
            $(".discount_percent").text("%");
        }
    }
})