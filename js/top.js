var window_size = $(window).width(),
    header_point;
const menuBtn = $('.menu-toggler'),
    menuTarget = menuBtn.data('target'),
    menuObj = $('#' + menuTarget),
    animateTime = 500,
    mobile_point = 900;

if (window_size > mobile_point) {
    header_point = 300;
} else {
    header_point = 150;
}

$('a[href^="#"]').click(function () {
    var href = $(this).attr('href'),
        target = $(href == "#" || href == "" ? 'html' : href),
        position = target.offset().top;

    scrollPosition(position - header_point);
    return false;
});

scrollMenu($(window).scrollTop() > header_point)

$(window).on('resize', function () {
    window_size = $(window).width();
    if (mobile_point < window_size) {
        if (menuBtn.data('open') == false) {
            openMenu(false);
        }
        menuObj.show();
    } else {
        if (menuBtn.data('open') == true) {
            openMenu(true);
        }
        menuObj.hide();
    }
});

$(window).on('scroll', function () {
    if (window_size <= mobile_point) {
        if (menuObj.css('display') != "none") {
            openMenu(true);
        }
    } else {
        scrollMenu($(this).scrollTop() > header_point)
    }
});

menuObj.find('a').on('click', function () {
    if (window_size <= mobile_point) {
        openMenu(true);
    } else {
        openMenu(false);
    }
});

$('#pageTop').on('click', function () {
    scrollPosition(0);
});

$('.menu-toggler').on('click', function () {
    openMenu($(this).data('open'));
});

function scrollPosition(position) {
    $('body,html').animate({
        scrollTop: position
    }, animateTime);
}

function openMenu(is_open) {
    if (!is_open) {
        menuBtn.data('open', true);
        menuObj.fadeIn(animateTime);
        menuBtn.addClass('open');
    } else {
        menuBtn.data('open', false);
        menuObj.fadeOut(animateTime);
        menuBtn.removeClass('open');
    }
}

function scrollMenu(is_scroll) {
    if (is_scroll) {
        menuObj.addClass('scroll');
    } else {
        menuObj.removeClass('scroll');
    }
}

// pageTop
$(function () {
    let scroll = $('#pageTop');
    let scrollShow = $('.pageTop-show');
    $(scroll).hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 300) {
            $(scroll).fadeIn().addClass(scrollShow);
        } else {
            $(scroll).fadeOut().removeClass(scrollShow);
        }
    });
});

// CONTACT
function contact() {
    let contact = document.getElementById('contact');
    let contactButton = document.getElementById('contactButton');
    contact.style.display = 'block';
    contactButton.style.display = 'none';
}

// RandomImage
window.addEventListener("load", () => {
    const imageUrl = ['./img/astronaut.gif', './img/astronaut2.gif', './img/astronaut3.gif', './img/astronaut4.gif', './img/ufo.gif'];
    const numLeft = Math.floor(Math.random() * imageUrl.length);
    const numCenter = Math.floor(Math.random() * imageUrl.length);
    const numRight = Math.floor(Math.random() * imageUrl.length);
    const numBottomImage = Math.floor(Math.random() * imageUrl.length);
    const left = document.getElementById('left');
    const center = document.getElementById('center');
    const right = document.getElementById('right');
    const bottomImage = document.getElementById('bottomImage');
    left.src = imageUrl[numLeft];
    center.src = imageUrl[numCenter];
    right.src = imageUrl[numRight];
    bottomImage.src = imageUrl[numBottomImage];

    if (numLeft == 0 & numCenter == 0 & numRight == 0 ||
        numLeft == 1 & numCenter == 1 & numRight == 1 ||
        numLeft == 2 & numCenter == 2 & numRight == 2 ||
        numLeft == 3 & numCenter == 3 & numRight == 3 ||
        numLeft == 4 & numCenter == 4 & numRight == 4
    ) {
        sessionStorage.setItem('triples', 'lucky');
    }
});

// ページ読み込み時の処理
window.addEventListener("load", () => {
    // sessionStorage の値を読み込み
    let triples = sessionStorage.getItem("triples");

    if (triples) {
        setTimeout(() => {
            const dialog = document.querySelector("dialog");
            dialog.showModal();
            sessionStorage.removeItem("triples");
        }, 500);

    } else {
        return;
    }
});

