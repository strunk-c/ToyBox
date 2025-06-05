// 主要素
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const timerIcon = document.getElementById('timerIcon');
const timeDisplay = document.getElementById('time');
const firstDisplay = document.getElementById('firstPlace');
const secondDisplay = document.getElementById('secondPlace');
const thirdDisplay = document.getElementById('thirdPlace');
const tpcDisplay = document.getElementById('tpc');
const tpcTimesDisplay = document.getElementById('tpcTimes');
const setTimesDisplay = document.getElementById('setTimes');

// 音楽 ＆ 効果音
const heaven_and_hell = new Audio('./music/heaven_and_hell.m4a');
const william_tell = new Audio('./music/william_tell.mp3');
const inferno_strongest = new Audio('./music/inferno_strongest.mp3');
const monster_humming = new Audio('./music/monster_humming.mp3');
const dq_battle = new Audio('./music/dq_battle.mp3');
const sm_run = new Audio('./music/sm_run.mp3');
const oj_witch = new Audio('./music/oj_witch.m4a');
const ngSound = new Audio('./music/ng.mp3');
const okSound = new Audio('./music/ok.mp3');
const firstSound = new Audio('./music/first.mp3');
const secondSound = new Audio('./music/second.mp3');
const bestSound = new Audio('./music/best.mp3');
const betterSound = new Audio('./music/better.mp3');
const goodSound = new Audio('./music/good.mp3');
const fairSound = new Audio('./music/fair.mp3');
const badSound = new Audio('./music/bad.mp3');
const worseSound = new Audio('./music/worse.mp3');
const worstSound = new Audio('./music/worst.mp3');
const cheatSound = new Audio('./music/cheat.mp3');
const cheat2Sound = new Audio('./music/cheat2.mp3');
const cheat3Sound = new Audio('./music/cheat3.mp3');
const pushSound = new Audio('./music/push1.mp3');
const push1Sound = new Audio('./music/push1.mp3');
const push2Sound = new Audio('./music/push2.mp3');
const push3Sound = new Audio('./music/push3.mp3');
const push4Sound = new Audio('./music/push3.mp3');
const curseSound = new Audio('./music/dq_curse.mp3');
const cursorSound = new Audio('./music/dq_cursor.mp3');
const missSound = new Audio('./music/dq_miss.mp3');
const levelSound = new Audio('./music/dq_level.mp3');
const openingSound = new Audio('./music/dq_opening.mp3');
const innSound = new Audio('./music/dq_inn.mp3');
const coinSound = new Audio('./music/sm_coin.m4a');
const mushroomSound = new Audio('./music/sm_mushroom.m4a');
const stampSound = new Audio('./music/sm_stamp.m4a');
const stamp2Sound = new Audio('./music/sm_stamp.m4a');
const stamp3Sound = new Audio('./music/sm_stamp.m4a');
const stamp4Sound = new Audio('./music/sm_stamp4.m4a');
const upSound = new Audio('./music/sm_1up.m4a');
const goalSound = new Audio('./music/sm_goal.m4a');
const fireWorkSound = new Audio('./music/fireWork.mp3');
const fireWorkSound2 = new Audio('./music/fireWork2.mp3');
const fireWorkSound3 = new Audio('./music/fireWork2.mp3');

// 初回起動時用
const newGameDialog = document.getElementById('newGameDialog');
const unameDialog = document.getElementById('unameDialog');
const beginBtn = document.getElementsByClassName('beginBtn');
const slideColor = document.getElementsByClassName('slideColor');

// 初回起動確認用ローカルストレージ
let ic_uname = localStorage.getItem('ic_uname'); // 初回確認用(ic = Initial Confirmation)
if (!ic_uname) {
    newGameDialog.showModal();
    setTimeout(() => { beginBtn[0].style.cssText = 'visibility: visible; animation: blinking 3s;'; }, 12000);
}

beginBtn[0].addEventListener('click', () => {
    // 幅が1024px以上のビューポートをターゲットとするメディアクエリを作成
    const mediaQuery = window.matchMedia('(min-width:1024px)');
    if (mediaQuery.matches) { // 条件に合致したらPC用のcssを一時的に適用
        const flex_child = document.querySelector('.flex_child');
        flex_child.style.cssText = 'padding-left: unset; padding-right: 8rem;';
    } else { // スマホ用でも一時的なcssを適用
        const unameImg = document.querySelector('.unameImg');
        const unameImg_reverse = document.querySelector('.unameImg.reverse');
        const unameMessage = document.getElementById('unameMessage');
        unameImg.style.cssText = 'height: 320px;';
        unameImg_reverse.style.cssText = 'height: 400px;';
        unameMessage.style.cssText = 'height: 64px;';
    }

    slideColor[0].style.cssText = 'background-position: 0 0;';
    push1Sound.play();
    openingSound.loop = true;
    setTimeout(() => { openingSound.play(); }, 1000);
    setTimeout(() => { newGameDialog.close(); }, 1000);
    setTimeout(() => { unameDialog.showModal(); }, 1100);
});

// ひみつリスト管理用ローカルストレージ
let secretList;
let secretList_storage;
let secretList_json;
// Uncaught TypeError TypeError: Cannot read properties of undefined (reading 'discoveryStatus')への対処 → 構文解析されてから実行する
document.addEventListener('DOMContentLoaded', function () {
    secretList = JSON.parse(localStorage.getItem('secretList'));
    if (!secretList) {
        secretList_storage = { discoveryStatus: ['undiscovered', 'undiscovered', 'undiscovered', 'undiscovered', 'undiscovered', 'undiscovered', 'undiscovered', 'undiscovered'] };
        secretList_json = JSON.stringify(secretList_storage);
        localStorage.setItem('secretList', secretList_json);
    } else {
        secretList_storage = secretList;
        secretList_json = JSON.stringify(secretList_storage);
        localStorage.setItem('secretList', secretList_json);
    }
    secretList = JSON.parse(localStorage.getItem('secretList'));
    // BACKDROP 初回読込
    backdropNumber = JSON.parse(localStorage.getItem('backdropNumber'));
});

// レコード用ローカルストレージ(デフォルトで文字列格納になるためJSON.parse()で数値として格納する)
let first = JSON.parse(localStorage.getItem('firstPlace'));
if (!first) {
    localStorage.setItem('firstPlace', JSON.parse(77.77));
}
let second = JSON.parse(localStorage.getItem('secondPlace'));
if (!second) {
    localStorage.setItem('secondPlace', JSON.parse(88.88));
}
let third = JSON.parse(localStorage.getItem('thirdPlace'));
if (!third) {
    localStorage.setItem('thirdPlace', JSON.parse(99.99));
}

// 総プレイ回数用ローカルストレージ
let tpc = JSON.parse(localStorage.getItem('totalPlayCount'));
if (!tpc) {
    localStorage.setItem('totalPlayCount', JSON.parse(0));
}

// BGM 変更用ローカルストレージ
let bgmNumber = JSON.parse(localStorage.getItem('bgmNumber'));
if (!bgmNumber) {
    localStorage.setItem('bgmNumber', JSON.parse(0));
}

// BACKDROP 変更用ローカルストレージ
let backdropNumber = JSON.parse(localStorage.getItem('backdropNumber'));
if (!backdropNumber) {
    localStorage.setItem('backdropNumber', JSON.parse(0));
}

// ひみつリスト管理用ローカルストレージ
let secretNumber = localStorage.getItem('secretNumber');
if (!secretNumber) {
    localStorage.setItem('secretNumber', '0');
}

// 全クリ確認用ローカルストレージ
let lastSecret = localStorage.getItem('lastSecret');
if (!lastSecret) {
    localStorage.setItem('lastSecret', 'false');
}

// トロフィー確認用ローカルストレージ
let getTrophy = localStorage.getItem('getTrophy');
if (!getTrophy) {
    localStorage.setItem('getTrophy', 'false');
}

// ズル(Alt + Shift + Click)確認用ローカルストレージ
let cheating = localStorage.getItem('cheating');
if (!cheating) {
    localStorage.setItem('cheating', 'false');
}

// ペア数用セッションストレージ
let pairUnit = sessionStorage.getItem('pairUnit');
if (!pairUnit) {
    // デフォルトは 15ペアで終了とする
    sessionStorage.setItem('pairUnit', '15');
}

// 各種ひみつ発火用セッションストレージ
let featherNumber = sessionStorage.getItem('featherNumber');
if (!featherNumber) {
    sessionStorage.setItem('featherNumber', '0');
}

// チート判定用セッションストレージ(JSON.parse()なしでも++処理は可能)
let cheatNumber = sessionStorage.getItem('cheatNumber');
if (!cheatNumber) {
    sessionStorage.setItem('cheatNumber', '0');
}
// チート促進用セッションストレージ
let cheatPromotion = sessionStorage.getItem('cheatPromotion');
if (!cheatPromotion) {
    sessionStorage.setItem('cheatPromotion', '0');
}

// 配列 ＆ 数値をオブジェクトとして保存
// let objRecord = {
//     title: "RECORD",
//     number: ["No.", "01", "02", "03"],
//     rank: ["　", 77.77, 88.88, 99.99]
// };
// // JSON形式に変換 → ローカルストレージに保存
// let jsonSave = JSON.stringify(objRecord);
// localStorage.setItem("localRecord", jsonSave);
// // ロード処理(取得 → オブジェクトに変換)
// let jsonLoad = localStorage.getItem("localRecord");
// let record = JSON.parse(jsonLoad);
// 確認用
// alert(record.number[0]); // 結果 → No.
// JSON.stringify()  → JavaScriptオブジェクトをJSON形式の文字列に変換(データ整形用などに使用)
// JSON.parse()      → JSON形式の文字列をJavaScriptオブジェクトに変換(文字列ではなく、数値として扱うなど)


// [textContent] →    HTMLタグやスタイル等も無視し、テキストのみを返す。
//                    textContent は値が HTML として解析されないので性能が良くなる。
//                    さらに、textContent を使用することで XSS 攻撃を防ぐことができる。

// [innerText]   →    HTMLタグは無視される。CSSのスタイルや「\n」等は反映される。「人間が読める」要素のみを表示する。
//                    CSS のスタイルを考慮するため、最新の計算されたスタイルを保証するために再フロー（Reflow）を起動する。
//                    (再フローは計算が重いので、可能であれば避けるべき)

// [innerHTML]   →    HTMLタグを含むことができるため、セキュリティ面には留意。また、scriptタグについては、以下に記述する。
//
//                    （ここでは 'el' を HTML の DOM 要素と想定する）
//                    name = "<script>alert('I am John in an annoying alert!')</script>";
//                    el.innerHTML = name; → この場合は無害（HTML5では、scriptタグは実行できないように定義されているため）だが、抜け道もある。
//
//                    const name = "<img src='x' onerror='alert(1)'>";
//                    el.innerHTML = name; → この場合はアラートで "1" が表示される


//          【関数宣言】
// ● 重複して記述した場合は上書きされる
// ● 実行文を先に書いても問題ない

//          【関数式】
// ● 重複して記述した場合はエラーとなる(const,let = 再宣言不可のため)
// ● 実行文を先に書くとエラーとなる

// JavaScript の関数宣言は、それを囲む関数やグローバルスコープの先頭に巻き上げられ、関数を宣言する前に使うことができる。
// 関数式は巻き上げられないことに注意。


