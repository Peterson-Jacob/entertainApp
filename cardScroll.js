window.onload = function(){
    function loopNext(){
        $('#cardContainer').stop().animate({scrollLeft:'+=75'}, 'fast', 'linear', loopNext);
    }

    function loopPrev(){
        $('#cardContainer').stop().animate({scrollLeft:'-=75'}, 'fast', 'linear', loopPrev);
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