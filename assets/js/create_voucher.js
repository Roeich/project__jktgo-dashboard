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
        "startDate": "05/06/2024",
        "endDate": "05/22/2024",
        "opens": "left"
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
})