window.onload = function(){
    function loopNext(){
        $('#cardContainer').stop().animate({scrollLeft:'+=50'}, 'fast', 'linear', loopNext);
    }

    function loopPrev(){
        $('#cardContainer').stop().animate({scrollLeft:'-=50'}, 'fast', 'linear', loopPrev);
    }

    function stop(){
        $('#cardContainer').stop();
    }


    $('#next').hover(function () {
    loopNext();
    },function () {
    stop();
    });

    $('#prev').hover(function () {
    loopPrev();
    },function () {
    stop();
    });
}