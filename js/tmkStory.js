window.addEventListener('load', function () {

    const fear = new Audio('./sound/fear.mp3');
    const fear2 = new Audio('./sound/fear2.mp3');
    const scream = new Audio('./sound/scream.mp3');
    const toilet = new Audio('./sound/toilet.mp3');
    const bgm = new Audio('./sound/secret_of_mana.mp3');
    const bgm2 = new Audio('./sound/g_notes.mp3');
    const bgm3 = new Audio('./sound/c_trigger.mp3');
    const interval = 30;
    let next_flg = true;
    let stop_flg = false;
    let end_flg = false;
    let scene_cnt = 0;
    let line_cnt = 0;
    let selectNum1 = 0;
    let selectNum2 = 0;
    let selectNum3 = 0;
    let select1 = document.getElementById('select1');
    let select2 = document.getElementById('select2');
    let select3 = document.getElementById('select3');
    let selectText1 = document.getElementById('selectText1');
    let selectText2 = document.getElementById('selectText2');
    let selectText3 = document.getElementById('selectText3');
    let messageArea = document.getElementById('textArea');
    let messageBox = document.getElementById('textBox');
    let messageText = document.getElementById('text');
    let text = [];
    // ロード処理通知用
    let load = document.getElementById("load");
    load.id = "load";
    load.style.cssText = ' font-family: "New Tegomin", serif; font-weight: 900; font-size: x-large; color: black; width: 100%; padding: 20px 0; background-color: white; text-align: center; position: fixed; top: 0px; left: 0px;  display: none;';
    load.textContent = 'ロード 完了';
    // セーブ処理通知用
    let save = document.getElementById("save");
    save.id = "save";
    save.style.cssText = ' font-family: "New Tegomin", serif; font-weight: 900; font-size: x-large; color: black; width: 100%; padding: 20px 0; background-color: white; text-align: center; position: fixed; top: 0px; left: 0px;  display: none;';
    save.textContent = 'セーブ 完了';
    // セーブ機能(値の準備＆確認)
    let saveNumber = 1;
    let firstNumber = 1;
    let savePoint = localStorage.getItem('savePoint');
    if (!savePoint) {
        localStorage.setItem('savePoint', '1');
    }

    function main() {
        let tmp = split_chars.shift();
        if (tmp == '<') {
            let target_str = '';
            tmp = split_chars.shift();
            while (tmp != '>') {
                target_str += tmp;
                tmp = split_chars.shift();
            }
            target_str = target_str.split(/\s/);
            switch (target_str[0]) {
                case 'stop':
                    stop_flg = true;
                    break;
                case 'pause':
                    messageArea.style.pointerEvents = 'none';
                    setTimeout(() => {
                        messageArea.style.pointerEvents = 'auto';
                    }, 4000);
                    break;
                case 'selectBox':
                    $('.selectBox').addClass('show');
                    break;
                case 'text1':
                    selectText1.innerHTML = target_str[1];
                    break;
                case 'text2':
                    selectText2.innerHTML = target_str[1];
                    break;
                case 'text3':
                    selectText3.innerHTML = target_str[1];
                    break;
                case 'select1':
                    if (target_str[1] === "none") {
                        $('#select1').addClass('none');
                    } else {
                        selectNum1 = target_str[1];
                        select1.addEventListener('click', function () {
                            scene_cnt = selectNum1;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                        });
                    }
                    break;
                case 'select2':
                    if (target_str[1] === "none") {
                        $('#select2').addClass('none');
                    } else {
                        selectNum2 = target_str[1];
                        select2.addEventListener('click', function () {
                            scene_cnt = selectNum2;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                        });
                    }
                    break;
                case 'select3':
                    if (target_str[1] === "none") {
                        $('#select3').addClass('none');
                    } else {
                        selectNum3 = target_str[1];
                        select3.addEventListener('click', function () {
                            scene_cnt = selectNum3;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                        });
                    }
                    break;

                // セーブ機能(コンティニュー処理)
                case 'continue1':
                    if (target_str[1] === "none") {
                        $('#select1').addClass('none');
                    } else {
                        saveNumber = localStorage.getItem("savePoint");
                        select1.addEventListener('click', function () {
                            scene_cnt = saveNumber;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                            //--------------------------------
                            // BGM フェードアウト
                            //--------------------------------
                            // 0.4秒毎に下記関数を繰り返す
                            const timerId = setInterval(funcInterval, 400);
                            bgm.volume = 1; // 音量の最大が 1.0
                            function funcInterval() {
                                // ボリュームが 0 になったら終了
                                if ((bgm.volume - 0.04) <= 0) {
                                    bgm.volume = 0;
                                    bgm.pause();
                                    clearInterval(timerId); // タイマー解除
                                }
                                // 0.04ずつボリュームを減らしていく
                                else {
                                    bgm.volume -= 0.04;
                                }
                            }
                        });
                    }
                    break;
                // セーブ機能(ニューゲーム処理)
                case 'continue2':
                    if (target_str[1] === "none") {
                        $('#select2').addClass('none');
                    } else {
                        localStorage.removeItem("savePoint");
                        select2.addEventListener('click', function () {
                            savePoint = firstNumber; // 各ロード地点で正しく分岐させるための初期化処理
                            scene_cnt = firstNumber;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                            //--------------------------------
                            // BGM フェードイン(練習用)
                            //--------------------------------
                            // 0.5秒毎に下記関数を繰り返す
                            const timerId = setInterval(funcInterval, 500);
                            bgm.volume = 0.25; // 音量の最小が 0.0(急に音が切れると不自然なため25％スタート)
                            function funcInterval() {
                                // ボリュームが 1 になったら終了
                                if ((bgm.volume + 0.05) >= 1) {
                                    bgm.volume = 1;
                                    bgm.pause();
                                    clearInterval(timerId);  //タイマー解除
                                }
                                // 0.05ずつボリュームを足していく
                                else {
                                    bgm.volume += 0.05;
                                }
                            }
                        });
                    }
                    break;

                case 'newLine':
                    messageText.innerHTML += '<br>';
                    break;
                case 'skip':
                    scene_cnt = target_str[1];
                    line_cnt = -1;
                    break;
                case 'save2':
                    if (savePoint == 2) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '2');
                    break;
                case 'save3':
                    if (savePoint == 3) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '3');
                    break;
                case 'save6':
                    if (savePoint == 6) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '6');
                    break;
                case 'save7':
                    if (savePoint == 7) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '7');
                    break;
                case 'save8':
                    if (savePoint == 8) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '8');
                    break;
                case 'save10':
                    if (savePoint == 10) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '10');
                    break;
                case 'save11':
                    if (savePoint == 11) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '11');
                    break;
                case 'save15':
                    if (savePoint == 15) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '15');
                    break;
                case 'save19':
                    if (savePoint == 19) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '19');
                    break;
                case 'save20':
                    if (savePoint == 20) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '20');
                    break;
                case 'save21':
                    if (savePoint == 21) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '21');
                    break;
                case 'save22':
                    if (savePoint == 22) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '22');
                    break;
                case 'save23':
                    if (savePoint == 23) {
                        load.style.display = 'block';
                        setTimeout(() => {
                            load.style.display = 'none';
                        }, 3000);
                    } else {
                        save.style.display = 'block';
                        setTimeout(() => {
                            save.style.display = 'none';
                        }, 3000);
                    }
                    localStorage.setItem('savePoint', '23');
                    break;
                // case 'savePoint':
                //     // セーブポイントを通知してから2秒後に非表示
                //     save.style.display = 'block';
                //     setTimeout(() => {
                //         save.style.display = 'none';
                //     }, 2000);
                //     break;
                case 'fear':
                    fear.play();
                    break;
                case 'fear2':
                    fear2.play();
                    break;
                case 'scream':
                    scream.play();
                    break;
                case 'toilet':
                    toilet.play();
                    break;
                case 'bgm':
                    bgm.play();
                    break;
                case 'bgm2':
                    bgm2.play();
                    break;
                case 'bgm3':
                    bgm3.play();
                    break;
                case 'title':
                    // 0.1秒後に自動でindex.htmlに移動する
                    setTimeout(() => {
                        location.href = "index.html";
                    }, 100);
                    break;
                case 'tmkRoom':
                    setTimeout(() => {
                        location.href = "tmkRoom.html";
                    }, 100);
                    break;
                case 'popUp':
                    // 0.5秒後にボタンを自動クリック
                    setTimeout(function () {
                        document.getElementById('popUp').click();
                    }, 500);
                    break;
                case 'popUp2':
                    setTimeout(function () {
                        document.getElementById('popUp2').click();
                    }, 500);
                    break;
                case 'popUp3':
                    setTimeout(function () {
                        document.getElementById('popUp3').click();
                    }, 500);
                    break;
                case 'popUp4':
                    setTimeout(function () {
                        document.getElementById('popUp4').click();
                    }, 3500);
                    break;
                case 'fadeOut_textArea':
                    // #textArea 一時透明化
                    function fadeOut_textArea_remove() {
                        $('#textArea').removeClass('fadeOut');
                    }
                    $('#textArea').addClass('fadeOut');
                    setTimeout(fadeOut_textArea_remove, 4000);
                    break;
                case 'bg':
                    document.getElementById('bgImg').src = 'img/bg' + target_str[1] + '.jpg';
                    break;
                case 'character':
                    document.getElementById('character' + target_str[1]).src = 'img/character' + target_str[2] + '.png';
                    break;
                case 'item':
                    document.getElementById('item').src = 'img/item' + target_str[1] + '.png';
                    break;
                case 'fadeIn_character':
                    function fadeIn_character_remove() {
                        $('#characterPosition' + target_str[1]).removeClass('fadeIn');
                    }
                    $('#characterPosition' + target_str[1]).addClass('fadeIn');
                    document.getElementById('character' + target_str[1]).src = 'img/character' + target_str[2] + '.png';
                    setTimeout(fadeIn_character_remove, 500);
                    break;
                case 'fadeIn_bg':
                    function fadeIn_bg_remove() {
                        $('#bgImg').removeClass('fadeIn');
                    }
                    $('#bgImg').addClass('fadeIn');
                    setTimeout(fadeIn_bg_remove, 500);
                    break;
                case 'sway_bg':
                    function sway_bg_remove() {
                        $('#bgImg').removeClass('sway');
                    }
                    $('#bgImg').addClass('sway');
                    setTimeout(sway_bg_remove, 500);
                    break;
                case 'fadeIn_item':
                    function fadeIn_item_remove() {
                        $('.itemBox').removeClass('fadeIn');
                    }
                    $('.itemBox').addClass('fadeIn');
                    setTimeout(fadeIn_item_remove, 500);
                    break;
                case 'fadeOut_character':
                    function fadeOut_character_remove() {
                        $('#characterPosition' + target_str[1]).removeClass('fadeOut');
                        document.getElementById('character' + target_str[1]).src = 'img/character' + target_str[2] + '.png';
                    }
                    $('#characterPosition' + target_str[1]).addClass('fadeOut');
                    setTimeout(fadeOut_character_remove, 500);
                    break;
                case 'fadeOut_bg':
                    function fadeOut_bg_remove() {
                        $('#bgImg').removeClass('fadeOut');
                        document.getElementById('bgImg').src = 'img/bg' + target_str[1] + '.jpg';
                    }
                    $('#bgImg').addClass('fadeOut');
                    setTimeout(fadeOut_bg_remove, 500);
                    break;
                case 'fadeOut_item':
                    function fadeOut_item_remove() {
                        $('.itemBox').removeClass('fadeOut');
                        document.getElementById('item').src = 'img/item0.png';
                    }
                    $('.itemBox').addClass('fadeOut');
                    setTimeout(fadeOut_item_remove, 500);
                    break;
                case 'fadeOutIn_bg':
                    function fadeOutIn_bg_change() {
                        document.getElementById('bgImg').src = 'img/bg' + target_str[1] + '.jpg';
                    }
                    function fadeOutIn_bg_remove() {
                        $('#bgImg').removeClass('fadeOutIn');
                        $('#textBox').removeClass('none');
                        $('#textBox').trigger('click');
                    }
                    $('#bgImg').addClass('fadeOutIn');
                    $('#textBox').addClass('none');
                    setTimeout(fadeOutIn_bg_change, 1500);
                    setTimeout(fadeOutIn_bg_remove, 3000);
                    break;
                case 'complete':
                    setTimeout(() => {
                        // https://www.kirilv.com/canvas-confetti/
                        var duration = 10 * 1000;
                        var animationEnd = Date.now() + duration;
                        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1 };
                        function randomInRange(min, max) {
                            return Math.random() * (max - min) + min;
                        }
                        var interval = setInterval(function () {
                            var timeLeft = animationEnd - Date.now();
                            if (timeLeft <= 0) {
                                return clearInterval(interval);
                            }
                            var particleCount = 50 * (timeLeft / duration);
                            // since particles fall down, start a bit higher than random
                            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                        }, 250);


                        var end = Date.now() + (10 * 1000);
                        // go Buckeyes!
                        var colors = ['#bb0000', '#ffffff'];
                        (function frame() {
                            confetti({
                                particleCount: 2,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: colors
                            });
                            confetti({
                                particleCount: 2,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: colors
                            });
                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        }());


                        // 繰り返し回数指定
                        var timer = null;
                        var cnt = 0;
                        function event() {
                            cnt++;
                            if (cnt >= 5 && timer != null) {
                                // 5回以上表示したら、タイマーを停止する
                                clearInterval(timer);
                            }

                            var pumpkin = confetti.shapeFromPath({
                                path: 'M449.4 142c-5 0-10 .3-15 1a183 183 0 0 0-66.9-19.1V87.5a17.5 17.5 0 1 0-35 0v36.4a183 183 0 0 0-67 19c-4.9-.6-9.9-1-14.8-1C170.3 142 105 219.6 105 315s65.3 173 145.7 173c5 0 10-.3 14.8-1a184.7 184.7 0 0 0 169 0c4.9.7 9.9 1 14.9 1 80.3 0 145.6-77.6 145.6-173s-65.3-173-145.7-173zm-220 138 27.4-40.4a11.6 11.6 0 0 1 16.4-2.7l54.7 40.3a11.3 11.3 0 0 1-7 20.3H239a11.3 11.3 0 0 1-9.6-17.5zM444 383.8l-43.7 17.5a17.7 17.7 0 0 1-13 0l-37.3-15-37.2 15a17.8 17.8 0 0 1-13 0L256 383.8a17.5 17.5 0 0 1 13-32.6l37.3 15 37.2-15c4.2-1.6 8.8-1.6 13 0l37.3 15 37.2-15a17.5 17.5 0 0 1 13 32.6zm17-86.3h-82a11.3 11.3 0 0 1-6.9-20.4l54.7-40.3a11.6 11.6 0 0 1 16.4 2.8l27.4 40.4a11.3 11.3 0 0 1-9.6 17.5z',
                                matrix: [0.020491803278688523, 0, 0, 0.020491803278688523, -7.172131147540983, -5.9016393442622945]
                            });
                            // tree shape from https://thenounproject.com/icon/pine-tree-1471679/
                            var tree = confetti.shapeFromPath({
                                path: 'M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z',
                                matrix: [0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669, -5.071942446043165]
                            });
                            // heart shape from https://thenounproject.com/icon/heart-1545381/
                            var heart = confetti.shapeFromPath({
                                path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
                                matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
                            });
                            var defaults = {
                                scalar: 2,
                                spread: 180,
                                particleCount: 30,
                                origin: { y: -0.1 },
                                startVelocity: -35
                            };
                            confetti({
                                ...defaults,
                                shapes: [pumpkin],
                                colors: ['#ff9a00', '#ff7400', '#ff4d00']
                            });
                            confetti({
                                ...defaults,
                                shapes: [tree],
                                colors: ['#8d960f', '#be0f10', '#445404']
                            });
                            confetti({
                                ...defaults,
                                shapes: [heart],
                                colors: ['#f93963', '#a10864', '#ee0b93']
                            });

                        }
                        // タイマー開始
                        timer = setInterval(event, 2000);
                    }, 1000);
                    break;

            }
        }
        if (!stop_flg) {
            if (tmp) {
                if (tmp != '>') messageText.innerHTML += tmp;
                setTimeout(main, interval);
            }
        } else {
            messageText.innerHTML += '<span class="blink-text"></span>';
        }
    }
    messageBox.addEventListener('click', function () {
        if (end_flg) return;
        if (next_flg) {
            if (!stop_flg) {
                line_cnt++;
                if (line_cnt >= text[scene_cnt].length) {
                    line_cnt = 0;
                }
            } else if (scene_cnt >= text.length) {
                end_flg = true;
                return;
            }
            split_chars = text[scene_cnt][line_cnt].split('');
            messageText.innerHTML = '';
            main();
        }
    });
    function textClick() {
        $('#textBox').trigger('click');
    }
    function selectNoneRemove() {
        $('#select1').removeClass('none');
        $('#select2').removeClass('none');
        $('#select3').removeClass('none');
    }

    $('.modal').on('click', function () {
        //.modalについたhrefと同じidを持つ要素を探す
        let modalId = $(this).attr('href');
        let modalThis = $('body').find(modalId);
        //bodyの最下にwrapを作る 
        $('body').append('<div id="modalWrap" />');
        let wrap = $('#modalWrap'); wrap.fadeIn('200');
        modalThis.fadeIn('200');
        //モーダルの高さを取ってくる 
        function mdlHeight() {
            let wh = $(window).innerHeight();
            let attH = modalThis.find('.modalInner').innerHeight();
            modalThis.css({ height: attH });
        }
        mdlHeight();
        $(window).on('resize', function () {
            mdlHeight();
        });
        function clickAction() {
            modalThis.fadeOut('200');
            wrap.fadeOut('200', function () {
                wrap.remove();
            });
        }
        //wrapクリックされたら 
        wrap.on('click', function () {
            clickAction(); return false;
        });
        //2秒後に消える 
        setTimeout(clickAction, 2000); return false;
    });

    text[0] = [
        "",
        "<bgm>",
        "<fadeIn_bg><bg 1><continue1><continue2><select3 none><text1 つづきから><text2 はじめから><selectBox>玉子物語へようこそ。<newLine>Welcome to TMK Story."
    ];

    text[1] = [
        "これは、あなたの力を試す物語。",
        "これから一人の新人スタッフが、あなたのもとに訪れます。",
        "あなたは上司として、的確な指示や助言などを与え、一人前に育て上げるのです。",
        "<fadeIn_bg><bg 1>今日は新人研修の日だ。",
        "株式会社【ユー・エヌ・ケイ】に入社してから三か月。早くも研修を任されることになった。",
        "私はパソコン教室のインストラクターをしている。",
        "教室に通う受講生にパソコンを教えることが主な業務ではあるが、実はそれ以上に、新規顧客開拓のための営業活動がある。",
        "私は入社早々から結果を出した。",
        "現在も毎日のように新規顧客を獲得し続けている。",
        "それを知った社長が「前代未聞だ！」「素晴らしい！」「共有すべし！」",
        "と、私の集客手法を社内で広める手始めとして、部下を配属された次第である。",
        "正直、面倒くさい・・・。",
        "ため息をつきながら開店前の準備を進めていると、コツコツと甲高いヒール音を響かせて、スーツ姿の女性が現れた。",
        "<fadeIn_character 1 1>「お初にお目にかかります」",
        "「あたくし、こういう者でございます」",
        "「どうぞよろしくあそばせ」",
        "どうやらこの人が配属された部下のようだ。",
        "<fadeOut_character 1 0><select1 2><select2 5><select3 none><text1 「挨拶をする」><text2 「帰宅させる」><selectBox>どうしますか？"
    ];

    text[2] = [
        "<save2>「はじめまして。本日から研修を担当させていただきます。よろしくお願いいたします」",
        "私も名乗り、名刺を手渡す。",
        "何か引っかかるものはあったが、とりあえず同じように返しておいた。",
        "名前は、落合玉子（おちあいたまこ）というらしい。",
        "<fadeOutIn_bg 1>",
        "「あなた、できるんですってね？」",
        "<fadeIn_character 1 2>研修の段取りや今日一日の流れを説明していると、彼女は唐突に切り出してきた。",
        "「社長が仰ってましたわ」",
        "「まあ見ての通り、あたくしも集客には自信がございますの」",
        "「つまりあなたから教わることなんて、何一つありませんってこと」",
        "<fadeIn_character 1 3>「むしろ逆に、あたくしが教えてあげますわね。オーッホッホッホッホ」",
        "漫画でしか見たことのないような笑い方に面食らったが、それ以前に、この人はかなり問題のある人物だということが判明した。",
        "<fadeOut_character 1 0><select1 3><select2 5><select3 none><text1 我慢をする><text2 帰れと言う><selectBox>どうしますか？"
    ];

    text[3] = [
        "<save3>まだ顔を合わせたばかりだ。もしかしたら緊張しているのかもしれない。今のは見なかったことにしよう。",
        "気持ちを切り替えた私は、改めて仕事の説明に戻る。",
        "とはいえ彼女は終始退屈そうに聞いていたため、とりあえず仕事を与えることにした。",
        "「落合さん、本日無料体験のご予約があります」",
        "彼女は集客に自信があると言っていた。",
        "そもそも会社からの指示は【集客手法を学んでこい】ということを知っている。",
        "したがって体験レッスンの案内を任せたい旨を伝えると、彼女は鼻息荒く頷いたあと、力強く親指を立てた。",
        "<fadeIn_character 1 4>「もちろんよ、任せなさい」",
        "まあ本音を言ってしまえば、彼女のこの傲慢さが、既存の受講生に向けられるよりはまだマシ、というだけである。",
        "<fadeOut_character 1 0>さて、それではどうやって教えようか・・・。",
        "<fadeIn_item><item 1>【入会案内必勝マニュアル】<newLine>会社が作成した集客マニュアル。私はほとんど見たことがない。",
        "<select1 4><select2 6><select3 none><text1 マニュアルを見てもらう><text2 私の手法を教える><selectBox>どうしますか？"
    ];

    text[4] = [
        "<fadeIn_character 1 5>「そんなもの、必要ございませんわ！」",
        "<fadeIn_item><item 2>彼女は怒り猛ると、マニュアルに渾身の前蹴りを突き刺した。",
        "<fadeIn_character 1 6>「あたくしを舐めているのかしら？」",
        "「いいからさっさと吐きなさい」",
        "「あなたの集客手法とやらをね」",
        "不思議と直感する。",
        "もしここで断れば、さらなる劣悪な展開が待っていると。",
        "面倒くさいことはごめんだ。",
        "私は何も言わずに頷いた。",
        "<skip 6><fadeOut_item><fadeOut_character 1 0>"
    ];

    text[5] = [
        "<bgm2><fadeOutIn_bg 5>",
        "<fadeIn_character 1 7>",
        "「頭、大丈夫？」",
        "「これはあたくしを成長させる物語ですわよ」",
        "【ＢＡＤ　ＥＮＤ】",
        "<title>",
        "<stop>"
    ];

    text[6] = [
        "<save6><fadeOut_item><fadeIn_character 1 8>「あら、話が早いじゃない。賢明な判断よ。あなた、見た目よりは賢いようね」",
        "「うーん、そうね。採点してあげてもよくってよ？　あなたのマニュアル」",
        "何点かなー？　ウフフ、と高飛車にほくそ笑む彼女を見ていると、無性に腹が立ってきた。",
        "やっぱり教えるのをやめようかと二の足を踏みそうになったが、なんとか堪える。",
        "<fadeOut_character 1 0>そろそろ受講生が来校する時間にもなるため、なるべく要約して口早に伝えた。",
        "ほんの数分ではあったが、意外にも彼女は黙って聞いていた。",
        "なぜかそれが異様に気持ち悪く感じて、気が付くと鳥肌が立っていた。",
        "ブルル、と体の底から寒気のようなものを感じたため、トイレに行きたくなった。",
        "「すみません、ちょっとお手洗いに行ってきます」",
        "<fadeIn_character 1 2>「ええ、構わないわ。どうぞ行ってきなさい」",
        "<fadeOut_character 1 0>どっちが上司なんだよ、と心の中で悪態をつきながら、私はトイレに向かった。",
        "<fadeOutIn_bg 3>",
        "用を足し終え、手を洗っていると、ふいに背後の個室から声が聞こえてきた。",
        "「おおおおおお・・・」",
        "気張っているのだろうか。かなり呻（うめ）いている。",
        "<select1 7><select2 17><select3 none><text1 無視して教室に戻る><text2 戸をノックしてみる><selectBox>どうしますか？"
    ];

    text[7] = [
        "<save7><fadeIn_bg><bg 1>教室に戻ると、話し声がしていた。",
        "新人の落合さんと、もう一人は男性の声。どうやら受講生が来校されたようだ。",
        "<fadeIn_character 2 21>「やあやあ先生、おはようさんさん」",
        "<fadeIn_character 3 9>「ようこそ、お待ちしておりました」",
        "「見ない顔じゃな。今日は新しい先生の日かえ？」",
        "「さようでございます。落合玉子と申します」",
        "「玉子、と呼んでくださいまし」",
        "「はっは！　玉子先生や、お手柔らかにのう」",
        "「どうぞよろしくお願いいたします」",
        "<fadeOut_character 2 0><fadeOut_character 3 0>驚いた。相当癖はあるが、まさかあの落合さんが普通に接客しているとは。",
        "・・・まあ、そらそうだよね。一応、社会人なんだし。",
        "いささかの納得とささやかな安堵を胸に、私も合流する。",
        "「神戸（かんべ）さーん、おはようございますー！」",
        "<fadeIn_character 1 22>「ぎゃ！　誰じゃ？」",
        "<fadeOut_character 1 0><select1 8><select2 9><select3 none><text1 呆けと認識して接客><text2 本気と認識して接客><selectBox>どうしますか？"
    ];

    text[8] = [
        "<save8>「ハイハイ、もう忘れちゃいましたかー？」",
        "「神戸さん、またボケちゃいましたかー？」",
        "<fadeIn_character 1 23>「ワッハッハ！」",
        "「わしゃあ、まだまだボケんわい！」",
        "「先生、今日もよろしく頼むのう」",
        "<fadeOut_character 1 0>これがいつもの神戸さんである。こういった会話がお好きな方なのだ。",
        "——————その時、",
        "ふいに鋭い視線を感じて目をやると、",
        "落合さんがもの凄い形相で、私のことを睨みつけていた。",
        "<fadeIn_character 1 10><fadeOutIn_bg 6>",
        "「・・・・・・」",
        "<skip 10><fadeOut_character 1 0>"
    ];

    text[9] = [
        "「酷いです。もしかして私のこと、忘れちゃったんですか？」",
        "「だったらもうその新しい先生と仲良くしてればいいです」",
        "「とっても楽しそうに会話されてましたもんね」",
        "<fadeIn_character 1 24>「ど、どうしたんじゃ？」",
        "「いつもと様子がまるで違うではないか」",
        "「先生よ、一体どうしたのじゃ・・・」",
        "<fadeOut_character 1 0>神戸さんの反応を見て、ハッと我に返る。",
        "そして、やらかしてしまったと後悔する。",
        "神戸さんはこのようなご冗談がお好きな方で、こんな会話は日常茶飯事のことだった。",
        "異様な態度の新人登場といい、先程のトイレの出来事といい、今日は私の中の何かが立て続けに乱され、狂わされている気がする。",
        "——————その時、",
        "不意に奇妙な視線を感じて目をやると、",
        "落合さんが嬉々とした表情で、あからさまなガッツポーズをとっていた。",
        "<fadeIn_character 1 11><fadeOutIn_bg 6>",
        "オホホホホホ！　まあまあまあ、なんてみっともない姿だこと！",
        "<skip 5><fadeOut_character 1 0>まるでそんな風に見下され、侮辱されているように聞こえた気がした。"
    ];

    text[10] = [
        "<save10><fadeOutIn_bg 1>",
        "「こんにちはー！」",
        "<fadeIn_character 2 31>声がして振り返ると、小学生くらいの男の子と、その母親と思われる人物が入口に立っていた。",
        "「パソコンの体験に来ましたー！」",
        "本日ご予約されている無料体験のお客様が来店されたようだ。",
        "私は仕事モードに切り替える。",
        "お二人に入室を促し、手はず通り落合さんにバトンタッチをする。",
        "さてさて、落合さんのお手並み拝見といきますか。",
        "<fadeIn_character 3 12>「はーいボクちゃん、いらっしゃーい！」",
        "「美人なお姉さんと楽しくパソコンしましょうねー！」",
        "一気に3オクターブくらい高くなった声色で、さも子犬をあやすかのように案内を始めた。",
        "<fadeOut_character 2 0><fadeOut_character 3 0><select1 11><select2 5><select3 5><text1 何も言わない><text2 サポートする><text3 交代する><selectBox>どうしますか？"
    ];

    text[11] = [
        "<save11><fadeIn_character 2 32>母と子は見るからに分かりやすい反応をしていた。本当にこの人で大丈夫か？　といったところだろう。",
        "しかし今さら横やりなどはしない。余程のことでも起きない限り、口出しするつもりもない。",
        "なぜなら全て【経験】だからだ。私もそうやって成長してきた。",
        "私は他の受講生の対応をしながら、遠くから見守ることにした。",
        "<fadeIn_character 2 41>「ねえねえ先生」<newLine>「先生って本当にパソコンに詳しいの？」",
        "体験席に移動する道中、男の子が尋ねる。かなり疑っている様子だ。",
        "<fadeIn_character 3 13>「も、もちろんよ！」<newLine>「知らないことなんてねー、一つもないわよー！　ウフフ」",
        "「だからねー、この美人なお姉さんにねー、なーんでも聞いてちょうだい！」",
        "<fadeOut_character 3 0>男の子の面持ちから不安を汲み取ったのか、矢継ぎ早に答える。<newLine>きっと、彼女なりに対処しているのだろう。",
        "<fadeIn_character 2 42>「わあ、やったあ！」<newLine>「先生、詳しいんだー！」",
        "みるみる表情が明るくなっていく。<newLine>目をキラキラさせて、あっという間に元気一杯になった。",
        "<fadeOut_character 2 0>これが子供の特徴でもある。<newLine>感情の機微に敏感であることが肝要なのだ。",
        "落合さん、もしかすると、なかなかのやり手なのかもしれない。",
        "機嫌を良くした男の子は、堰（せき）を切った川のように、途端に流暢（りゅうちょう）に語り始めた。",
        "<fadeIn_character 1 42>「あのね、ボクね、今AI（人工知能）を作ってるの」",
        "「最近 ChatGPT とか BingAI とか Gemini とかよく聞くでしょ？」<newLine>「でもあれら生成AIには致命的な欠陥があるとも考えていて」",
        "「ディープラーニングによるブラックボックス問題であったり破局的忘却という欠点については先生もよくご存知の通りだと思うのだけれど」<newLine>「しかし、それ以前にボクは思うんだ」",
        "<fadeIn_character 1 43>「そもそもニューラルネットワークの在り方自体を、定義し直すフェーズに差しかかっているのではないか、とね」",
        "「つまり、既存のAIの概念を、ゼロから再構築しなくてはならない」",
        "「人工知能における真のパラダイムシフトを、発現させる時が来ている」",
        "「具体的にはニューロンとシナプスの関係性に着目していてね」<newLine>「要するに、人間でいう髄鞘（ずいしょう）だ。この部分にメスを入れる」",
        "「もっとも、これまでの研究や論文でも提唱されてきたように、理論的には正しいが、現代の技術水準では到底不可能、なんて否定的なご意見が山ほどあることも知っている」",
        "「だけどね、ボクにはね、世界をひっくり返すような・・・」",
        "「革新的なアイデアがある！」",
        "<fadeIn_character 1 44>「フフフ！」",
        "「もう、先生なら分かるよね？」<newLine>「それを確かめるために、ボクはここへ来たってわけ」",
        "<fadeOut_character 1 0>凄まじいキッズが体験に来たという感心と、一方でこれほどのレベルだと、当社では到底対応できそうもないということが分かった。",
        "落合さんの方を見ると・・・",
        "<fadeIn_character 1 14>見るからに分かりやすい顔をしていた。",
        "<fadeOut_character 1 0><select1 12><select2 13><select3 14><text1 助ける><text2 助けない><text3 鼻で笑う><selectBox>どうしますか？"
    ];

    text[12] = [
        "「お話し中にごめんなさい。ちょっと、よろしいでしょうか？」",
        "私はお母様に対して正直にお話しすることにした。",
        "ここまで造詣（ぞうけい）の深いお客様は初めてだということ。",
        "そしてそれに見合う水準のサービスが当教室では提供できないこと。",
        "せっかくご足労いただいたのに期待に沿えず申し訳ないということ。",
        "それらを一つ一つ真摯にお伝えした。",
        "こちらこそごめんなさいね、とお母様はすんなりと理解してくださった。",
        "大方予想はしていたのだろう。子供の望むようにしてあげていたようだ。",
        "男の子の方を見ると少し残念そうにも見えたが、既に切り替えている様子だった。",
        "「将来のAI、楽しみにしているね！」",
        "私は声をかけながら、二人をお見送りするために玄関へと案内する。",
        "<fadeIn_character 1 42>「うん、任せて！」",
        "入会にはならなかったが、いずれ大物になるかもしれないスーパーキッズを見たことで、自然と私自身の気持ちも明るくなっていた。",
        "より一層、これまで以上に仕事に取り組もう。",
        "<fadeOut_character 1 0>私も負けていられないな、と思った。",
        "<skip 15>"
    ];

    text[13] = [
        "私がサポートに入ったところで、彼女の経験にはならない。",
        "最後まで一人でやりきってこそ、成長の糧になることを私は知っている。",
        "そしてこれはある意味、正念場でもある。",
        "こういったピンチの時にこそ、真価が問われるのだ。",
        "はっきり言って彼女の傲慢さは社会不適合レベルだが、一方でエネルギーには満ち溢れている。",
        "その有り余るエネルギーが強みでもあり、もしその矛先が良い方向にさえ向けば、きっと・・・彼女は化ける。",
        "私は他の業務をこなしつつ、固唾をのんで見守ることにした。",
        "彼女はチラッとこちらを見たような気がしたが、私はあえて気づかないフリをした。",
        "さて、一体彼女はどんな対応を見せてくれるのだろうか。",
        "<skip 15>"
    ];

    text[14] = [
        "「フフッ」",
        "笑うまいと心では気構えていたが、思わず吹き出してしまった。",
        "今朝からの傲慢な態度や高飛車な発言等々、最初からいけ好かなかった。",
        "だが仮にも上司という立場である以上、相応に弁（わきま）えないといけない。",
        "しかしここに来て、うっかり漏れてしまった。",
        "とはいえ極力自重した。相当な地獄耳でもない限り、気付かれないほどに抑えたつもりだ。",
        "さすがに聞こえているわけがない。",
        "私はそう自分に言い聞かせ、彼女のことは無視をして、何事もなかったかのように自分の仕事に戻る。",
        "<skip 15>"
    ];

    text[15] = [
        "<save15><fadeIn_character 1 15>「・・・ちょっと、待ちなさい」",
        "「どういうつもりかしら」",
        "「あたくしのこと、舐めているわよね？」",
        "ただならぬ気配で言葉を連ねる落合さんの視線は、一直線に私を見据えていた。",
        "眉と目は見るからにつり上がっており、両こぶしを握り締めながらワナワナと震えている。",
        "「絶対に許さない」",
        "「あたくしに恥をかかせたこと・・・」",
        "<sway_bg><bg 1><fadeIn_character 1 16>「絶対に許さないからー！」",
        "激昂した怒号が響く。教室内は一斉に静まり返る。",
        "<fadeOut_character 1 0>どうやら私の態度が気に食わなかったようだ。",
        "彼女のプライドの高さを考えれば致し方なかったのかもしれない。",
        "だがしかし、いくら何でも沸点が低すぎるだろう。やはり、社会人失格である。",
        "私は思わず天を仰ぐ。",
        "本当、面倒くさいな・・・。",
        "正直不満で一杯だったが、とにかく今はこの状況を何とかしなければならない。",
        "このままではお客様にまで迷惑が及んでしまう。",
        "どうしたものか・・・。",
        "私は漏れそうになるため息を堪えつつ、とりあえず彼女を落ち着かせるための算段を思案する。",
        "<fadeIn_character 1 17>「覚悟なさい・・・」",
        "すると、いつの間にか彼女の両手には、出刃包丁が構えられていた。",
        "二本の刃物は蛍光灯に照らされて、どんよりと鈍い光を放っている。",
        "その光はチラチラと彼女の顔で反射しており、時折、目を細める表情が不気味だった。<fadeIn_character 1 18>",
        "一体どこから出してきたのか。<newLine>そもそもなぜそんな物騒なものを持っているのか。<newLine>もはやそんなことを考える暇もなかった。",
        "<skip 16><sway_bg><bg 1><fadeOut_character 1 0>彼女はイノシシのごとく、猛然と私に飛びかかってきた。",
    ];

    text[16] = [
        "<fadeOutIn_bg 2><popUp2>",
        "「フフフ」",
        "「ハハハ」",
        "「恥をかかせた代償だ」",
        "「馬鹿共が」",
        "「さて」",
        "「あとはお前だけだ」",
        "「そこにいろ」",
        "<sway_bg><bg 2>「すぐに行く」",
        "<fear><scream><fadeOut_textArea><bg 7><pause>",
        "【ＢＡＤ　ＥＮＤ】",
        "<sway_bg><fear2><scream><fadeOut_textArea><bg 8><pause>",
        "【ＢＡＤ　ＥＮＤ】",
        "<popUp3><popUp4><pause>",
        "<title>"
    ];

    text[17] = [
        "これだけの呻き声だ。かなり体調が悪いに違いない。",
        "心配になった私は、コンコンコン、とノックをして声をかけてみる。",
        "「あのー、大丈夫ですか？」",
        "「人、呼んできましょうか？」",
        "すると、呻きはパタリと止み、声が返ってきた。",
        "「心の優しき者よ」",
        "声色は先ほどとは打って変わって落ち着いている。",
        "そしてなぜだろう。どこか聞き覚えのあるような——————",
        "「そなたに、幸あれ」",
        "<fadeOutIn_bg 4>",
        "その言葉と同時に、個室の中から白い閃光が一気に立ち昇る。",
        "閃光は天井に衝突すると放射状に拡散し、辺りは瞬く間にまばゆい光に覆われた。",
        "止めどなく溢れ出してくる光源の勢いは凄まじく、もはや目を開けていられなかった。",
        "私の視界は既に真っ白で、平衡感覚も危うくなり始めている中、ゆっくりと個室のドアの開く音がする。",
        "どんな人なんだ？",
        "<skip 18>気になって懸命に目を開こうとするが、その思いとは裏腹に、私の意識はみるみる遠のいていった。"
    ];

    text[18] = [
        "<fadeOutIn_bg 3>",
        "気が付くと周囲には誰も居らず、ただ一人私だけが立ち尽くしていた。",
        "<popUp>一体、何だったんだろう・・・。",
        "<toilet>私の脳内では、あの懐かしのメロディーが延々と木霊（こだま）していた。",
        "相変わらず頭は混乱していたが、ハッと仕事のことを思い出す。",
        "腕時計を見ると、開店時間まであとわずかだった。",
        "・・・仕事に、戻らなきゃ。",
        "<skip 19>とりあえず私は気持ちを切り替えて、教室に戻ることにした。"
    ];

    text[19] = [
        "<save19><fadeIn_bg><bg 1>教室に戻ると、話し声がしていた。",
        "新人の落合さんと、もう一人は男性の声。どうやら受講生が来校されたようだ。",
        "<fadeIn_character 2 21>「やあやあ先生、おはようさんさん」",
        "<fadeIn_character 3 9>「ようこそ、お待ちしておりました」",
        "「見ない顔じゃな。今日は新しい先生の日かえ？」",
        "「さようでございます。落合玉子と申します」",
        "「玉子、と呼んでくださいまし」",
        "「はっは！　玉子先生や、お手柔らかにのう」",
        "「どうぞよろしくお願いいたします」",
        "<fadeOut_character 2 0><fadeOut_character 3 0>驚いた。相当癖はあるが、まさかあの落合さんが普通に接客しているとは。",
        "・・・まあ、そらそうだよね。一応、社会人なんだし。",
        "いささかの納得とささやかな安堵を胸に、私も合流する。",
        "「神戸（かんべ）さーん、おはようございますー！」",
        "<fadeIn_character 1 22>「ぎゃ！　誰じゃ？」",
        "<fadeOut_character 1 0><select1 20><select2 9><select3 none><text1 呆けと認識して接客><text2 本気と認識して接客><selectBox>どうしますか？"
    ];

    text[20] = [
        "<save20>「ハイハイ、もう忘れちゃいましたかー？」",
        "「神戸さん、またボケちゃいましたかー？」",
        "<fadeIn_character 1 23>「ワッハッハ！」",
        "「わしゃあ、まだまだボケんわい！」",
        "「先生、今日もよろしく頼むのう」",
        "<fadeOut_character 1 0>これがいつもの神戸さんである。こういった会話がお好きな方なのだ。",
        "——————その時、",
        "ふいに鋭い視線を感じて目をやると、",
        "落合さんがもの凄い形相で、私のことを睨みつけていた。",
        "<fadeIn_character 1 10><fadeOutIn_bg 6>",
        "「・・・・・・」",
        "<skip 21><fadeOut_character 1 0>"
    ];

    text[21] = [
        "<save21><fadeOutIn_bg 1>",
        "「こんにちはー！」",
        "<fadeIn_character 2 31>声がして振り返ると、小学生くらいの男の子と、その母親と思われる人物が入口に立っていた。",
        "「パソコンの体験に来ましたー！」",
        "本日ご予約されている無料体験のお客様が来店されたようだ。",
        "私は仕事モードに切り替える。",
        "お二人に入室を促し、手はず通り落合さんにバトンタッチをする。",
        "さてさて、落合さんのお手並み拝見といきますか。",
        "<fadeIn_character 3 12>「はーいボクちゃん、いらっしゃーい！」",
        "「美人なお姉さんと楽しくパソコンしましょうねー！」",
        "一気に3オクターブくらい高くなった声色で、さも子犬をあやすかのように案内を始めた。",
        "<fadeOut_character 2 0><fadeOut_character 3 0><select1 22><select2 5><select3 5><text1 何も言わない><text2 サポートする><text3 交代する><selectBox>どうしますか？"
    ];

    text[22] = [
        "<save22><fadeIn_character 2 32>母と子は見るからに分かりやすい反応をしていた。本当にこの人で大丈夫か？　といったところだろう。",
        "しかし今さら横やりなどはしない。余程のことでも起きない限り、口出しするつもりもない。",
        "なぜなら全て【経験】だからだ。私もそうやって成長してきた。",
        "私は他の受講生の対応をしながら、遠くから見守ることにした。",
        "<fadeIn_character 2 41>「ねえねえ先生」<newLine>「先生って本当にパソコンに詳しいの？」",
        "体験席に移動する道中、男の子が尋ねる。かなり疑っている様子だ。",
        "<fadeIn_character 3 13>「も、もちろんよ！」<newLine>「知らないことなんてねー、一つもないわよー！　ウフフ」",
        "「だからねー、この美人なお姉さんにねー、なーんでも聞いてちょうだい！」",
        "<fadeOut_character 3 0>男の子の面持ちから不安を汲み取ったのか、矢継ぎ早に答える。<newLine>きっと、彼女なりに対処しているのだろう。",
        "<fadeIn_character 2 42>「わあ、やったあ！」<newLine>「先生、詳しいんだー！」",
        "みるみる表情が明るくなっていく。<newLine>目をキラキラさせて、あっという間に元気一杯になった。",
        "<fadeOut_character 2 0>これが子供の特徴でもある。<newLine>感情の機微に敏感であることが肝要なのだ。",
        "落合さん、もしかすると、なかなかのやり手なのかもしれない。",
        "機嫌を良くした男の子は、堰（せき）を切った川のように、途端に流暢（りゅうちょう）に語り始めた。",
        "<fadeIn_character 1 42>「あのね、ボクね、今AI（人工知能）を作ってるの」",
        "「最近 ChatGPT とか BingAI とか Gemini とかよく聞くでしょ？」<newLine>「でもあれら生成AIには致命的な欠陥があるとも考えていて」",
        "「ディープラーニングによるブラックボックス問題であったり破局的忘却という欠点については先生もよくご存知の通りだと思うのだけれど」<newLine>「しかし、それ以前にボクは思うんだ」",
        "<fadeIn_character 1 43>「そもそもニューラルネットワークの在り方自体を、定義し直すフェーズに差しかかっているのではないか、とね」",
        "「つまり、既存のAIの概念を、ゼロから再構築しなくてはならない」",
        "「人工知能における真のパラダイムシフトを、発現させる時が来ている」",
        "「具体的にはニューロンとシナプスの関係性に着目していてね」<newLine>「要するに、人間でいう髄鞘（ずいしょう）だ。この部分にメスを入れる」",
        "「もっとも、これまでの研究や論文でも提唱されてきたように、理論的には正しいが、現代の技術水準では到底不可能、なんて否定的なご意見が山ほどあることも知っている」",
        "「だけどね、ボクにはね、世界をひっくり返すような・・・」",
        "「革新的なアイデアがある！」",
        "<fadeIn_character 1 44>「フフフ！」",
        "「もう、先生なら分かるよね？」<newLine>「それを確かめるために、ボクはここへ来たってわけ」",
        "<fadeOut_character 1 0>凄まじいキッズが体験に来たという感心と、一方でこれほどのレベルだと、当社では到底対応できそうもないということが分かった。",
        "落合さんの方を見ると・・・",
        "<fadeIn_character 1 14>見るからに分かりやすい顔をしていた。",
        "<fadeOut_character 1 0><select1 12><select2 13><select3 23><text1 助ける><text2 助けない><text3 神戸さんに託す><selectBox>どうしますか？"
    ];

    text[23] = [
        "<save23>神戸さんの方を見ると、いかにも微笑ましいといった具合でキッズのことを眺めている様子だった。",
        "そしてその時、まるで天からのお告げかのように “ 神戸さんに託す ” という選択肢が頭に舞い降りてきた。",
        "そこからの私はまさに自動化されたロボットのようだった。",
        "迷いや躊躇（ためら）いなんてものは一切なかった。",
        "プログラムされた通りにしか動けない機械のごとく、あるがままに平然と、神戸さんにヘルプを依頼した。",
        "「神戸さん、あとはよろしくお願いします」",
        "それを受けた神戸さんは眉一つ動かすことなく、ひたすらに穏やかな目で私を見つめていた。",
        "安堵感からなのか、私は役目を終えた操り人形のように、全身の力が抜けてその場にへたり込んでしまった。",
        "気が付くと涙がポロポロと溢れ出していて、それを神戸さんはそっと指で拭ってくれた。",
        "その手は皺（しわ）くちゃなのに、所々がゴツゴツとしていて、力強くて、何より温かかった。",
        "やがて神戸さんはすくっと立ち上がると、言った。",
        "「あい、わかった」",
        "<fadeOutIn_bg 9>",
        "神戸さんが、落合さん達のもとへと向かう。",
        "<skip 24>その背中は歴戦の勇士のように頼もしくて、私の瞳の中で、ただただ眩しく輝いていた。"
    ];

    text[24] = [
        "<bgm3><fadeOutIn_bg 10>",
        "おめでとうございます。",
        "前編、見事クリアです。",
        "<complete>",
        "気になる後編の見所をご紹介します。",
        "● ChatKNB（チャット神戸）の実力<newLine>● トイレには神様がいるんやで<newLine>● 玉子、死す<fadeIn_character 4 51><fadeIn_character 1 52><fadeIn_character 5 53>",
        "怒涛の展開から衝撃のラストまで、驚きを禁じ得ない内容となっております。",
        "<select1 25><select2 26><select3 none><text1 後編をプレイする><text2 ホーム画面に戻る><selectBox>どうしますか？"
    ];

    text[25] = [
        "<tmkRoom>"
    ];

    text[26] = [
        "<title>"
    ];

});