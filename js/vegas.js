// ------------park.html------------
$(function () {
    $('#mainImg').vegas({
        slides: [
            { src: './image/carousel_vegetables.webp' },
            { src: './image/carousel_sea.webp' },
            { src: './image/carousel_fruit.webp' },
            { src: './image/carousel_cafe.webp' }
        ],
        overlay: true,
        transition: 'fade',
        delay: 5000,
        animationDuration: 20000,
    });
});

// ------------tmkRoom.html------------
$(function () {
    $('.mainImg-vertical').vegas({
        slides: [
            { src: './img/ttk.jpg' },
            { src: './img/portrait.jpg' },
            // { src: './img/grave.png' },
            { src: './img/grave.jpg' },
            { src: './img/photo3.jpg' },
            { src: './img/photo4.jpg' },
            { src: './img/photo5.jpg' },
            { src: './img/photo7.jpg' },
            { src: './img/photo8.jpg' },
            { src: './img/blood.jpg' },
            { src: './img/blood2.jpg' }
        ],
        transition: ['fade', 'zoomOut', 'swirlLeft'],
        animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight'],
        delay: 6000,
        animationDuration: 10000,
        timer: false,
    });
});

$(function () {
    $('.mainImg-horizontal').vegas({
        slides: [
            { src: './img/ttk.jpg' },
            { src: './img/portrait.jpg' },
            // { src: './img/grave.png' },
            { src: './img/grave.jpg' },
            { src: './img/photo3.jpg' },
            { src: './img/photo4.jpg' },
            { src: './img/photo5.jpg' },
            { src: './img/photo7.jpg' },
            { src: './img/photo8.jpg' },
            { src: './img/blood.jpg' },
            { src: './img/blood2.jpg' }
        ],
        transition: 'blur',
        animation: 'kenburns',
        delay: 6000,
        animationDuration: 10000,
        timer: false,
    });
});

// lightbox CSSanimation 繰り返し用
$(function () {
    setInterval(function () {
        $('#move').toggleClass('move');
    }, 70000);
});
$(function () {
    setInterval(function () {
        $('#stretch').toggleClass('stretch');
    }, 67000);
});
$(function () {
    setInterval(function () {
        $('#sway').toggleClass('sway');
    }, 63000);
});
$(function () {
    setInterval(function () {
        $('#jump').toggleClass('jump');
    }, 63000);
});

$(function () {
    setInterval(function () {
        $('#move').toggleClass('jump');
    }, 60000);
});
$(function () {
    setInterval(function () {
        $('#stretch').toggleClass('sway');
    }, 60000);
});
$(function () {
    setInterval(function () {
        $('#sway').toggleClass('stretch');
    }, 60000);
});
$(function () {
    setInterval(function () {
        $('#jump').toggleClass('move');
    }, 60000);
});