// 関数宣言
function escapeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    str = str.replace(/`/g, '&#x60;'); // グレイヴ・アクセント(バッククォート) &#96; 文字コード標準のASCII(アスキー)では96番(16進数で60)が割り当てられている
    return str;
}

// 関数式
const sanitizeHtml = function (str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#x60;');
};

// NEW GAME 処理
const uname = document.getElementById('uname');
const unameMessage = document.getElementById('unameMessage');
const decisionButton = document.getElementById('decisionButton');

// ひらがな以外は入力させない処理
// const hiragana = /^[\u3041-\u3094]+$/u; // 「ぁ(3041)」～「ゔ(3094)」までの場合 ※「ん(3093)」
const hiragana = /^[ぁ-ん]+$/u;
uname.addEventListener('keyup', () => {
    let tmp = [];
    uname.value.split(" ").forEach(function (item) {
        if (item.match(hiragana)) {
            tmp.push(item);
        }
    });

    if (tmp.length > 0) {
        uname.value = tmp.join("");
    } else {
        uname.value = "";
    }
});

// ひらがなチェック確認用
uname.addEventListener('keyup', () => {
    if (uname.value.match(hiragana)) {
        unameMessage.classList.remove('error');
        unameMessage.textContent = `「 ${uname.value} 」`;
    } else {
        unameMessage.classList.add('error');
        unameMessage.textContent = "「もじ、ひらがな！」";
    }
});

// ひらがなチェック文字数
const minLength = 2;
const maxLength = 5;
const wordCount = document.getElementById('word-count');
const wordArea = document.getElementById('word-area');
const limitTextLength = () => {

    if (uname.value.length < minLength) {
        uname.value = uname.value.substring(0, minLength);
        wordCount.classList.add('max');
    } else if (uname.value.length > maxLength) {
        uname.value = uname.value.substring(0, maxLength);
        wordCount.classList.add('max');
    } else {
        wordCount.classList.remove('max');
    }

    wordCount.textContent = uname.value.length;
    // wordCount.textContent = maxLength - uname.value.length; // 残りの文字数をカウントする場合
};

// 決定ボタン押下 → 出力
decisionButton.addEventListener('click', () => {
    if (uname.value.length <= 1) { // 入力された文字数が１文字以下ならエラーを返す
        ngSound.play();
        unameMessage.classList.add('error');
        unameMessage.textContent = "「もじ、えらー！」";
    } else {
        push2Sound.play();
        unameMessage.classList.remove('error');
        wordArea.classList.add('hidden');
        unameMessage.textContent = `「 ${uname.value}、ようこそ！ 」`
        localStorage.setItem('ic_uname', uname.value);
        unameDialog.style.pointerEvents = 'none';
        setTimeout(() => { unameDialog.style.pointerEvents = 'auto'; }, 4000);
        setTimeout(() => { unameDialog.close(); }, 4000);
        setTimeout(() => { location.reload(); }, 4400);
        //--------------------------------
        // BGM フェードアウト
        //--------------------------------
        // 0.1秒毎に下記関数を繰り返す
        const timerId = setInterval(funcInterval, 100);
        openingSound.volume = 1; // 音量の最大が 1.0
        function funcInterval() {
            // ボリュームが 0 になったら終了
            if ((openingSound.volume - 0.02) <= 0) {
                openingSound.volume = 0;
                openingSound.pause();
                clearInterval(timerId); // タイマー解除
            }
            // 0.02ずつボリュームを減らしていく
            else {
                openingSound.volume -= 0.02;
            }
        }
    }
});

// Enterキーによるデフォルトの submit動作をキャンセル
const unameForm = document.getElementById('unameForm');
unameForm.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// Escキー無効化(モーダルクローズ対策)
window.document.onkeydown = function (e) {
    if (e.key == 'Escape') {
        e.key = null;
        return false;
    }
};

const defaultMusic = document.getElementById('defaultMusic'); // const heaven_and_hell (音選択時の試聴用）と同じ音だが、勉強用のため使い分けている
const btnPlay = document.getElementById('start');
const btnStop = document.getElementById('stop');
const btnReset = document.getElementById('reset');
const navMenu = document.getElementsByClassName('navMenu');
const firstObject = document.getElementById('firstObject');

btnPlay.addEventListener('click', () => {
    if (cheatNumber == 7 && featherNumber == 7) {
        dq_battle.loop = true; // ループ再生処理
        dq_battle.play();
    } else if (cheatNumber == 8 && featherNumber == 8) {
        sm_run.loop = true;
        sm_run.play();
    } else if (cheatNumber == 9 && featherNumber == 9) {
        oj_witch.loop = true;
        oj_witch.play();
    } else if (bgmNumber == 1) {
        william_tell.loop = true;
        william_tell.play();
    } else if (bgmNumber == 2) {
        inferno_strongest.loop = true;
        inferno_strongest.play();
    } else if (bgmNumber == 3) {
        monster_humming.loop = true;
        monster_humming.play();
    } else if (bgmNumber == 4) {
        dq_battle.loop = true;
        dq_battle.play();
    } else if (bgmNumber == 5) {
        sm_run.loop = true;
        sm_run.play();
    } else if (bgmNumber == 6) {
        oj_witch.loop = true;
        oj_witch.play();
    } else {
        defaultMusic.play(); // <audio id="defaultMusic" loop>(HTML記述)
    }
    pushSound.play();
    firstObject.style.pointerEvents = 'none';
    // getElementsByClassName のため for文で回しても OK
    for (let i = 0; i < navMenu.length; i++) {
        navMenu[i].style.pointerEvents = 'none';
    }
    // ↑ 同義 ↓
    // navMenu[0].style.pointerEvents = 'none';
    // navMenu[1].style.pointerEvents = 'none';
    // navMenu[2].style.pointerEvents = 'none';
    // navMenu[3].style.pointerEvents = 'none';
});

btnStop.addEventListener('click', () => {
    if (cheatNumber == 7 && featherNumber == 7) {
        dq_battle.pause();
    } else if (cheatNumber == 8 && featherNumber == 8) {
        sm_run.pause();
    } else if (cheatNumber == 9 && featherNumber == 9) {
        oj_witch.pause();
    } else if (bgmNumber == 1) {
        william_tell.pause();
    } else if (bgmNumber == 2) {
        inferno_strongest.pause();
    } else if (bgmNumber == 3) {
        monster_humming.pause();
    } else if (bgmNumber == 4) {
        dq_battle.pause();
    } else if (bgmNumber == 5) {
        sm_run.pause();
    } else if (bgmNumber == 6) {
        oj_witch.pause();
    } else {
        defaultMusic.pause();
    }
    pushSound.play();
    firstObject.style.pointerEvents = 'auto';
    for (let i = 0; i < navMenu.length; i++) {
        navMenu[i].style.pointerEvents = 'auto';
    }
});

// switch(参考：複数の条件式で判定させたい場合の工夫例)
// let bcNumber = bgmNumber + ',' + cheatNumber;
// btnPlay.addEventListener('click', () => {
//     switch (bcNumber) {
//         case '0,1':
//             william_tell.loop = true;
//             william_tell.play();
//             break;
//         case '1,2':
//             inferno_strongest.loop = true;
//             inferno_strongest.play();
//             break;
//         default:
//             defaultMusic.play();
//     }
//     pushSound.play();
// });

function stopBgm() {
    defaultMusic.pause();
    william_tell.pause();
    inferno_strongest.pause();
    monster_humming.pause();
    dq_battle.pause();
    sm_run.pause();
    oj_witch.pause();
}

// 押下アナウンス関数
const push = document.getElementById('time');
const buttons = document.getElementsByClassName('buttons');
let ic_push = localStorage.getItem('ic_push');
function pushAlert() {
    if (buttons[0].style.display == 'none') { // アナウンスは重複表示させない
        return;
    } else {
        const pushBox = document.createElement('div');
        pushBox.id = 'pushBox';
        pushBox.style.cssText = 'font-family: "Press Start 2P", serif; font-weight: 600; color: red; margin-left:-166px; margin-top:16px; animation: blinking .9s ease-in-out infinite alternate;';
        pushBox.textContent = '↑ HINT: 4';
        push.appendChild(pushBox);
        // アナウンス時に画面の高さを変えたくないため一時的にボタン群を消す処理
        buttons[0].style.display = 'none';
        setTimeout(() => { buttons[0].style.display = 'block'; }, 9000);
        setTimeout(() => { pushAlertOff(); }, 9000);
        // ボタン押下メッセージおよびモーダルを消す処理
        largeDisplay();
        smallDisplay();
        setTimeout(() => { document.getElementById('recordDialog').close(); }, 2000);
        // 誘導されてボタンを押した際にリロードする処理（ストップウォッチ・うんちアイコン兼用）
        timerIcon.style.cssText = 'animation: move .9s ease-in-out infinite alternate;';
        timerIcon.style.pointerEvents = 'auto';
        timerIcon.addEventListener('click', function () {
            location.reload();
        });
    }
}
// 押下アナウンス削除関数
function pushAlertOff() {
    const pushBox = document.getElementById('pushBox');
    push.removeChild(pushBox);
}

// 新記録達成 ＆ ひみつ発見時アナウンス関数
function recordAlert(announce) {
    const alertBox = document.createElement('div');
    alertBox.id = 'alertBox';
    alertBox.style.cssText = 'font-family: "Jersey 15", serif; font-weight: 500; font-size: xxx-large; color: black; width: 100%; padding: 2px 0; background-color: white; text-align: center; position: fixed; top: 0px; left: 0px;';
    alertBox.textContent = announce;
    document.body.appendChild(alertBox);
    setTimeout(() => { recordAlertOff(); }, 5000);
}
// 新記録アナウンス削除関数
function recordAlertOff() {
    const alertBox = document.getElementById('alertBox');
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(alertBox);
}

// 花火関数
function fireOn() {
    const fireBox = document.createElement('div');
    fireBox.id = 'firework';
    document.body.appendChild(fireBox);
    fireWorkSound.play();
    setTimeout(() => { fireOff(); }, 3000);
}
// 花火削除関数
function fireOff() {
    const fireBox = document.getElementById('firework');
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(fireBox);
}

// 花火関数(2発)
function fireOn2() {
    const fireBox = document.createElement('div');
    const fireBox2 = document.createElement('div');
    fireBox.id = 'firework';
    fireBox2.id = 'firework';
    document.body.appendChild(fireBox);
    document.body.appendChild(fireBox2);
    fireWorkSound.play();
    setTimeout(() => { fireWorkSound2.play(); }, 1500);
    setTimeout(() => { fireOff2(); }, 3000);
}
// 花火削除関数(2発)
function fireOff2() {
    const fireBox = document.getElementById('firework');
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(fireBox);
    const fireBox2 = document.getElementById('firework');
    body.removeChild(fireBox2);
}

// 花火関数(3発)
function fireOn3() {
    const fireBox = document.createElement('div');
    const fireBox2 = document.createElement('div');
    const fireBox3 = document.createElement('div');
    fireBox.id = 'firework';
    fireBox2.id = 'firework';
    fireBox3.id = 'firework';
    document.body.appendChild(fireBox);
    document.body.appendChild(fireBox2);
    document.body.appendChild(fireBox3);
    fireWorkSound.play();
    setTimeout(() => { fireWorkSound2.play(); }, 1500);
    setTimeout(() => { fireWorkSound3.play(); }, 2250);
    setTimeout(() => { fireOff3(); }, 3000);
}
// 花火削除関数(3発)
function fireOff3() {
    const fireBox = document.getElementById('firework');
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(fireBox);
    const fireBox2 = document.getElementById('firework');
    body.removeChild(fireBox2);
    const fireBox3 = document.getElementById('firework');
    body.removeChild(fireBox3);
}

// チートアナウンス関数
function cheatAlert(announce, color, background = 'white') { // 最後尾の引数がない場合は white にする
    const alertBox = document.createElement('div');
    alertBox.id = 'alertBox';
    alertBox.style.cssText = 'font-family: "Jersey 15", serif; font-weight: 500; font-size: xxx-large; color: black; width: 100%; padding: 2px 0; text-align: center; position: fixed; top: 0px; left: 0px;';
    alertBox.textContent = announce;
    alertBox.style.color = color;
    alertBox.style.backgroundColor = background;
    document.body.appendChild(alertBox);
    setTimeout(() => { cheatAlertOff(); }, 1000);
}
// チートアナウンス削除関数
function cheatAlertOff() {
    const alertBox = document.getElementById('alertBox');
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(alertBox);
}

// 高速リロード用
btnReset.addEventListener('click', () => {
    if (featherNumber == 4) {
        setTimeout(() => { location.reload(); }, 100);
    } else {
        pushSound.play();
        btnPlay.style.pointerEvents = 'none';
        setTimeout(() => { btnPlay.style.pointerEvents = 'auto'; }, 2000);
        setTimeout(() => { push2Sound.play(); }, 500);
        setTimeout(() => { location.reload(); }, 2000);
    }
});

const reloadType = document.getElementById('reloadType');
btnReset.addEventListener('mouseover', function () {
    if (featherNumber == 4) {
        reloadType.innerHTML = '<i class="fa-solid fa-lock-open fa-2x"></i>';
        // reloadType.textContent = 'High-Speed';
    } else {
        reloadType.innerHTML = '<i class="fa-solid fa-lock fa-2x"></i>';
        // reloadType.textContent = 'Slow-Speed';
    }
});

// モード(ペア数)変更 <li>タグ用
const navPairNumber = document.getElementById('navPairNumber');
function pairJudge() {
    if (pairUnit == 3) {
        navPairNumber.innerHTML = '<span class="fa-stack fa-xs"> <i class="fas fa-3"></i> <i class="fas fa-spinner fa-pulse fa-stack-2x" style="color: rgb(22, 22, 202);"></i> </span>';
        navPairNumber.style.pointerEvents = 'none';
        sessionStorage.setItem('featherNumber', '0');
    } else if (pairUnit == 5) {
        navPairNumber.innerHTML = '<span class="fa-stack fa-xs"> <i class="fas fa-5"></i> <i class="fas fa-spinner fa-pulse fa-stack-2x" style="color: rgb(202, 22, 22);"></i> </span>';
        navPairNumber.style.pointerEvents = 'none';
        sessionStorage.setItem('featherNumber', '0');
    } else if (pairUnit == 7) {
        navPairNumber.innerHTML = '<span class="fa-stack fa-xs"> <i class="fas fa-7"></i> <i class="fas fa-spinner fa-pulse fa-stack-2x" style="color: rgb(202, 22, 202);"></i> </span>';
        navPairNumber.style.pointerEvents = 'none';
        sessionStorage.setItem('featherNumber', '0');
    } else {
        return;
    }
}

// Press the Start Button 非表示
function largeDisplay() {
    const elm = document.getElementsByClassName('largeDisplay');
    elm[0].style.visibility = 'hidden';
    // elm[0].style.display = 'none';  一つ目のみ処理する場合
    // getElementsByClassName は配列のような HTMLCollection を返すため、1つしか要素が無くてもそれに適したアクセスをする必要がある
}

function smallDisplay() {
    const elm = document.getElementsByClassName('smallDisplay');
    elm[0].style.display = 'none';       // 高さも消える
    // elm[0].style.visibility = 'hidden';  高さは残る
    // elm[0].style.opacity = 0;            高さは残り、クリック可（＝透明）
}

// TOP画像ランダム表示
function firstObjectRandom() {
    const imgUrl = [];
    imgUrl[0] = 'dance.gif';
    imgUrl[1] = 'dance2.gif';
    imgUrl[2] = 'dance3.gif';
    imgUrl[3] = 'dance4.gif';
    imgUrl[4] = 'dance5.gif';
    imgUrl[5] = 'cat.gif';
    imgUrl[6] = 'flower.gif';
    imgUrl[7] = 'headBanging.gif';
    imgUrl[8] = 'heatedTable.gif';
    let num = Math.floor(Math.random() * imgUrl.length);

    if (pairUnit == 3 || pairUnit == 5 || pairUnit == 7) {
        firstObject.style.backgroundImage = 'url(./image/dove.gif';
    } else if (cheatNumber == 7 && featherNumber == 7) {
        firstObject.style.backgroundImage = 'url(./image/bgmChange.gif';
    } else if (cheatNumber == 8 && featherNumber == 8) {
        firstObject.style.cssText = 'transform: scale(-1, 1);'; // 左右反転表示 ※ scale(横軸, 縦軸);
        firstObject.style.backgroundImage = 'url(./image/bgmChange.gif';
    } else if (cheatNumber == 9 && featherNumber == 9) {
        firstObject.style.backgroundImage = 'url(./image/cheat.gif';
    } else {
        firstObject.style.backgroundImage = 'url(./image/' + imgUrl[num] + ')';
    }
}

// #firstObject 非表示用
function firstObjectNone() {
    if (firstObject.style.display == 'none') {
        firstObject.style.display = 'block';
    } else {
        firstObject.style.display = 'none';
    }
}

// 結果出力前画像ランダム表示
const secondObject = document.getElementById('secondObject');
function secondObjectRandom() {
    const imgUrl = [];
    imgUrl[0] = 'walk.gif';
    imgUrl[1] = 'walk2.gif';
    imgUrl[2] = 'walk3.gif';
    imgUrl[3] = 'walk4.gif';
    imgUrl[4] = 'walk5.gif';
    let num = Math.floor(Math.random() * imgUrl.length);
    secondObject.style.backgroundImage = 'url(./image/' + imgUrl[num] + ')';
}

// #secondObject 非表示
function secondObjectNone() {
    if (secondObject.style.display == 'none') {
        secondObject.style.display = 'block';
    } else {
        secondObject.style.display = 'none';
    }
}

/*// 結果画像
const worstImage = new Image(160, 160);
worstImage.src = './image/worst.gif';*/

const supportMessage = document.getElementById('supportMessage');
function supportMessageRandom() {
    const sm = [];
    sm[0] = 'ラストスパート！';
    sm[1] = 'いいかんじだッピ！';
    sm[2] = 'ガンガンいくッピ！';
    sm[3] = 'すごいッピ♪';
    sm[4] = 'マッチングー♪';
    sm[5] = 'はねアイコン、おせます。';
    sm[6] = 'ぴよのこと、おせます。';
    sm[7] = 'ひだりては、そえるだけ・・・';
    sm[8] = 'はね・ぴよを、そろえるだけ・・・';
    sm[9] = 'クリリンのことかー！！';
    sm[10] = 'はね・ぴよをおすだけかー！！';
    sm[11] = 'いまズルしたッピ？';
    sm[12] = 'ピヨピヨピヨ。';
    sm[13] = 'ク、クルッポー。';
    sm[14] = 'おい、' + localStorage.getItem('ic_uname') + '！';
    sm[15] = 'ぴよ、' + localStorage.getItem('ic_uname') + 'のこと、すきー！';
    sm[16] = localStorage.getItem('ic_uname').substring(0, 1) + '、' + localStorage.getItem('ic_uname').substring(0, 1) + '、' + localStorage.getItem('ic_uname') + 'さん？';
    let num = Math.floor(Math.random() * sm.length);
    supportMessage.textContent = sm[num];
}

function supportMessageNone() {
    if (supportMessage.style.display == 'none') {
        supportMessage.style.display = 'block';
    } else {
        supportMessage.style.display = 'none';
    }
}

// カード画像
const img_path = 'image/';
const img_array = [
    'card_bat', 'card_beetle', 'card_cat', 'card_cow', 'card_crocodile',
    'card_dog', 'card_fish', 'card_flower', 'card_hamster', 'card_kappa',
    'card_penguin', 'card_pig', 'card_pome', 'card_sea_otter'
];

let img_tag_array = [];
for (let i = 0; i < 14; i++) {
    img_tag_array.push('<img src="' + img_path + img_array[i] + '.webp">')
}
img_tag_array.push(('<img src="' + img_path + "card_cry" + '.gif">')); // 一種類のみ GIF カード

/* ------------------------------------------------ */

// ロード
document.addEventListener('DOMContentLoaded', function () {

    timerIconJudge();
    pairJudge();
    featherStatus();
    firstObjectRandom();
    backdropStyle(backdropNumber);

    const array = [];
    for (let i = 0; i < 15; i++) {
        array.push(i);
        array.push(i);
    }  // [0,0,1,1,2,2,...] 計15組

    shuffle(array);
    const board = document.getElementById('board');

    if (cheatNumber == 9 && featherNumber == 9) { // チートプレイなら
        for (i = 0; i < 30; i++) {
            let div = document.createElement('div');
            div.className = 'card';
            div.number = array[i];
            div.innerHTML = img_tag_array[div.number];
            div.onclick = turn;
            board.appendChild(div);
        }
    } else { // チートプレイではないが
        if (cheating == 'true') { // 過去にズルで全クリをしたことがあるなら
            for (i = 0; i < 30; i++) {
                let div = document.createElement('div');
                div.className = 'card back';
                div.number = array[i];
                div.onclick = turn;
                board.appendChild(div);
                let cardBack = document.getElementsByClassName('back');
                cardBack[i].style.cssText = 'background-image: url("./image/chicken.webp");';
            }
        } else if (getTrophy == 'true') { // 健全に全クリしているなら
            for (i = 0; i < 30; i++) {
                let div = document.createElement('div');
                div.className = 'card back';
                div.number = array[i];
                div.onclick = turn;
                board.appendChild(div);
                let cardBack = document.getElementsByClassName('back');
                cardBack[i].style.cssText = 'background-image: url("./image/logo.png");';
            }
        } else { // 健全プレイ
            // div要素作成(カード)
            for (i = 0; i < 30; i++) {
                let div = document.createElement('div');
                div.className = 'card back'; // カードの裏側を表示
                div.number = array[i];       // プロパティを設定
                // console.log(Object.keys(div));
                // console.log(Object.values(div));
                div.onclick = turn;
                board.appendChild(div);
            }
        }
    }

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    setBtnState(true, false, true);
});

// タイマー群
let startTime; // 開始時間
let timer; // 経過秒数用 タイマーID
let backTimer; // カードめくり用 タイマーID(動作中はカードがめくれないように)
let flgFirst = true; // 1枚目かどうかのフラグ(1枚目: true 2枚目: false)
let cardFirst; // 1枚目のカードを格納
let countUnit = 0; // 揃えた枚数(ペアができるたびに+1)
let startBoolean = false; // ズル判定用
let stopBoolean = false; // ズル判定用

// 制限時間用（スタートを押してから5分経過したらリロードする）
let timeLimitId = 0; // タイマーキャンセル等で使う ID は返り値や仕様上、0にするのがベター
function timeLimit() {
    timeLimitId = setTimeout(() => {
        loadingDialog.showModal();
        setTimeout(() => {
            loadingDialog.close();
            setTimeout(() => {
                location.reload();
            }, 1000);
        }, 1000);
    }, 300000);
}

function startTimer() {
    setBtnState(false, true, false);
    startTime = Date.now();
    // setInterval 関数による表示の更新(10ミリ秒毎)
    timer = setInterval(update, 10);
    // 正規プレイ判定用（プレイ前にカードを捲れないようにはしてあるが、一応）
    if (countUnit == 0) {
        startBoolean = true;
    }
    largeDisplay();
    smallDisplay();
    board.style.pointerEvents = 'auto';
    timeLimit();
}

// タイマーの表示 ＝ 現在時刻 - startBtnが押された時刻 ＋ 累積経過時間
let elapsedTime = 0; // 累積経過時間
function update() {
    let t = Date.now() - startTime + elapsedTime;
    // toFixedメソッドによる小数点以下の桁数指定(2桁分表示　例　123.45)
    timeDisplay.textContent = (t / 1000).toFixed(2);
    // recordDisplay.textContent = 'BEST：' + (t / 1000).toFixed(2);
}

function stopTimer() {
    setBtnState(true, false, true);
    elapsedTime = Date.now() - startTime + elapsedTime;
    // clearInterval 関数による更新の停止(setInterval による呼び出しをストップする)
    clearInterval(timer);
    stopBoolean = true;
    board.style.pointerEvents = 'none';
    // 制限時間用タイマーを一旦キャンセルする
    clearTimeout(timeLimitId);
}

function resetTimer() {
    setBtnState(true, false, false);
    timeDisplay.textContent = '0.00';
    elapsedTime = 0;
}

// 状況毎に応じたボタンの有効・無効設定
function setBtnState(start, stop, reset) {
    startBtn.disabled = !start;
    stopBtn.disabled = !stop;
    resetBtn.disabled = !reset;
}

/* ------------------------------------------------ */

// シャッフル用関数
function shuffle(array) {
    let n = array.length;
    while (n) {
        // n が 0 になったら終了 ここで毎回 -1
        i = Math.floor(Math.random() * n--);
        [array[n], array[i]] = [array[i], array[n]]
    }
    return array;
}

// カードクリック時の処理
function turn(e) {
    let div = e.target; //クリックしたカード
    // カードのタイマー処理が動作中は return
    if (backTimer) return; // 連続で押せないように
    // 裏向きのカードをクリックした場合は画像を表示する
    if (div.innerHTML == '') {
        div.className = 'card'; // backというクラス名を取り除いた
        div.innerHTML = img_tag_array[div.number];
    } else {
        return // 数字が表示されているカードは return
    }
    if (flgFirst) { // 1枚目の処理 一枚目ならtrue
        cardFirst = div;  // 最初にクリックしたカード
        flgFirst = false; // 次は２枚目だから

        largeDisplay();
        smallDisplay();

    } else { // ２枚目の処理
        if (cardFirst.number == div.number) {
            okSound.play();
            countUnit++; // 揃ったペアの数
            backTimer = setTimeout(function () {
                div.className = 'card finish'; // 0.5秒で透明
                cardFirst.className = 'card finish';
                backTimer = NaN;

                if (countUnit >= 8) {
                    supportMessageRandom();
                }

                if (countUnit == pairUnit) { // すべてカードが揃ったら（15set）
                    clearInterval(timer);    // timer 終了
                    setBtnState(false, false, true);
                    board.style.pointerEvents = 'none';
                    stopBgm();
                    supportMessageNone();
                    firstObjectNone();
                    setTimeout(() => { secondObjectRandom(); }, 2000);
                    setTimeout(() => { firstSound.play(); }, 2000);
                    setTimeout(() => { firstSound.play(); }, 4000);
                    setTimeout(() => { secondObjectNone(); }, 6000);
                    setTimeout(() => { secondSound.play(); }, 6000);
                    setTimeout(() => { showResult(); }, 8000); // ※タイムラグ要配慮
                }
            }, 500);
        } else {
            backTimer = setTimeout(function () {
                ngSound.play();
                div.className = 'card back';
                div.innerHTML = ''; // カードを裏側に戻す
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        flgFirst = true;
    }
}

// 結果判定処理群
const resultUrl = [];
resultUrl[0] = 'evaluation_worst.gif';
resultUrl[1] = 'evaluation_worse.gif';
resultUrl[2] = 'evaluation_bad.gif';
resultUrl[3] = 'evaluation_fair.gif';
resultUrl[4] = 'evaluation_good.gif';
resultUrl[5] = 'evaluation_better.gif';
resultUrl[6] = 'evaluation_best.gif';
resultUrl[7] = 'cheat.gif';
resultUrl[8] = 'cheat2.gif';
resultUrl[9] = 'cheat3.gif';
resultUrl[10] = 'dove.gif';
const thirdObject = document.getElementById('thirdObject');
const message = document.getElementById('resultMessage');

function showResult() {

    // navタグを押せるようにする
    for (let i = 0; i < navMenu.length; i++) {
        navMenu[i].style.pointerEvents = 'auto';
    }

    let str = '';
    let t = Date.now() - startTime + elapsedTime;
    // タイム判定用(四捨五入で判定する)
    let nowTime = new Date();
    let resultTime = Math.round((nowTime - startTime) / 1000) - 8;
    // テスト用
    // let str2 = 'タイム（テスト用）：' + resultTime + ' (四捨五入)';
    // let message2 = document.getElementById('judge');
    // message2.textContent = str2;
    // let str3 = 'ペア数（テスト用）：' + countUnit + ' (組)';
    // let message3 = document.getElementById('count');
    // message3.textContent = str3;

    if (startBoolean == true && stopBoolean == false) { // 正規プレイ判定（スタートボタンを押し、ストップボタンを使用せずにプレイしたか）

        if ((cheatNumber != 9 || featherNumber != 9) && pairUnit == 15) {  // 正規プレイ判定２（チートモードでプレイしていないか）

            // 以下、レコード更新処理
            let currentRecord = Number(JSON.parse(((t / 1000) - 8.0136).toFixed(2))); // ※タイムラグ要配慮 → ラグが生じるため調整(0.0136秒分)
            if (currentRecord < first) {
                localStorage.setItem('thirdPlace', second);
                localStorage.setItem('secondPlace', first);
                localStorage.setItem('firstPlace', currentRecord);
                recordAlert('NEW RECORD !!!');
                setTimeout(() => { fireOn3(); }, 5000);
            } else if (currentRecord < second) {
                localStorage.setItem('thirdPlace', second);
                localStorage.setItem('secondPlace', currentRecord);
                recordAlert('NEW RECORD !!');
                setTimeout(() => { fireOn2(); }, 5000);
            } else if (currentRecord < third) {
                localStorage.setItem('thirdPlace', currentRecord);
                recordAlert('NEW RECORD !');
                setTimeout(() => { fireOn(); }, 5000);
            }

            // ひみつリスト02 の初回確認用(最高評価)
            let ic_highestRating = localStorage.getItem('ic_highestRating');

            if (resultTime >= 120) { // 120秒以上
                // タイムが良くない場合のチート促進アナウンス用（3回ごと）
                sessionStorage.setItem('cheatPromotion', ++cheatPromotion);
                if (cheatPromotion == 3) {
                    str = 'どこかをコピーすると・・・';
                    cheat2Sound.play();
                    thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[8] + ')';
                    sessionStorage.setItem('cheatPromotion', '0');
                } else {
                    str = 'おわってるピヨ。';
                    worstSound.play();
                    thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[0] + ')';
                }
            } else if (resultTime >= 100) { // 100～120秒未満
                str = 'でなおしてこいッピ。';
                worseSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[1] + ')';
            } else if (resultTime >= 90) { // 90～100秒未満
                str = 'みょーん。みょーん。';
                badSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[2] + ')';
            } else if (resultTime >= 80) { // 80～90秒未満
                str = 'まじめにするッピ。';
                fairSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[3] + ')';
            } else if (resultTime >= 70) { // 70～80秒未満
                str = 'やればできるッピ。';
                goodSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[4] + ')';
            } else if (resultTime >= 60) { // 60～70秒未満
                str = 'なでなでするッピ。';
                betterSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[5] + ')';

            } else { // 60秒未満(最高評価)
                str = 'よーしよしよしよし。';
                bestSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[6] + ')';
                if (!ic_highestRating) {
                    localStorage.setItem('ic_highestRating', 'confirmed');
                    secretList_storage = secretList;
                    secretList_storage.discoveryStatus[0] = 'discovered';
                    secretList_json = JSON.stringify(secretList_storage);
                    localStorage.setItem('secretList', secretList_json);
                    setTimeout(() => { levelSound.play(); }, 8000);
                    setTimeout(() => { recordAlert('Secret List 02 : Discover !'); }, 8000);
                }
            }

        } else { // チートまたはイージーモードではレコードを登録しない処理
            if (cheatNumber == 9 && featherNumber == 9) {
                str = 'ズルしてたのしいッピ？';
                cheat3Sound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[9] + ')';
                message.textContent = str;
                localStorage.setItem('totalPlayCount', ++tpc);
                return;
            } else if (pairUnit != 15) {
                str = 'お遊びは評価しねーよ。';
                cheatSound.play();
                thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[10] + ')';
                message.textContent = str;
                localStorage.setItem('totalPlayCount', ++tpc);
                return;
            }
        }

    } else { // ストップボタンを使用していた場合はレコードを登録せずに終了
        str = 'ズルは判定しねーよ。';
        cheatSound.play();
        thirdObject.style.backgroundImage = 'url(./image/' + resultUrl[7] + ')';
        message.textContent = str;
        localStorage.setItem('totalPlayCount', ++tpc);
        return;
    }

    // タイムに応じた結果表示および総プレイ回数のカウント
    message.textContent = str;
    localStorage.setItem('totalPlayCount', ++tpc);
}

/* ------------------------------------------------ */

// Dialog 背景群
let backdropArray = [];
backdropArray[0] =
    ` background: repeating-conic-gradient(white 0, white 25%, #cbcbcb 25%, #cbcbcb 50%);
      background-repeat: space;
      background-position: center center;
      background-size: 20px 20px;`;
backdropArray[1] =
    ` background: radial-gradient(#16caca 20%, transparent 20%), radial-gradient(#beca16 20%, transparent 20%);
      background-repeat: round;
      background-position: 0 0, 20px 20px;
      background-size: 40px 40px;`;
backdropArray[2] =
    ` background: linear-gradient(-90deg, rgba(22, 22, 202, 0.25) 50%, transparent 50%), linear-gradient(rgba(22, 22, 202, 0.25) 50%, transparent 50%);
      background-repeat: space;
      background-size: 20px 20px;`;
backdropArray[3] =
    ` background:
        repeating-linear-gradient(-45deg, rgb(202, 22, 22, 0.25), rgb(202, 22, 22, 0.25) 10px, transparent 0, transparent 20px),
        repeating-linear-gradient(45deg, rgb(202, 22, 202, 0.25), rgb(202, 22, 202, 0.25) 10px, transparent 0, transparent 20px);`;
backdropArray[4] =
    ` background: linear-gradient(45deg, #EE7166, #EEE666, #81EE66, #66EEBF, #66A8EE, #9866EE, #EE66CF);`;
backdropArray[5] =
    ` background: repeating-conic-gradient(from 0deg,
      #EE7166 0deg 10deg,
      #EEE666 10deg 20deg,
      #81EE66 20deg 30deg,
      #66EEBF 30deg 40deg,
      #66A8EE 40deg 50deg,
      #9866EE 50deg 60deg,
      #EE66CF 60deg 70deg);`;
backdropArray[6] =
    ` background-image: url("./image/logo.png"), url("./image/logoIcon.png");
      background-repeat: no-repeat, space;
      background-position: center, left top;
      background-size: 60%, 8px;`;

// スタイルシートを作成する
const style = document.createElement('style');
document.head.appendChild(style);

// 疑似要素のスタイルを定義する
let pseudoStyle;
function backdropStyle(backdropNumber) {

    if (backdropNumber < 7) {
        pseudoStyle = '::backdrop {' + backdropArray[backdropNumber] + '}';
        style.sheet.insertRule(pseudoStyle);
    } else {
        // BACKDROP選択中にbodyへ出力しているcssと重複させないため、一旦unsetする
        const rule = style.sheet.cssRules[0];
        rule.style.background = 'unset';
    }
}

// CSSStyleDeclarationインターフェースを使うことで疑似要素のスタイルを動的に変更することができるが、
// スタイルシートに直接ルールを挿入するため、他のスタイルとの競合が発生する可能性がある。
// また、挿入したルールは動的に生成されるため、デバッグが難しくなる場合もある。

// スタイルシートを作成する
// const style = document.createElement('style');
// document.head.appendChild(style);

// 疑似要素のスタイルを定義する
// const pseudoStyle = `
//   ::backdrop {
//    background-image:
//         radial-gradient(#16caca 20%, transparent 20%),
//         radial-gradient(#beca16 20%, transparent 20%);
//     background-size: 40px 40px;
//     background-position: 0 0, 20px 20px;
//     opacity: 0.25;
//   }
// `;
// style.sheet.insertRule(pseudoStyle);

// 疑似要素のスタイルを変更する
// const rule = style.sheet.cssRules[0];
// rule.style.backgroundImage = 'radial-gradient(#16caca 20%, transparent 20%)';
// rule.style.opacity = '1';

// background(一括指定)の記述ルール
// 1. background-position / background-sizeの順に指定
// 2. background-sizeの値を指定する場合は、background-positionの値も指定
// ★最初か最後にまとめて書くと分かりやすい★

// window.onload = function () {}; が動かない原因は、上書きが発生しているから。
// 同じページ内で複数の window.onload が記述されている場合は、一つしか動作できない。
// DomContentLoaded の場合は、DOMツリー構築完了時に呼び出される。
// load の場合は、HTMLページに含まれる画像やスタイルシートなど、全てのリソースの読み込みが完了した時点で呼び出される。
// DomContentLoaded の方が速く呼び出されるため、画像の読み込みなどを待つ必要がなければ、こちらを利用する方が良い。
// また、addEventListener の load と window.onload は同じタイミングで実行されているため、そういった点からも window.onload の使用は損をしているともいえる。
// 結論：状況に応じて、以下から使い分ける
// document.addEventListener('DOMContentLoaded', function () {});
// window.addEventListener('load', function () {});

// dialog open (SECRET)
const square = document.getElementsByClassName('fa-square');
const squareCheck = document.getElementsByClassName('squareCheck');
const secretDialog = document.getElementById('secretDialog');

function openSecretList() {
    // リロードなし再クリックでも初回確認後の矛盾を防ぐため
    let ic_secretList = localStorage.getItem('ic_secretList');

    for (let i = 0; i < secretList.discoveryStatus.length; i++) {
        // console.log(i, secretList.discoveryStatus[i])
        if (secretList.discoveryStatus[i] == 'discovered') {
            square[i].style.display = 'none';
            squareCheck[i].innerHTML = '<i class="fa-regular fa-square-check"></i>';
        }
    }

    if (!ic_secretList) {
        localStorage.setItem('ic_secretList', 'confirmed');
        levelSound.play();
        const initialBlinking = document.getElementsByClassName('initialBlinking');
        initialBlinking[0].style.cssText = 'animation: blinking 1s ease-in-out alternate 9;';
        initialBlinking[1].style.cssText = 'animation: blinking 1s ease-in-out alternate 9;';
        recordAlert('Secret List 01 : Discover !');
        // recordAlert('Nice work finding it.');
        // リロードなし再クリックでも初回確認後の矛盾を防ぐため(テキスト点滅ストップ処理)
        setTimeout(() => { initialBlinking[0].style.cssText = 'animation: none'; }, 9000);
        setTimeout(() => { initialBlinking[1].style.cssText = 'animation: none'; }, 9000);
    }
    pushSound.play();
    secretDialog.showModal();
}

// dialog close (SECRET)
const secretElem = document.getElementById('secretDialog');
const secretClose = document.querySelector('.secretClose');
secretClose.addEventListener('click', () => {
    pushSound.play();
    secretElem.close();
});

// description alert
function descriptionAlert() {
    pushSound.play();
    if (cheating == 'true') {
        // グレイヴ・アクセント(バッククォート：逆引用符) ＝ テンプレートリテラル
        alert(`
            ずる を する とは なさけない！
            【ちきん】  ${localStorage.getItem('ic_uname')} よ。
            その あかし を ここに きざもう。`);
    } else if (getTrophy == 'true') {
        alert(`
            みごと な うでまえ だった ぞ！
            【しゃも】  ${localStorage.getItem('ic_uname')} よ。
            ぴえん すいじゃく ２ も よろしく。`);
    } else {
        alert(`
            これは ぴえん すいじゃく！
            【ひよっこ】  ${localStorage.getItem('ic_uname')} よ。
            すべて の ひみつ を みつけられる かな？`);
    }
    push1Sound.play();
}

// dialog open (BGM)
const bgmTitle = document.querySelectorAll('.bgmTitle');

function openBgm() {

    if (secretList_storage.discoveryStatus[3] == 'discovered' &&
        secretList_storage.discoveryStatus[4] == 'discovered' &&
        secretList_storage.discoveryStatus[5] == 'discovered') {
        bgmTitle[0].textContent = 'どらくえ';
        bgmTitle[1].textContent = 'まりお';
        bgmTitle[2].textContent = 'おじゃまじょ';
    } else if (secretList_storage.discoveryStatus[3] == 'discovered' && secretList_storage.discoveryStatus[4] == 'discovered') {
        bgmTitle[0].textContent = 'どらくえ';
        bgmTitle[1].textContent = 'まりお';
        bgmTitle[2].textContent = '？？？';
    } else if (secretList_storage.discoveryStatus[3] == 'discovered' && secretList_storage.discoveryStatus[5] == 'discovered') {
        bgmTitle[0].textContent = 'どらくえ';
        bgmTitle[1].textContent = '？？？';
        bgmTitle[2].textContent = 'おじゃまじょ';
    } else if (secretList_storage.discoveryStatus[4] == 'discovered' && secretList_storage.discoveryStatus[5] == 'discovered') {
        bgmTitle[0].textContent = '？？？';
        bgmTitle[1].textContent = 'まりお';
        bgmTitle[2].textContent = 'おじゃまじょ';
    } else if (secretList_storage.discoveryStatus[3] == 'discovered') {
        bgmTitle[0].textContent = 'どらくえ';
        bgmTitle[1].textContent = '？？？';
        bgmTitle[2].textContent = '？？？';
    } else if (secretList_storage.discoveryStatus[4] == 'discovered') {
        bgmTitle[0].textContent = '？？？';
        bgmTitle[1].textContent = 'まりお';
        bgmTitle[2].textContent = '？？？';
    } else if (secretList_storage.discoveryStatus[5] == 'discovered') {
        bgmTitle[0].textContent = '？？？';
        bgmTitle[1].textContent = '？？？';
        bgmTitle[2].textContent = 'おじゃまじょ';
    } else {
        bgmTitle[0].textContent = '？？？';
        bgmTitle[1].textContent = '？？？';
        bgmTitle[2].textContent = '？？？';
    }
    pushSound.play();
    const bgmDialog = document.getElementById('bgmDialog');
    bgmDialog.showModal();
}

// dialog close (BGM)
const bgmElem = document.getElementById('bgmDialog');
const bgmClose = document.querySelector('.bgmClose');
bgmClose.addEventListener('click', () => {
    pushSound.play();
    bgmElem.close();
});

// モーダル範囲外のクリックでクローズする処理
// ダイアログのクリックイベントの中で、closest()を使ってクリック位置の祖先要素を取得し、bgmCloseでなければダイアログを閉じる
// bgmElem.addEventListener('click', (event) => {
//     if (event.target.closest('.bgmClose') === null) {
//         bgmElem.close();
//     }
// });

// dialog open (BACKDROP)
const backdropTitle = document.querySelectorAll('.backdropTitle');

function openBackdrop() {

    if (secretList_storage.discoveryStatus[3] == 'discovered' &&
        secretList_storage.discoveryStatus[4] == 'discovered' &&
        secretList_storage.discoveryStatus[5] == 'discovered') {
        backdropTitle[0].textContent = 'れいんぼー';
        backdropTitle[1].textContent = 'れいんぼー２';
        backdropTitle[2].textContent = 'すぺしゃる';
    } else if (secretList_storage.discoveryStatus[3] == 'discovered' && secretList_storage.discoveryStatus[4] == 'discovered') {
        backdropTitle[0].textContent = 'れいんぼー';
        backdropTitle[1].textContent = 'れいんぼー２';
        backdropTitle[2].textContent = '？？？';
    } else if (secretList_storage.discoveryStatus[3] == 'discovered' && secretList_storage.discoveryStatus[5] == 'discovered') {
        backdropTitle[0].textContent = 'れいんぼー';
        backdropTitle[1].textContent = '？？？';
        backdropTitle[2].textContent = 'すぺしゃる';
    } else if (secretList_storage.discoveryStatus[4] == 'discovered' && secretList_storage.discoveryStatus[5] == 'discovered') {
        backdropTitle[0].textContent = '？？？';
        backdropTitle[1].textContent = 'れいんぼー２';
        backdropTitle[2].textContent = 'すぺしゃる';
    } else if (secretList_storage.discoveryStatus[3] == 'discovered') {
        backdropTitle[0].textContent = 'れいんぼー';
        backdropTitle[1].textContent = '？？？';
        backdropTitle[2].textContent = '？？？';
    } else if (secretList_storage.discoveryStatus[4] == 'discovered') {
        backdropTitle[0].textContent = '？？？';
        backdropTitle[1].textContent = 'れいんぼー２';
        backdropTitle[2].textContent = '？？？';
    } else if (secretList_storage.discoveryStatus[5] == 'discovered') {
        backdropTitle[0].textContent = '？？？';
        backdropTitle[1].textContent = '？？？';
        backdropTitle[2].textContent = 'すぺしゃる';
    } else {
        backdropTitle[0].textContent = '？？？';
        backdropTitle[1].textContent = '？？？';
        backdropTitle[2].textContent = '？？？';
    }
    pushSound.play();
    bgmElem.close(); // 二重モーダルになるためクローズしておく
    const backdropDialog = document.getElementById('backdropDialog');
    backdropDialog.showModal();
}

/// dialog close (BACKDROP)
const loadingDialog = document.getElementById('loadingDialog');
const backdropElem = document.getElementById('backdropDialog');
// querySelector で単一オブジェクト(HTMLElement)として取得 → 例えば、getElementsByClassName では HTMLCollection(動的)であるため addEventListener が使えない
const backdropClose = document.querySelector('.backdropClose');
backdropClose.addEventListener('click', () => {
    pushSound.play();
    loadingDialog.showModal();
    backdropElem.close();
    setTimeout(() => { loadingDialog.close(); }, 1000);
    setTimeout(() => { location.reload(); }, 1250);

});

// dialog open (SELECT PAIR)
function openPair() {
    pushSound.play();
    const pairDialog = document.getElementById('pairDialog');
    pairDialog.showModal();
}

// dialog close (SELECT PAIR)
const pairElem = document.getElementById('pairDialog');
const pairClose = document.querySelector('.pairClose');
pairClose.addEventListener('click', () => {
    pushSound.play();
    pairElem.close();
});

// ペア数セレクト関数
const blockNumber3 = document.getElementById('blockNumber3');
const blockNumber5 = document.getElementById('blockNumber5');
const blockNumber7 = document.getElementById('blockNumber7');
const blockNumberAnimation = 'animation: blockNumberRotate .25s linear;';

function three() {
    coinSound.play();
    blockNumber3.style.cssText = blockNumberAnimation;
    pairUnit = sessionStorage.setItem('pairUnit', '3');
    pairElem.style.pointerEvents = 'none';
    setTimeout(() => { pairElem.style.pointerEvents = 'auto'; }, 1500);
    setTimeout(() => { location.reload(); }, 1500);
}

function five() {
    coinSound.play();
    blockNumber5.style.cssText = blockNumberAnimation;
    pairUnit = sessionStorage.setItem('pairUnit', '5');
    pairElem.style.pointerEvents = 'none';
    setTimeout(() => { pairElem.style.pointerEvents = 'auto'; }, 1500);
    setTimeout(() => { location.reload(); }, 1500);
}

function seven() {
    coinSound.play();
    blockNumber7.style.cssText = blockNumberAnimation;
    pairUnit = sessionStorage.setItem('pairUnit', '7');
    pairElem.style.pointerEvents = 'none';
    setTimeout(() => { pairElem.style.pointerEvents = 'auto'; }, 1500);
    setTimeout(() => { location.reload(); }, 1500);
}

function fifteen() {
    push3Sound.play();
    pairUnit = sessionStorage.setItem('pairUnit', '15');
    pairElem.style.pointerEvents = 'none';
    setTimeout(() => { pairElem.style.pointerEvents = 'auto'; }, 2000);
    setTimeout(() => { mushroomSound.play(); }, 200);
    setTimeout(() => { location.reload(); }, 2000);
}

// 初回発見確認およびメッセージ付与 dialog open (RECORD)
let ic_tpc = localStorage.getItem('ic_tpc');
let ic_lso = localStorage.getItem('ic_lso');
let recordMessage = '';

// 小数点第二位まで表示させる関数（33.5 → 33.50）
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

function openRecord() {
    // ローカルストレージのレコードを表示
    pushSound.play();
    firstDisplay.textContent = financial(localStorage.getItem('firstPlace'));
    secondDisplay.textContent = financial(localStorage.getItem('secondPlace'));
    thirdDisplay.textContent = financial(localStorage.getItem('thirdPlace'));

    if (cheatNumber == 9 && featherNumber == 9 && secretList_storage.discoveryStatus[0] == 'discovered') {
        // 総プレイ回数を表示
        tpcDisplay.style.visibility = 'visible';
        tpcTimesDisplay.style.visibility = 'visible';
        setTimesDisplay.textContent = localStorage.getItem('totalPlayCount');

        if (secretList_storage.discoveryStatus[0] == 'discovered' &&
            secretList_storage.discoveryStatus[1] == 'discovered' &&
            secretList_storage.discoveryStatus[2] == 'discovered' &&
            secretList_storage.discoveryStatus[3] == 'discovered' &&
            secretList_storage.discoveryStatus[4] == 'discovered' &&
            secretList_storage.discoveryStatus[5] == 'discovered' &&
            secretList_storage.discoveryStatus[6] == 'discovered' &&
            secretList_storage.discoveryStatus[7] == 'discovered') {
            recordMessage = 'The Last Secret Opened...';

            if (lastSecret == 'true') {
                recordMessage = '';
            } else {
                if (!ic_lso) {
                    localStorage.setItem('ic_lso', 'confirmed');
                    pushAlert();
                }
            }

        } else if (
            secretList_storage.discoveryStatus[0] == 'discovered' &&
            secretList_storage.discoveryStatus[1] == 'discovered' &&
            secretList_storage.discoveryStatus[2] == 'discovered' &&
            secretList_storage.discoveryStatus[3] == 'discovered' &&
            secretList_storage.discoveryStatus[4] == 'discovered' &&
            secretList_storage.discoveryStatus[5] == 'discovered' &&
            secretList_storage.discoveryStatus[6] == 'discovered') {
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[7] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
            levelSound.play();
            recordAlert('Secret List 09 : Discover !');
            setTimeout(() => { recordAlert('© 2025 STRUNKS'); }, 5000);

        } else if (!ic_tpc) {
            localStorage.setItem('ic_tpc', 'confirmed');
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[6] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
            levelSound.play();
            recordAlert('Secret List 08 : Discover !')
            setTimeout(() => { recordAlert('Displays Total Play Count.'); }, 5000);

        } else {
            recordMessage = 'Thanks for playing a lot !';
        }
    }
    // 付与されたメッセージ ＆ ダイアログ表示
    recordAlert(recordMessage);
    const recordDialog = document.getElementById('recordDialog');
    recordDialog.showModal();
}

// dialog close (RECORD)
const recordElem = document.getElementById('recordDialog');
const recordClose = document.querySelector('.recordClose');
recordClose.addEventListener('click', () => {
    pushSound.play();
    recordElem.close();
});

// サンプル１ ～ Array.prototype.forEach()
// document.querySelectorAll('#bgmDialog .bbSelect').forEach(function (element, index) {
//     element.addEventListener('mouseover', function () {

// サンプル２ ～ forEach アロー関数 ver.
// document.querySelectorAll('#bgmDialog .bbSelect').forEach((element, index) => element.addEventListener('mouseover', function () {
//     if (index === 0) {
//         bbRights[0].style.opacity = 1;
//         heaven_and_hell.play();
//         heaven_and_hell.currentTime = 0;
//     } else if (index === 1) {
//         bbRights[1].style.opacity = 1;
//         william_tell.play();
//         william_tell.currentTime = 0;
//     } else if (index === 2) {
//         bbRights[2].style.opacity = 1;
//         inferno_strongest.play();
//         inferno_strongest.currentTime = 0;
//     } else if (index === 3) {
//         bbRights[3].style.opacity = 1;
//         monster_humming.play();
//         monster_humming.currentTime = 0;
//     } else if (index === 4) {
//         if (secretList_storage.discoveryStatus[3] == 'discovered') {
//             bbRights[4].style.opacity = 1;
//             dq_battle.play();
//             dq_battle.currentTime = 0;
//         } else {
//             missSound.play();
//             return;
//         }
//     } else if (index === 5) {
//         if (secretList_storage.discoveryStatus[4] == 'discovered') {
//             bbRights[5].style.opacity = 1;
//             sm_run.play();
//             sm_run.currentTime = 0;
//         } else {
//             missSound.play();
//             return;
//         }
//     } else if (index === 6) {
//         if (secretList_storage.discoveryStatus[5] == 'discovered') {
//             bbRights[6].style.opacity = 1;
//             oj_witch.play();
//             oj_witch.currentTime = 0;
//         } else {
//             missSound.play();
//             return;
//         }
//     } else {
//         return;
//     }
//     // 共通処理
//     cursorSound.play();
// }));

// サンプル３ ～ for...of
// Array.prototype.entries() は配列用メソッドのため、HTMLCollection (配列風) のままでは使えない
// ここではスプレッド構文 (Spread syntax) を使用して配列に変換する (Array.from よりも可読性〇)

// const bgmSelects = [...document.getElementById('bgmDialog').getElementsByClassName('bbSelect')];
// for (const [i] of bgmSelects.entries()) {
//     bgmSelects[i].addEventListener('mouseover', function () {
//         if (i === 0) {
//             bbRights[0].style.opacity = 1;
//             heaven_and_hell.play();
//             heaven_and_hell.currentTime = 0;
//         } else if (i === 1) {
//             bbRights[1].style.opacity = 1;
//             william_tell.play();
//             william_tell.currentTime = 0;
//         } else if (i === 2) {
//             bbRights[2].style.opacity = 1;
//             inferno_strongest.play();
//             inferno_strongest.currentTime = 0;
//         } else if (i === 3) {
//             bbRights[3].style.opacity = 1;
//             monster_humming.play();
//             monster_humming.currentTime = 0;
//         } else if (i === 4) {
//             if (secretList_storage.discoveryStatus[3] == 'discovered') {
//                 bbRights[4].style.opacity = 1;
//                 dq_battle.play();
//                 dq_battle.currentTime = 0;
//             } else {
//                 missSound.play();
//                 return;
//             }
//         } else if (i === 5) {
//             if (secretList_storage.discoveryStatus[4] == 'discovered') {
//                 bbRights[5].style.opacity = 1;
//                 sm_run.play();
//                 sm_run.currentTime = 0;
//             } else {
//                 missSound.play();
//                 return;
//             }
//         } else if (i === 6) {
//             if (secretList_storage.discoveryStatus[5] == 'discovered') {
//                 bbRights[6].style.opacity = 1;
//                 oj_witch.play();
//                 oj_witch.currentTime = 0;
//             } else {
//                 missSound.play();
//                 return;
//             }
//         } else {
//             return;
//         }
//         // 共通処理
//         cursorSound.play();
//     })
// };

// ここから実装
// ドラクエ風カーソルおよび音・背景の変更 (BGM & BACKDROP)
const bbRights = document.getElementsByClassName('bbRight');
const bbSelects = document.getElementsByClassName('bbSelect');
const bbArr = Array.from(bbSelects); // 配列の要素数：14
const bbLen = bbArr.length;

// dialog BGM for mouseover
for (let i = 0; i < 7; i++) {
    bbArr[i].addEventListener('mouseover', function () {
        if (i === 0) {
            bbRights[0].style.opacity = 1;
            heaven_and_hell.play();
            heaven_and_hell.currentTime = 0;
        } else if (i === 1) {
            bbRights[1].style.opacity = 1;
            william_tell.play();
            william_tell.currentTime = 0;
        } else if (i === 2) {
            bbRights[2].style.opacity = 1;
            inferno_strongest.play();
            inferno_strongest.currentTime = 0;
        } else if (i === 3) {
            bbRights[3].style.opacity = 1;
            monster_humming.play();
            monster_humming.currentTime = 0;
        } else if (i === 4) {
            if (secretList_storage.discoveryStatus[3] == 'discovered') {
                bbRights[4].style.opacity = 1;
                dq_battle.play();
                dq_battle.currentTime = 0;
            } else {
                missSound.play();
                return;
            }
        } else if (i === 5) {
            if (secretList_storage.discoveryStatus[4] == 'discovered') {
                bbRights[5].style.opacity = 1;
                sm_run.play();
                sm_run.currentTime = 0;
            } else {
                missSound.play();
                return;
            }
        } else if (i === 6) {
            if (secretList_storage.discoveryStatus[5] == 'discovered') {
                bbRights[6].style.opacity = 1;
                oj_witch.play();
                oj_witch.currentTime = 0;
            } else {
                missSound.play();
                return;
            }
        } else {
            return;
        }
        // 共通処理
        cursorSound.play();
    })
};

// dialog BGM for mouseleave
for (let i = 0; i < 7; i++) {
    bbArr[i].addEventListener('mouseleave', function () {
        if (i === 0) {
            bbRights[0].style.opacity = 0;
            heaven_and_hell.pause();
        } else if (i === 1) {
            bbRights[1].style.opacity = 0;
            william_tell.pause();
        } else if (i === 2) {
            bbRights[2].style.opacity = 0;
            inferno_strongest.pause();
        } else if (i === 3) {
            bbRights[3].style.opacity = 0;
            monster_humming.pause();
        } else if (i === 4) {
            bbRights[4].style.opacity = 0;
            dq_battle.pause();
        } else if (i === 5) {
            bbRights[5].style.opacity = 0;
            sm_run.pause();
        } else if (i === 6) {
            bbRights[6].style.opacity = 0;
            oj_witch.pause();
        } else {
            return;
        }
        // 共通処理
    })
};

// dialog BACKDROP for mouseover
for (let i = 7; i < bbLen; i++) {
    bbArr[i].addEventListener('mouseover', function () {
        if (i === 7) {
            bbRights[7].style.opacity = 1;
            document.body.style.cssText =
                ` background: repeating-conic-gradient(white 0, white 25%, #cbcbcb 25%, #cbcbcb 50%);
                  background-repeat: space;
                  background-position: center center;
                  background-size: 20px 20px;
                  opacity: 0;`;
        } else if (i === 8) {
            bbRights[8].style.opacity = 1;
            document.body.style.cssText =
                ` background: radial-gradient(#16caca 20%, transparent 20%), radial-gradient(#beca16 20%, transparent 20%);
                  background-repeat: round;
                  background-position: 0 0, 20px 20px;
                  background-size: 40px 40px;
                  opacity: 0;`;
        } else if (i === 9) {
            bbRights[9].style.opacity = 1;
            document.body.style.cssText =
                ` background: linear-gradient(-90deg, rgba(22, 22, 202, 0.25) 50%, transparent 50%), linear-gradient(rgba(22, 22, 202, 0.25) 50%, transparent 50%);
                  background-repeat: space;
                  background-size: 20px 20px;
                  opacity: 0;`;
        } else if (i === 10) {
            bbRights[10].style.opacity = 1;
            document.body.style.cssText =
                ` background:
                    repeating-linear-gradient(-45deg, rgb(202, 22, 22, 0.25), rgb(202, 22, 22, 0.25) 10px, transparent 0, transparent 20px),
                    repeating-linear-gradient(45deg, rgb(202, 22, 202, 0.25), rgb(202, 22, 202, 0.25) 10px, transparent 0, transparent 20px);
                  opacity: 0;`;
        } else if (i === 11) {
            if (secretList_storage.discoveryStatus[3] == 'discovered') {
                bbRights[11].style.opacity = 1;
                document.body.style.cssText =
                    ` background: linear-gradient(45deg, #EE7166, #EEE666, #81EE66, #66EEBF, #66A8EE, #9866EE, #EE66CF);
                      opacity: 0;`;
            } else {
                missSound.play();
                return;
            }
        } else if (i === 12) {
            if (secretList_storage.discoveryStatus[4] == 'discovered') {
                bbRights[12].style.opacity = 1;
                document.body.style.cssText =
                    ` background: repeating-conic-gradient(from 0deg,
                      #EE7166 0deg 10deg,
                      #EEE666 10deg 20deg,
                      #81EE66 20deg 30deg,
                      #66EEBF 30deg 40deg,
                      #66A8EE 40deg 50deg,
                      #9866EE 50deg 60deg,
                      #EE66CF 60deg 70deg);
                      opacity: 0;`;
            } else {
                missSound.play();
                return;
            }
        } else if (i === 13) {
            if (secretList_storage.discoveryStatus[5] == 'discovered') {
                bbRights[13].style.opacity = 1;
                document.body.style.cssText =
                    ` background-image: url("./image/logo.png"), url("./image/logoIcon.png");
                      background-repeat: no-repeat, space;
                      background-position: center, left top;
                      background-size: 60%, 8px;
                      opacity: 0;`;
            } else {
                missSound.play();
                return;
            }
        } else {
            return;
        }
        // 共通処理
        cursorSound.play();
        backdropStyle(99);
    })
};

// dialog BACKDROP for mouseleave
for (let i = 7; i < bbLen; i++) {
    bbArr[i].addEventListener('mouseleave', function () {
        if (i === 7) {
            bbRights[7].style.opacity = 0;
            heaven_and_hell.pause();
        } else if (i === 8) {
            bbRights[8].style.opacity = 0;
            william_tell.pause();
        } else if (i === 9) {
            bbRights[9].style.opacity = 0;
            inferno_strongest.pause();
        } else if (i === 10) {
            bbRights[10].style.opacity = 0;
            monster_humming.pause();
        } else if (i === 11) {
            bbRights[11].style.opacity = 0;
            dq_battle.pause();
        } else if (i === 12) {
            bbRights[12].style.opacity = 0;
            sm_run.pause();
        } else if (i === 13) {
            bbRights[13].style.opacity = 0;
            oj_witch.pause();
        } else {
            return;
        }
        // 共通処理
        document.body.style.cssText = 'unset';
    })
};

// dialog BGM for click
for (let i = 0; i < 7; i++) {
    bbArr[i].addEventListener('click', function () {
        if (i === 0) {
            localStorage.setItem('bgmNumber', i);
        } else if (i === 1) {
            localStorage.setItem('bgmNumber', i);
        } else if (i === 2) {
            localStorage.setItem('bgmNumber', i);
        } else if (i === 3) {
            localStorage.setItem('bgmNumber', i);
        } else if (i === 4) {
            if (secretList_storage.discoveryStatus[3] == 'discovered') {
                localStorage.setItem('bgmNumber', i);
            } else {
                missSound.play();
                return;
            }
        } else if (i === 5) {
            if (secretList_storage.discoveryStatus[4] == 'discovered') {
                localStorage.setItem('bgmNumber', i);
            } else {
                missSound.play();
                return;
            }
        } else if (i === 6) {
            if (secretList_storage.discoveryStatus[5] == 'discovered') {
                localStorage.setItem('bgmNumber', i);
            } else {
                missSound.play();
                return;
            }
        } else {
            return;
        }
        // 共通処理
        bgmDialog.style.pointerEvents = 'none';
        setTimeout(() => { bgmDialog.style.pointerEvents = 'auto'; }, 1000);
        setTimeout(() => { location.reload(); }, 1000);
    })
};

// dialog BACKDROP for click
for (let i = 7; i < bbLen; i++) {
    bbArr[i].addEventListener('click', function () {
        if (i === 7) {
            localStorage.setItem('backdropNumber', 0);
        } else if (i === 8) {
            localStorage.setItem('backdropNumber', 1);
        } else if (i === 9) {
            localStorage.setItem('backdropNumber', 2);
        } else if (i === 10) {
            localStorage.setItem('backdropNumber', 3);
        } else if (i === 11) {
            if (secretList_storage.discoveryStatus[3] == 'discovered') {
                localStorage.setItem('backdropNumber', 4);
            } else {
                missSound.play();
                return;
            }
        } else if (i === 12) {
            if (secretList_storage.discoveryStatus[4] == 'discovered') {
                localStorage.setItem('backdropNumber', 5);
            } else {
                missSound.play();
                return;
            }
        } else if (i === 13) {
            if (secretList_storage.discoveryStatus[5] == 'discovered') {
                localStorage.setItem('backdropNumber', 6);
            } else {
                missSound.play();
                return;
            }
        } else {
            return;
        }
        // 共通処理
        backdropDialog.style.pointerEvents = 'none';
        setTimeout(() => { backdropDialog.style.pointerEvents = 'auto'; }, 1000);
        setTimeout(() => { location.reload(); }, 1000);
    })
};

// ここまでの処理を for文などを使用せずに実装する場合は、以下のように一つ一つ (index：0～13まで) 記述していくことになるためコード量が増える

// ↓ BGMエリア (mouseover & mouseleave & click)
// bbSelects[0].addEventListener('mouseover', function () {
//     cursorSound.play();
//     heaven_and_hell.play();
//     heaven_and_hell.currentTime = 0;
//     bbRights[0].style.opacity = 1;
// });

// bbSelects[0].addEventListener('mouseleave', function () {
//     heaven_and_hell.pause();
//     bbRights[0].style.opacity = 0;
// });

// bbSelects[6].addEventListener('click', function () {
//     if (secretList_storage.discoveryStatus[5] == 'discovered') {
//         sessionStorage.setItem('bgmNumber', '6');
//         bgmDialog.style.pointerEvents = 'none';
//         setTimeout(() => { bgmDialog.style.pointerEvents = 'auto'; }, 1000);
//         setTimeout(() => { location.reload(); }, 1000);
//     } else {
//         missSound.play();
//     }
// });

// ↓ BACKDROPエリア (mouseover & mouseleave & click)
// bbSelects[13].addEventListener('mouseover', function () {
//     if (secretList_storage.discoveryStatus[5] == 'discovered') {
//         cursorSound.play();
//         backdropStyle(99);
//         document.body.style.cssText =
//             ` background-image: url("./image/logo.png"), url("./image/logoIcon.png");
//               background-repeat: no-repeat, space;
//               background-position: center, left top;
//               background-size: 60%, 8px;
//               opacity: 0;`;
//         bbRights[13].style.opacity = 1;
//     } else {
//         missSound.play();
//     }
// });

// bbSelects[13].addEventListener('mouseleave', function () {
//     document.body.style.cssText = 'unset';
//     bbRights[13].style.opacity = 0;
// });

// bbSelects[7].addEventListener('click', function () {
//     sessionStorage.setItem('backdropNumber', '0');
//     backdropDialog.style.pointerEvents = 'none';
//     setTimeout(() => { backdropDialog.style.pointerEvents = 'auto'; }, 1000);
//     setTimeout(() => { location.reload(); }, 1000);
// });

// BGM & BACKDROP 決定時の効果音
for (let i = 0; i < bbLen; i++) {
    bbArr[i].addEventListener('click', function () {

        if (i < 4 || i > 6 && i < 11) {
            // 共通処理へ
        } else if (i === 4 || i === 11) {
            if (secretList_storage.discoveryStatus[3] == 'discovered') {
                // 共通処理へ
            } else {
                missSound.play();
                return;
            }
        } else if (i === 5 || i === 12) {
            if (secretList_storage.discoveryStatus[4] == 'discovered') {
                // 共通処理へ
            } else {
                missSound.play();
                return;
            }
        } else if (i === 6 || i === 13) {
            if (secretList_storage.discoveryStatus[5] == 'discovered') {
                // 共通処理へ
            } else {
                missSound.play();
                return;
            }
        } else {
            return;
        }
        // 共通処理
        push2Sound.play();
    })
};

// ------------------------------------------------------------------------------------

// ※ 空 for文は冗長ではあるが、外部変数を反復処理できることには注意
// let a;
// let b = 0;
// for (a = 0; a < 10; b += a++) { }
// console.log("b = " + b); // 結果： b = 45

// ------------------------------------------------------------------------------------

// ループ文( for...of )

// 要素出力
// for (const element of bbArr) {
//     console.log(element);
// }

// 添字 ＆ 要素出力１
// let i = 0;
// for (const element of bbArr) {
//     console.log(i, element);
//     i++;
// }

// 添字 ＆ 要素出力２_１(entriesメソッド)
// for (const [i, element] of bbArr.entries()) {
//     console.log(i, element);
// }

// 添字 ＆ 要素出力２_２(entriesメソッド)
// const bbEntries = bbArr.entries();
// for (const element of bbEntries) {
//     console.log(element);
// }

// ------------------------------------------------------------------------------------

// ループ文( for...in ) ※非推奨

// プロトタイプチェーン全体を反復処理するため、望んだ結果になることは殆どない
// 継承されているプロトタイプチェーンのプロパティもループする → つまり、バグになりやすい部分
// 最も実用的な用途は、デバッグで (コンソールに出力するなどして) オブジェクトのプロパティを調べること

// 要素出力
// for (const element in bbArr) {
//     console.log(bbArr[element]);
// }

// 添字出力
// for (const element in bbArr) {
//     console.log(element);
// }

// for...in 文は、オブジェクトの全ての列挙可能なプロパティに対して、順序不定で繰り返し処理を行う
// for...of 文は、反復可能なオブジェクトが定義した順序で値を反復処理する

// ------------------------------------------------------------------------------------

// Array.prototype.forEach()

// for文と異なり、要素の参照順序が定義されないことがある
// forEach() は途中で止めることができない　→ 例外が発生する以外の方法で forEach() ループを止めたり脱出したりすることはできない
// forEach() 内で非同期処理はできない　　　→ forEach() は同期関数を期待します (プロミスを待ちません)

// ------------------------------------------------------------------------------------

// サンプル ～ BGM & BACKDROP 決定時の効果音

// (スプレッド構文)
// const selects = [...document.getElementsByClassName('bbSelect')];
// selects.forEach(v => v.addEventListener('click', function () {
//     push2Sound.play();
// }));

// (getElementsByClassName)
// let selects = document.getElementsByClassName('bbSelect');
// selects = Array.from(selects); // getElementsByClassName は HTMLCollection のため配列に変換する (let で宣言しているのは const(定数)への代入(配列への変換)はできないため)
// selects.forEach(v => v.addEventListener('click', function () {
//     push2Sound.play();
// }));

// (querySelectorAll) 例：「.bbSelect」 または 「.sampleSelect(例題用)」 
// document.querySelectorAll('.bbSelect, .sampleSelect').forEach(v => v.addEventListener('click', function () {
//     push2Sound.play();
// }));

// ------------------------------------------------------------------------------------

// querySelectorAll()メソッドは、指定された CSS セレクターに一致する文書中の要素のリストを示す静的な（生きていない）NodeList を返す。
// NodeList は Array とは異なるが、forEach()メソッドで処理を反復適用することは可能。Array.from() を使うことで Array に変換することができる。

// getElementsByClassName()メソッド は HTMLCollection（arguments のような配列風のオブジェクト）である。
// HTMLCollection は生きて (live) いるため、元になった文書が変更された時点で自動的に更新される。
// このため、ノードを追加、変更、削除する場合はコピーを（Array.from などを使用して）作成しておくといい。
// 「配列風」とは、 arguments が length プロパティと 0 から始まる添字のプロパティを持っているものの、 Array の組込みメソッド、例えば forEach() や map() を使えないということ。
// 配列風オブジェクトは Array.from()メソッド や スプレッド (...)構文 を使用することで、 arguments を本当の配列に変換することができる。

//      メソッド	                取得できるオブジェクト
// querySelector()	             HTMLElement    (単一)
// querySelectorAll()	         NodeList       (複数：静的)
// getElementById()	             HTMLElement    (単一)
// getElementsByTagName()	     HTMLCollection (複数：動的)
// getElementsByClassName()	     HTMLCollection (複数：動的)

// Node.childNodes で取得できる NodeList は動的だが、querySelectorAll で取得できるのは静的な NodeList になる。
// 動的な NodeListは、Webページを構成する Node をいわば参照している状態であり document の変更が即時反映される。
// 一方静的な NodeList は、取得したタイミングの Node を複製した状態であり、document に変更が加わろうと参照していないため影響を受けない。
// また、HTMLCollection は常に動的であり document が変更された時点で自動的に更新される。
// 参照して(動的：生きて)いるか、複製して(静的：死んで)いるかの違いに注意が必要。

// 動的である HTMLCollection は、ページを表現する DOM にリアルタイムに接続したオブジェクトであり、経由して行われた変更は即時反映される。
// 動的ではない NodeList は生成した段階の DOM がコピーされるイメージで、データを変更してもほかの NodeList には影響を与えず完全に独立している状態。

// 動的：Webページを構成する Node を参照（シャローコピー）
// 静的：Webページを構成する Node を複製（ディープコピー）

// 速度の違いもあり、静的な NodeList は最初から全てのデータを保持する必要があるのに対し、HTMLCollection は全ての情報を事前に保持する必要がないため、ブラウザでより速く作成して返すことができる。

//         メソッド 	         時間/ms           	倍率
// getElementsByClassName	1.18115234375 ms	    1
// getElementById	        1.527099609375 ms	    1.29
// getElementsByTagName	    1.55908203125 ms	    1.32
// querySelector(id)	    2.656005859375 ms	    2.25
// querySelector(class)	    7.383056640625 ms	    6.25
// querySelectorAll	        9.1640625 ms	        7.76

// まとめ
// 取得できるオブジェクトが違う。動的か静的かで取り扱いが変わる。
// 複雑な指定は cssセレクタが扱える querySelectorAll だが、速度は遅い。
// HTMLCollection     複数の要素の集合体であり、動的である
// NodeList           複数のノードの集合体であり、動的と静的の2種類がある
// ● 取得できる要素が違う( HTMLCollection は div といった要素のみに対し、NodeList は div やテキストといった要素を含むノード全てを対象にしている)
// ● 用意されているメソッドやプロパティが違う

// ------------------------------------------------------------------------------------

// ★ DOM (Document Object Model：文書を物として扱うモデル)
//    HTML や XML ドキュメントを取り扱うための API (プログラムからドキュメントを自由に操作するための仕組み・定義のこと)
//    DOM を使用することで JavaScript などのプログラミング言語を使用し、様々な処理を行うことができる
//    DOMツリー(またはドキュメントツリー) → 文書の構成要素を木構造で表したもの

// <body>
// ├──<section>
// │ ├──<p>
// │ ├──<p>
// │ └──<p>
// ├──<section>
// │ └─<p>
// ...

// ★ Node (節)
//    DOM ではドキュメントを構成する一つ一つのオブジェクトのことを「ノード」と呼ぶ
//    ノードは種類に応じて「要素ノード」「テキストノード」「属性ノード」などに分類される
//    各ノードにはツリーの位置に応じた親子・兄弟関係が存在する
//    DOM の中では要素と要素の間に空白やタブ、改行文字がある場合は「空白ノード」として扱われるため注意

// <ノード>
// ├──<親ノード>  （兄弟ノード）
// │ ├──<子ノード>
// │ ├──<子ノード>
// │ └──<子ノード>
// ├──<親ノード>  （兄弟ノード）
// │ └─<子ノード>
// ...

// ★ Element (要素)
//    Nodeの一種であり、構成単位となる個々の要素のこと
//    Document、Element、DocumentFragmentといったものが Nodeの種類として該当し、それぞれ異なるメソッドが定義されている
//    Elementは全ての要素オブジェクトの元となる最も一般的な基本クラスで、HTMLInputElementを始めとしたさまざまな種類に細分化される

// ------------------------------------------------------------------------------------

// デリートボタンの王冠絵文字の表示・非表示 (ホバーON/OFF)
const crownBtn = document.getElementById('crownBtn');
const crownPictograph = document.getElementById('crownPictograph');

crownBtn.addEventListener('mouseover', function () {
    crownPictograph.style.opacity = 1;
});
crownBtn.addEventListener('mouseleave', function () {
    crownPictograph.style.opacity = 0;
});

// レコード削除関数 <a class="btn btn-press" id="crownBtn" onclick="deleteRecord(event)"> (HTML記述)
function deleteRecord(event) {
    push3Sound.play();
    // キー同時押下 (Alt + Shift + Click) によるイベント(PC限定)
    if (event.altKey && event.shiftKey) {
        if (confirm('すべて の きろく を りせっと するぞ？')) {
            curseSound.play();
            localStorage.setItem('firstPlace', JSON.parse(77.77));
            localStorage.setItem('secondPlace', JSON.parse(88.88));
            localStorage.setItem('thirdPlace', JSON.parse(99.99));

            localStorage.removeItem('secretList');
            localStorage.removeItem('totalPlayCount');
            localStorage.removeItem('bgmNumber');
            localStorage.removeItem('backdropNumber');
            localStorage.removeItem('secretNumber');
            localStorage.removeItem('lastSecret');
            localStorage.removeItem('getTrophy');
            localStorage.removeItem('cheating');

            localStorage.removeItem('ic_uname');
            localStorage.removeItem('ic_push');
            localStorage.removeItem('ic_highestRating');
            localStorage.removeItem('ic_secretList');
            localStorage.removeItem('ic_featherFour');
            localStorage.removeItem('ic_tpc');
            localStorage.removeItem('ic_lso');
            localStorage.removeItem('ic_bgmChangeBlue');
            localStorage.removeItem('ic_bgmChangeRed');
            localStorage.removeItem('ic_bgmChangeBlack');

            sessionStorage.removeItem('pairUnit');
            sessionStorage.removeItem('featherNumber');
            sessionStorage.removeItem('cheatNumber');
            sessionStorage.removeItem('cheatPromotion');

            recordElem.style.pointerEvents = 'none';
            setTimeout(() => { recordElem.style.pointerEvents = 'auto'; }, 3000);
            setTimeout(() => { location.reload(); }, 3000);
        } else {
            push4Sound.play();
        }

    } else {
        if (confirm('らんきんぐ を りせっと するぞ？')) {
            curseSound.play();
            localStorage.setItem('firstPlace', JSON.parse(77.77));
            localStorage.setItem('secondPlace', JSON.parse(88.88));
            localStorage.setItem('thirdPlace', JSON.parse(99.99));
            recordElem.style.pointerEvents = 'none';
            setTimeout(() => { recordElem.style.pointerEvents = 'auto'; }, 3000);
            setTimeout(() => { location.reload(); }, 3000);
            // スーパーリロードの実装が面倒なため下記のような方法はパス
            // localStorage.removeItem("firstPlace");
            // localStorage.removeItem("secondPlace");
            // localStorage.removeItem("thirdPlace");
        } else {
            push4Sound.play();
        }
    }
}

// dialog open & close (COMPLETED)
const completedDialog = document.getElementById('completedDialog');
const closeBtn = document.querySelector('.completedClose');
closeBtn.textContent = localStorage.getItem('ic_uname');

closeBtn.addEventListener('click', () => {
    pushSound.play();
    localStorage.setItem('lastSecret', 'true');
    localStorage.setItem('getTrophy', 'true');
    setTimeout(() => { completedDialog.close(); }, 500);
    setTimeout(() => { location.reload(); }, 1000);
});

// チート発動関数（起点：ぴよたそ）<div id="firstObject" onclick="cheat()"> (HTML記述)
let ic_bgmChangeBlue = localStorage.getItem('ic_bgmChangeBlue');
let ic_bgmChangeRed = localStorage.getItem('ic_bgmChangeRed');
let ic_bgmChangeBlack = localStorage.getItem('ic_bgmChangeBlack');
function cheat() {
    // チート番号を加算してから格納
    sessionStorage.setItem('cheatNumber', ++cheatNumber);

    // チート番号 0～3 まで
    if (0 == cheatNumber || cheatNumber < 4) {
        return;

        // チート番号 4～6 まで
    } else if (3 < cheatNumber && cheatNumber < 7) {
        firstObjectRandom();

        // チート番号 7～ ＆ 羽根番号 7 ～
    } else if (cheatNumber == 7 && featherNumber == 7) {

        if (!ic_bgmChangeBlue) {
            localStorage.setItem('ic_bgmChangeBlue', 'confirmed');
            levelSound.play();
            recordAlert('Secret List 05 : Discover !');
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[3] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
            setTimeout(() => { location.reload(); }, 3000);
        } else {
            sessionStorage.setItem('cheatNumber', '7');
            cheatAlert('BGM CHANGE', 'white', 'darkBlue');
            document.body.style.backgroundColor = 'darkBlue';
            document.body.style.color = 'white';
            setTimeout(() => { location.reload(); }, 1000);
        }

    } else if (cheatNumber == 8 && featherNumber == 8) {

        if (!ic_bgmChangeRed) {
            localStorage.setItem('ic_bgmChangeRed', 'confirmed');
            levelSound.play();
            recordAlert('Secret List 06 : Discover !');
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[4] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
            setTimeout(() => { location.reload(); }, 3000);
        } else {
            sessionStorage.setItem('cheatNumber', '8');
            cheatAlert('BGM CHANGE', 'white', 'darkRed');
            document.body.style.backgroundColor = 'darkRed';
            document.body.style.color = 'white';
            setTimeout(() => { location.reload(); }, 1000);
        }

    } else if (cheatNumber == 9 && featherNumber == 9) {

        if (!ic_bgmChangeBlack) {
            localStorage.setItem('ic_bgmChangeBlack', 'confirmed');
            levelSound.play();
            recordAlert('Secret List 04 & 07 : Discover !');
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[2] = 'discovered';
            secretList_storage.discoveryStatus[5] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
            setTimeout(() => { location.reload(); }, 3000);
        } else {
            sessionStorage.setItem('cheatNumber', '9');
            cheatAlert('CHEAT ON', 'white', 'black');
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            setTimeout(() => { location.reload(); }, 1000);
        }

    } else if (cheatNumber == 10 && featherNumber == 9) {
        sessionStorage.setItem('cheatNumber', '0');
        cheatAlert('CHEAT OFF');
        document.body.style.backgroundColor = 'white';
        setTimeout(() => { location.reload(); }, 1000);

        // チート番号 7～9 まで
    } else if (6 < cheatNumber && cheatNumber < 10) {
        setTimeout(() => { location.reload(); }, 100);

        // 上記以外の例外を検出した場合
    } else {
        sessionStorage.setItem('cheatNumber', '0');
        cheatAlert('Detecting Exceptions');
        document.body.style.backgroundColor = 'white';
        setTimeout(() => { location.reload(); }, 1000);
    }
}

// チート発動関数（起点：羽根アイコン）
const feather = document.querySelector('.fa-feather');
let ic_featherFour = localStorage.getItem('ic_featherFour');
function featherChange() {
    sessionStorage.setItem('featherNumber', ++featherNumber);
    if (featherNumber == 4) {
        if (!ic_featherFour) {
            localStorage.setItem('ic_featherFour', 'confirmed');
            levelSound.play();
            recordAlert('Secret List 03 : Discover !');
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[1] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
        }
        feather.style.cssText = 'color: #16caca;';
    } else if (featherNumber == 7) {
        if (cheatNumber == 7) {
            if (!ic_bgmChangeBlue) {
                localStorage.setItem('ic_bgmChangeBlue', 'confirmed');
                levelSound.play();
                recordAlert('Secret List 05 : Discover !');
                secretList_storage = secretList;
                secretList_storage.discoveryStatus[3] = 'discovered';
                secretList_json = JSON.stringify(secretList_storage);
                localStorage.setItem('secretList', secretList_json);
                setTimeout(() => { location.reload(); }, 3000);
            } else {
                sessionStorage.setItem('cheatNumber', '7');
                cheatAlert('BGM CHANGE', 'white', 'darkBlue');
                document.body.style.backgroundColor = 'darkBlue';
                document.body.style.color = 'white';
                setTimeout(() => { location.reload(); }, 1000);
            }
        } else {
            feather.style.cssText = 'color:rgb(22, 22, 202);';
            setTimeout(() => { location.reload(); }, 1200);
        }
    } else if (featherNumber == 8) {
        if (cheatNumber == 8) {
            if (!ic_bgmChangeRed) {
                localStorage.setItem('ic_bgmChangeRed', 'confirmed');
                levelSound.play();
                recordAlert('Secret List 06 : Discover !');
                secretList_storage = secretList;
                secretList_storage.discoveryStatus[4] = 'discovered';
                secretList_json = JSON.stringify(secretList_storage);
                localStorage.setItem('secretList', secretList_json);
                setTimeout(() => { location.reload(); }, 3000);
            } else {
                sessionStorage.setItem('cheatNumber', '8');
                cheatAlert('BGM CHANGE', 'white', 'darkRed');
                document.body.style.backgroundColor = 'darkRed';
                document.body.style.color = 'white';
                setTimeout(() => { location.reload(); }, 1000);
            }
        } else {
            feather.style.cssText = 'color:rgb(202, 22, 22);';
            setTimeout(() => { location.reload(); }, 1200);
        }
    } else if (featherNumber == 9) {
        if (cheatNumber == 9) {
            if (!ic_bgmChangeBlack) {
                localStorage.setItem('ic_bgmChangeBlack', 'confirmed');
                levelSound.play();
                recordAlert('Secret List 04 & 07 : Discover !');
                secretList_storage = secretList;
                secretList_storage.discoveryStatus[2] = 'discovered';
                secretList_storage.discoveryStatus[5] = 'discovered';
                secretList_json = JSON.stringify(secretList_storage);
                localStorage.setItem('secretList', secretList_json);
                setTimeout(() => { location.reload(); }, 3000);
            } else {
                sessionStorage.setItem('cheatNumber', '9');
                cheatAlert('CHEAT ON', 'white', 'black');
                document.body.style.backgroundColor = 'black';
                document.body.style.color = 'white';
                setTimeout(() => { location.reload(); }, 1000);
            }
        } else {
            feather.style.cssText = 'color:rgb(202, 22, 202); animation: blinking 2s ease-in-out alternate infinite;';
            setTimeout(() => { location.reload(); }, 1200);
        }
    } else if (featherNumber > 9) {
        feather.style.cssText = 'animation: 1s circle forwards;';
        sessionStorage.setItem('featherNumber', '0');
        setTimeout(() => { location.reload(); }, 1200);
    } else {
        feather.style.cssText = 'color:rgb(0, 0, 0);';
    }
}

function featherStatus() {
    if (featherNumber == 4) {
        feather.style.cssText = 'color: #16caca;';
    } else if (featherNumber == 7) {
        feather.style.cssText = 'color:rgb(22, 22, 202);';
    } else if (featherNumber == 8) {
        feather.style.cssText = 'color:rgb(202, 22, 22);';
    } else if (featherNumber == 9) {
        feather.style.cssText = 'color:rgb(202, 22, 202); animation: blinking 2s ease-in-out alternate infinite;';
    } else {
        feather.style.cssText = 'color:rgb(0, 0, 0);';
    }
}

/* ------------------------------------------------ */

// timerIcon(称号表示)
function timerIconJudge() {
    if (cheating == 'true') {
        timerIcon.innerHTML = '<i class="fa-solid fa-skull"></i>';
    } else if (getTrophy == 'true') {
        timerIcon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
    } else if (secretList_storage.discoveryStatus[7] == 'discovered') {
        timerIcon.innerHTML = '<i class="fa-solid fa-poo"></i>';
    } else {
        timerIcon.innerHTML = '<i class="fa-solid fa-stopwatch"></i>';
        timerIcon.style.pointerEvents = 'none';
    }
}

// PC・スマホ兼用クアッドタップによるイベント発火処理
let quadTap = 0;
timerIcon.addEventListener('click', function () {
    // スマホのダブルタップ時の拡大表示をストップする処理(UI改善用)
    timerIcon.style.cssText = 'touch-action: manipulation;';
    quadTap++;
    if (quadTap === 1) {
        // console.log('1');
        stampSound.play();
    } else if (quadTap === 2) {
        // console.log('2');
        stamp2Sound.play();
    } else if (quadTap === 3) {
        // console.log('3');
        stamp3Sound.play();
    } else if (quadTap === 4) {
        // console.log('4');
        stampSound.pause();
        stamp2Sound.pause();
        stamp3Sound.pause();
        stamp4Sound.play();
        quadTap = 0;
        // 操作制限およびイベント実行
        timerIcon.style.pointerEvents = 'none';
        setTimeout(() => { timerIcon.style.pointerEvents = 'auto'; }, 4000);
        setTimeout(() => { upSound.play(); }, 1000);
        setTimeout(() => { goalSound.play(); }, 3000);
        closeBtn.style.pointerEvents = 'none';
        setTimeout(() => { closeBtn.style.pointerEvents = 'auto'; }, 14000);
        setTimeout(() => { completedDialog.showModal(); }, 3000);
        setTimeout(() => { typeText(); }, 7000);
    } else {
        return;
    }
    // 1秒後にフラグをリセット
    setTimeout(() => { quadTap = 0; }, 1000);
});

// ダブルタップ ver.
// let dblTap = false;
// timerIcon.addEventListener('click', function () {
//     if (dblTap) {
//         // ダブルタップ時の処理
//         console.log('ダブルタップ');
//         // フラグをリセット
//         dblTap = false;
//     } else {
//         console.log('シングルタップ');
//         // フラグをセット
//         dblTap = true;
//     }
//     // 500ミリ秒後にフラグをリセット
//     setTimeout(function () {
//         dblTap = false;
//     }, 500);
// });

const typingText = document.querySelector('.completedMessage');
const textJapanese = 'みごと みごと みごと じゃ！ \n\n そなたに 【しゃも】 の しょうごう を さずける！ \n\n あっぱれ！';
const textEnglish = 'Brilliant, brilliant, brilliant! \n\n I give you the title of gamecock! \n\n Well done!';
let completedText; // テキストを切り替えるための変数
let index = 1;     // 一文字ずつ表示するための変数

// 偶数判定用関数
let isEvenNumber = 0;
function isEven(isEvenNumber) {
    return isEvenNumber % 2 === 0; // isEvenNumber が偶数なら true を返す
}

// const hiragana = 'あいうえお';
// hiragana.slice(0, 1) // あ
// hiragana.slice(0, 3) // あいう
// hiragana.slice(0)    // あいうえお
// hiragana.slice(4)    // お
// hiragana.slice(0, hiragana.length) // あいうえお
// 一文字ずつ表示する関数
function typeText() {
    if (isEven(isEvenNumber)) {  // true(偶数) なら
        completedText = textJapanese;
    } else {
        completedText = textEnglish;
    }
    typingText.textContent = completedText.slice(0, index);
    if (index < completedText.length) {
        // もしまだ表示されていない文字があるなら一文字ずつ追加する処理
        index++;
        // 文字の表示速度をランダムにする(リアル感)
        const randomInterval = Math.floor(Math.random() * 150) + 50;
        setTimeout(() => { typeText(); }, randomInterval);
    } else {
        // 次に表示するテキストを切り替えるために加算
        isEvenNumber++;
        // 全ての文字が表示されたら一文字ずつ消去する関数を1.5秒後に実行する
        setTimeout(() => { eraseText(); }, 1500);
    }
}

// 一文字ずつ消去する関数
function eraseText() {
    // 文字を一つ消去する
    index--;
    // 最初の文字〜変数 index までの文字列を表示する
    typingText.textContent = completedText.slice(0, index);
    if (index > 0) {
        // 一文字ずつ消去する関数を0.03秒待ってから実行する
        setTimeout(() => { eraseText(); }, 30);
    } else {
        // 全ての文字が表示されたら一文字ずつ表示する関数を1.5秒後に実行する
        setTimeout(() => { typeText(); }, 1500);
    }
}

// キー同時押下 (Alt + Shift + Click) によるイベント(PC限定)
const trick = document.getElementById('trick');
const trickDialog = document.getElementById('trickDialog');
const trickList = document.getElementById('trickList');
trick.onclick = function (event) {
    if (event.altKey && event.shiftKey) {
        trickDialog.showModal();
        trickList.innerHTML =
            `
        <table>
            <thead>
                <tr><th></th><th scope="col">ひみつ一覧</th><th scope="col">発動条件</th><th></th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>01</td>
                    <td>このヒミツのリストをみる</td>
                    <td>ヒミツリスト（ひみつ一覧）アイコンをクリックする</td>
                    <td rowSpan="8"><img src="./image/kappa.png"></td>
                </tr>
                <tr>
                    <td>02</td>
                    <td>タイムで６０びょうをきる</td>
                    <td>正規プレイでタイム６０秒未満を達成する</td>
                </tr>  
                <tr>
                    <td>03</td>
                    <td>こうそくリロードであそぶ</td>
                    <td>羽根アイコンを４回クリックする</td>
                </tr>
                <tr>
                    <td>04</td>
                    <td>チートモードでプレイする</td>
                    <td>【ヒミツのおとをみつける３】を達成することで発動</td>
                </tr>
                <tr>
                    <td>05</td>
                    <td>ヒミツのおとをみつける１</td>
                    <td>羽根アイコンを７回、ぴよたそを７回クリックする</td>
                </tr>
                <tr>
                    <td>06</td>
                    <td>ヒミツのおとをみつける２</td>
                    <td>羽根アイコンを８回、ぴよたそを８回クリックする</td>
                </tr>
                <tr>
                    <td>07</td>
                    <td>ヒミツのおとをみつける３</td>
                    <td>羽根アイコンを９回、ぴよたそを９回クリックする</td>
                </tr>
                <tr>
                    <td>08</td>
                    <td>プレイかいすうをみつける</td>
                    <td>“02”を達成後、チートモード状態でランキングを見る</td>
                </tr>
                <tr>
                    <td>09</td>
                    <td><i class="fa-regular fa-copyright"></i>カイハツシャをみつける</td>
                    <td>全てを達成後、チートモード状態でランキングを見る</td>
                    <td rowSpan="2"><span>「ズルをするのか？」</span></td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>スペシャルサンクスをみる</td>
                    <td>うんちアイコン（最後に出現）を４連続クリックする</td>
                </tr>
                <tr>
                    <td>※</td>
                    <td>（全ての記録を削除する）</td>
                    <td> Alt ＋ Shift ＋ 記録削除ボタンを同時に押す</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="trickData"><button class="trickSelect red">YES</button><button class="trickSelect">NO</button></td>
                </tr>
            </tbody>
        </table>
        `;

        // イベント発火時に innerHTML にて table 生成しているため、そのあとの処理については読込順の都合上こうなる
        const trickSelects = [...document.getElementsByClassName('trickSelect')];
        trickSelects.forEach(v => v.addEventListener('mouseover', function () {
            cursorSound.play();
        }));
        // 以下、ズルを発動した際の処理
        trickSelects[0].addEventListener('click', () => {
            curseSound.play();
            // ズルを使用したことを示すための消せないアイコン設定
            localStorage.setItem('cheating', 'true');
            // ズル発動 ＝ 全クリ扱いにする
            secretList_storage = secretList;
            secretList_storage.discoveryStatus[0] = 'discovered';
            secretList_storage.discoveryStatus[1] = 'discovered';
            secretList_storage.discoveryStatus[2] = 'discovered';
            secretList_storage.discoveryStatus[3] = 'discovered';
            secretList_storage.discoveryStatus[4] = 'discovered';
            secretList_storage.discoveryStatus[5] = 'discovered';
            secretList_storage.discoveryStatus[6] = 'discovered';
            secretList_storage.discoveryStatus[7] = 'discovered';
            secretList_json = JSON.stringify(secretList_storage);
            localStorage.setItem('secretList', secretList_json);
            // 初回確認用の値を「確認済み」にする
            localStorage.setItem('ic_secretList', 'confirmed');
            localStorage.setItem('ic_highestRating', 'confirmed');
            localStorage.setItem('ic_featherFour', 'confirmed');
            localStorage.setItem('ic_bgmChangeBlue', 'confirmed');
            localStorage.setItem('ic_bgmChangeRed', 'confirmed');
            localStorage.setItem('ic_bgmChangeBlack', 'confirmed');
            localStorage.setItem('ic_tpc', 'confirmed');
            // 操作不可および遷移処理
            trickDialog.style.pointerEvents = 'none';
            setTimeout(() => { trickDialog.style.pointerEvents = 'auto'; }, 4000);
            setTimeout(() => { location.reload(); }, 4000);
        });
        // ズルを踏みとどまった際の処理
        trickSelects[1].addEventListener('click', () => {
            innSound.play();
            trickDialog.style.pointerEvents = 'none';
            setTimeout(() => { trickDialog.style.pointerEvents = 'auto'; }, 4000);
            setTimeout(() => { location.reload(); }, 4000);
        });
    }
};