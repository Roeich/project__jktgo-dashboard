$(document).ready(function(){
    // collapse side menu
    $(".header_tglBtn,.header_backdrop").click(function(){
        $(".header").toggleClass("active_header");
    });

    // custom murquee
    $('.cus_marquee').marquee({
        duration: 12000,
        gap: 50,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: true,
        pauseOnHover:true
    });

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


    // Sales Growth chart

    const salesGrowth_chart = new ApexCharts(document.querySelector("#salesGrowth_chart"), {
        chart: {
            type: "area",
            height: "100%",
            width: "100%",
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        series: [
            {
                name: "Purchase",
                data: [16, 28, 33, 26, 32, 38, 48],
            },
            {
                name: "Redeem",
                data: [16, 22, 42, 20, 25, 40, 50],
            }
        ],
        xaxis: {
            categories: ["21 Dec","22 Dec","23 Dec","24 Dec","25 Dec","26 Dec","27 Dec"]
        },
        yaxis: {
            axisTicks: {
                show: false
            }
        },
        colors: ["#007FFF","#25CD25"],
        fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0.4,
              opacityFrom: 0.60,
              opacityTo: 0,
              stops: [0,100]
            }
        },
        grid: {
            row: {
                opacity: 1
            },
            column:{
                opacity: 1
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 1.2,
            dashArray: 3,
            curve: 'straight'
        },
        legend: {
            position:"top",
            horizontalAlign: 'center', 
            markers: {
                radius: 12
            }
        }
        
    });
    salesGrowth_chart.render();
    
    const age_chart = new ApexCharts(document.querySelector("#age_chart"), {
        chart: {
            type: "pie",
            height: "100%",
            width: "100%",
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        series: [25, 17, 32, 21],
        labels: ['< 20 th', '20-35 th', '36-50 th', '> 50 th'],
        colors: ["#FFBB38","#00C06D","#396AFF","#FF4986"],
        grid: {
            strokeDashArray: 3,
            row: {
                opacity: 1
            },
            column:{
                opacity: 1
            }
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            show: true,
            width: 1
        },
        legend: {
            position:'bottom',
            horizontalAlign: 'center', 
            markers: {
                radius: 12
            }
        }
        
    });
    age_chart.render();


    // transaction table
    const transaction_table = $("#transaction_table").DataTable({
        paging: true,
        searching:true,
        info:true,
        responsive: {
            details: true
        },
        columnDefs: [
            { className: 'dt-left', targets: '_all' },
            { targets: [ 4 ], className: 'dt-right' },
            { responsivePriority: 1, targets: 1 },
            { responsivePriority: 2, targets: -1 }
        ],
    });
    $('#transaction_searchInp').on('keyup', function () {
        transaction_table.search($(this).val()).draw();
    });
    $('.filter_dropdown input[type="checkbox"]').on('change', function () {
        let selectedStatuses = [];
        $('.filter_dropdown input[type="checkbox"]:checked').each(function () {
            selectedStatuses.push($(this).val());
        });
        transaction_table.column(4).search(selectedStatuses.join('|'), true, false).draw();
    });


    // select2 js 
    $('.select2default').select2({minimumResultsForSearch: Infinity});
})