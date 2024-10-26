document.addEventListener('DOMContentLoaded', function() {
    var my_modal = document.getElementById('my_modal');
    var span_tag = document.getElementById('show_time');
    var countdown_call = '';
    var time_count = 0;

    function showModal(){
        my_modal.style.display = "block";
        // countdown after show
        countdown_call = setInterval(updateTime, 1000); // call for every 1s
    }

    function closeModal(){
        my_modal.style.display = "none";
    }

    // يمكن استدعاء showModal() لفتح المودال تلقائياً بعد فترة
    // setTimeout(showModal, 1000);
});