// 背景とリストエリアの文字色を変更
const listFont = document.getElementById("list");
function dialogClose() {
    document.body.style.backgroundColor = "#001e43"; // midnight blue
    listFont.style.color = "white";
};

// dialog
const dialogElem = document.getElementById("dialog");
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
    dialogElem.close();
});

const jsTurn = [
    // 自転
    { transform: 'rotate(360deg) translate3D(0)' },
    { transform: 'rotate(0) translate3D(0)' }
    // 公転
    // { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)' },
    // { transform: 'rotate(0) translate3D(-50%, -50%, 0)' }
];

const jsTurnTiming = {
    duration: 3000,
    iterations: Infinity
}

//document.getElementById("turn").animate(jsTurn, jsTurnTiming);
// top.js:188 Invalid keyframe value for property transform: rotate(360deg) translate3D(0)
// (anonymous)	@	top.js:188
// top.js:188 Invalid keyframe value for property transform: rotate(0) translate3D(0)
// (anonymous)	@	top.js:188

// 公転 2
// var container = [
//     { transform: 'rotate(0.1turn)' }
// ];

// var containerTiming = {
//     duration: 3000,
//     iterations: Infinity
// }

// document.getElementById("container").animate(
//     container,
//     containerTiming
// )

document.querySelector(".wrapper").animate(
    {
        borderRadius: [
            "50%",
            "40% 60% 60% 40% / 60% 30% 70% 40%",
            "40% 60%"
        ]
    },
    {
        iterations: Infinity,
        direction: "alternate",
        duration: 5000
    }
);
document.querySelector(".wrapper2").animate(
    {
        borderRadius: [
            // "50%",
            // "50% 70% 50% 70% / 60% 70% 40% 70% ",
            // "80% 60% 70% 60% / 80% 60% 70% 60% "
            "50%",
            "40% 60% 60% 40% / 60% 30% 70% 40%",
            "40% 60%"
        ]
    },
    {
        iterations: Infinity,
        direction: "alternate",
        duration: 2000
    }
);

// 回転速度上昇
const speedUp = (wrapper, target) => {
    const anime = wrapper.animate(
        [{ transform: 'rotate(360deg)' }, { transform: 'rotate(0)' }],
        { duration: window.innerWidth * 24, iterations: Infinity }
    )
    let multiplier = 1
    return {
        faster: () => {
            multiplier += 10
            anime.updatePlaybackRate(multiplier)
        }
    }
}

const wrapper = document.querySelector('.wrapper')
const target = document.querySelector('.target')
if (wrapper && target) {
    const execution = speedUp(wrapper, target)
    document.body.addEventListener('click', () => execution.faster())
}

// カウンター
function animateCount(element) {
    const target = parseInt(element.getAttribute('data-count')); // 目標のカウント
    let current = 0; // 現在のカウント
    const duration = 1000; // アニメーションの継続時間（ミリ秒）
    const startTime = performance.now(); // 開始時間

    function update() {
        const now = performance.now();
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // 0から1までの進捗率

        current = Math.floor(progress * target); // 現在のカウントを計算
        element.textContent = current.toLocaleString(); // カンマ区切りに変換

        if (progress < 1) {
            requestAnimationFrame(update); // アニメーションを継続
        } else {
            element.textContent = target.toFixed(1); // 小数第一位で表示
            // element.textContent = target.toLocaleString(); // 最終的に目標の値をセット
        }
    }
    requestAnimationFrame(update);
}

// IntersectionObserverを使って、info-dataが画面内に入ったらカウントアニメーションを実行
document.addEventListener('DOMContentLoaded', () => {
    const countElements = document.querySelectorAll('span[data-count]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // スクロール領域に入った時にアニメーションを開始
                animateCount(entry.target); // 個々のspan要素に対してアニメーションを開始
                observer.unobserve(entry.target); // 一度実行したらその要素の監視を停止
            }
        });
    }, {
        threshold: 1.0 // 100%以上表示されたらアニメーションを開始
    });
    countElements.forEach(element => {
        observer.observe(element); // 各span要素を監視
    });
});