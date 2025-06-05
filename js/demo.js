var $body = $('body'),
    $characters = $('.characters'),
    $posters = $('.characters-poster'),
    $names = $('.characters-list a'),
    $label = $('.characters-label');

var backgrounds = [
    { src: 'img/background.png', valign: 'top' },
    { src: 'img/background2.png', valign: 'top' },
    { src: 'img/background3.png', valign: 'top' },

    {
        src: 'img/cry.gif', delay: 15000, video: [
            'img/mov1.mp4'
        ]
        // src: 'img/2.jpg', delay: 6500, video: [
        //     'img/intro.mp4',
        //     'img/intro.ogv',
        //     'img/intro.webm'
        // ]
    }
];

var posters = [
    { src: 'img/black.jpg' },
    // { src: 'img/grave.png' },
    { src: 'img/grave.jpg' },
    { src: 'img/portrait.jpg' },
    { src: 'img/blood.jpg' },
    { src: 'img/blood2.jpg' },
    { src: 'img/photo15.jpg' },
    { src: 'img/bg8.jpg' },
    { src: 'img/bg7.jpg' },
    { src: 'img/photo16.jpg' },
    { src: 'image/kg.png' }
];

var backdrops = [
    { src: 'img/black.jpg' },
    // { src: 'img/grave.png' },
    { src: 'img/grave.jpg' },
    { src: 'img/portrait.jpg' },
    { src: 'img/blood.jpg' },
    { src: 'img/blood2.jpg' },
    { src: 'img/photo15.jpg' },
    { src: 'img/bg8.jpg' },
    { src: 'img/bg7.jpg' },
    { src: 'img/photo16.jpg' },
    { src: 'image/kg.png' }
];

$('html').addClass('animated');

var displayBackdrops = false;

$body.vegas({
    preload: true,
    overlay: 'img/overlay.png',
    transitionDuration: 4000,
    delay: 10000,
    slides: backgrounds,
    walk: function (nb, settings) {
        if (settings.video) {
            $('.logo').addClass('collapsed');
        } else {
            $('.logo').removeClass('collapsed');
        }
    }
});

$posters.vegas({
    preload: true,
    transition: 'swirlLeft2',
    transitionDuration: 1000,
    timer: false,
    delay: 8550,
    slides: posters,
    walk: function (nb) {
        $characters
            .find('li')
            .removeClass('active')
            .eq(nb)
            .addClass('active');

        $label.removeClass('animated');

        setTimeout(function () {
            var name = $names.eq(nb).data('character');

            $label
                .text(name)
                .addClass('animated');
        }, 250);

        if (displayBackdrops === true) {
            var backdrop;

            backdrop = backdrops[nb];
            backdrop.animation = 'kenburns';
            backdrop.animationDuration = 20000;
            backdrop.transition = 'fade';
            backdrop.transitionDuration = 1000;

            $body
                .vegas('options', 'slides', [backdrop])
                .vegas('next');
        }
    }
});

$posters
    .on('mouseenter', function () {
        displayBackdrops = true;

        $posters
            .vegas('trigger', 'walk')
            .vegas('pause');
    })
    .on('click', debounce(function (e) {
        $posters.vegas('next');

        e.preventDefault();
    }, 250, true));

$characters
    .on('mouseenter', function () {
        displayBackdrops = true;
    })
    .on('mouseleave', function () {
        displayBackdrops = false;

        $body
            .vegas('options', 'slides', backgrounds)
            .vegas('next');

        $posters.vegas('play');
    });

$names
    .on('click', function (e) {
        e.preventDefault();
    })
    .on('mouseenter', debounce(function (e) {
        e.preventDefault();

        var index = $(this).index('.characters-list a');

        $posters
            .vegas('jump', index)
            .vegas('pause');
    }, 250));

// JavaScript Debounce Function
// By David Walsh
// http://davidwalsh.name/javascript-debounce-function

function debounce(func, wait, immediate) {
    var timeout;

    return function () {
        var context = this,
            args = arguments,
            later = function () {
                timeout = null;

                if (!immediate) {
                    func.apply(context, args);
                }
            },
            callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 500);

        if (callNow) {
            func.apply(context, args);
        }
    };
}