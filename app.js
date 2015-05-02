var enabled = false;
var counter = 60 * 60;

function enable() {
    enabled = true;
    $('#btn-stop').css('background-color','#844');
    $('#btn-set').css('background-color','#666');
    $('#btn-start').css('background-color','#666');
}

function disable() {
    enabled = false;
    $('#btn-stop').css('background-color','#666');
    $('#btn-set').css('background-color','#488');
    $('#btn-start').css('background-color','#484');
    setBack('#222')
}

function setBack(color) {
    $('body').css('background-color', color);
}

function formatScreen() {
    if(counter > 40 * 60) {
        setBack('#232')
    }else if(counter > 20 * 60) {
        setBack('#332');
    }else if(counter > 5 * 60) {
        setBack('#321');
    }else if(counter > 0 * 60) {
        setBack('#322');
    }else{
        setBack('#222')
    }
}


setInterval(function() {
    $('#time').html(moment().format("hh:mm:ss A"));
    if(enabled) {
        counter -= 1;
        formatScreen();
        if(counter < 60) {
            $('#timer').html(counter);
            $('#timer-label').html("seconds remaining");
        }else{
            $('#timer').html(Math.floor(counter / 60));
            $('#timer-label').html("minutes remaining");
        }
        if(counter <= 0) {
            disable();
            $('#timer-label').html("---");
            $('#timer').html("STOP");
            $('#horn')[0].play()
        }
    }
}, 1000);

$(function() {
    $('#time').html(moment().format("hh:mm:ss A"));

    $('.btn-preset').click(function() {
        console.log($(this));
        $('#timer-value').val($(this).val());
        counter = $('#timer-value').val() * 60
        if(counter < 60) {
            $('#timer').html(counter);
            $('#timer-label').html("seconds remaining");
        }else{
            $('#timer').html(Math.floor(counter / 60));
            $('#timer-label').html("minutes remaining");
        }

    });

    $('#btn-start').click(function() {
        enable();
    });

    $('#btn-stop').click(function() {
        disable()
    });

    $('#btn-set').click(function() {
        counter = $('#timer-value').val() * 60
        if(counter < 60) {
            $('#timer').html(counter);
            $('#timer-label').html("seconds remaining");
        }else{
            $('#timer').html(Math.floor(counter / 60));
            $('#timer-label').html("minutes remaining");
        }
    });
});
