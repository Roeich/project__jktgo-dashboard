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
})