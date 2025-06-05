// ハンバーガーメニューが ham(X印)を持つかどうかにより、メニューを表示するか、見えなくするか。
function db() {
    if ($('#menubar_hdr').hasClass('ham')) {
        $('#menubar').addClass('db');
    } else {
        $('#menubar').removeClass('db');
    }
}

// ドロップダウンの親liタグ
$(function () {
    $('#menubar a[href=""]').click(function () {
        return false;
    });
});

// 汎用開閉処理
$(function () {
    $('.openClose').next().hide();
    $('.openClose').click(function () {
        $(this).next().slideToggle();
        $('.openClose').not(this).next().slideUp();
    });
});

// pageTop
$(function () {
    let scroll = $('.pageTop');
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

// スムーススクロール
$(window).on('load', function () {
    let hash = location.hash;
    if (hash) {
        $('body,html').scrollTop(0);
        setTimeout(function () {
            let target = $(hash);
            let scroll = target.offset().top - 50;
            $('body,html').animate({
                scrollTop: scroll
            }, 500);
        }, 100);
    }
});
$(window).on('load', function () {
    $('a[href^="#"]').click(function () {
        let href = $(this).attr('href');
        let target = href == '#' ? 0 : $(href).offset().top - 50;
        $('body,html').animate({
            scrollTop: target
        }, 500);
        return false;
    });
});

// h2の中に下線用のスタイルを作る
$(function () {
    $('main h2').wrapInner('<span class="uLine">');
});

// 同一ページへのリンクの場合に開閉メニューを閉じる処理
$(function () {
    $('#menubar a[href^="#"]').click(function () {
        $('#menubar').addClass('close');
        $('#menubar').removeClass('db');
        $('#menubar_hdr').removeClass('ham');
    });
});

// タイマー
$(function () {
    let timer = false;
    $(window).resize(function () {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () { }, 500);
    });
});

// メニュー切り替え処理
$(window).on("load resize", function () {
    setTimeout(function () {

        let winW = window.innerWidth;
        let winBP = 900;
        //ブレイクポイント

        //小さな端末用
        if (winW < winBP) {
            $('#menubar').removeClass('pc');
            $('#menubar').addClass('sh');
            db();

            //大きな端末用
        } else {
            $('#menubar').removeClass('sh db');
            $('#menubar').addClass('pc');
        }

    }, 100);
});

// ハンバーガーメニューをクリックした際の処理
$(function () {
    $('#menubar_hdr').click(function () {
        $('#menubar_hdr').toggleClass('ham');
        db();
    });
});

// ドロップダウンメニューの処理
$(function () {

    $('#menubar li:has(ul)').addClass('ddMenu_parent');
    $('.ddMenu_parent > a').addClass('ddMenu');

    //タッチデバイス用
    $('.ddMenu').on('touchstart', function () {
        $(this).next('ul').stop().slideToggle();
        $('.ddMenu').not(this).next('ul').slideUp();
        return false;
    });

    //PC用
    $('.ddMenu_parent').hover(function () {
        $(this).children('ul').stop().slideToggle();
    });

});

window.addEventListener("load", () => {
    // sessionStorage に保存したデータを取得
    let data = sessionStorage.getItem('storage');
    const defaultImage = document.getElementById("defaultImage");
    const specialImage = document.getElementById("specialImage");


    if (!data) {
        specialImage.style.display = 'none';
    } else {
        specialImage.style.display = 'block';
        defaultImage.style.display = 'none';
    }
});