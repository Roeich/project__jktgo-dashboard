$(document).ready(function(){
    // ---- custom murquee
    $('.cus_marquee').marquee({
        duration: 12000,
        gap: 50,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: true,
        pauseOnHover:true
    });

    // ---- date range picker 
    $(".date_rangePicker").daterangepicker({
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
})