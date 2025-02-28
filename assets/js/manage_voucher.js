$(document).ready(function(){
    // voucher_table table
    const voucher_table = $("#voucher_table").DataTable({
        paging: true,
        searching:false,
        info:true,
        lengthChange: false,
        responsive: {
            details: true
        },
        columnDefs: [
            { className: 'dt-left', targets: '_all' },
            { targets: [ 4 ], className: 'dt-right' },
            { responsivePriority: 1, targets: 1 },
            { responsivePriority: 2, targets: -1 },
            { responsivePriority: 3, targets: 0 }
        ],
    });

    // delete voucher
    var voucherId=null;
    var tarRow=null;
    function deleteVoucher(currentItem,voucher_id){
        voucherId=voucher_id;
        tarRow=$(currentItem).parents("tr");
        $("#voucherDeleteModal").modal("show");
    }
    window.deleteVoucher=deleteVoucher;

    $(".confirmDeleteVoucher").click(function(){
        voucher_table.row(tarRow).remove().draw();
        $("#voucherDeleteModal").modal("hide");

        voucherId=null;
        tarRow=null;
    });
 
})