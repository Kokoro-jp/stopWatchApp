
const timer = document.getElementById("timer");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;  //Startボタンクリック時の時刻
let elapsedTime = 0;  //StartからStopまでの経過時間
let timeoutid; //ID

function countUp(){
  const d = new Date(Date.now() - startTime + elapsedTime);
  
  const ms = String(d.getMilliseconds()).slice(0,1);
  const s = String(d.getSeconds()).slice(0,2);
  const m = String(d.getMinutes()).slice(0,2);
  const h = String(d.getHours() - 9).slice(0,2);  //"-9"は日本用

  //ディスプレイ出力
  timer.textContent = h + ':' + m + ':' + s + ':' + ms;
  
  timeoutid = setTimeout( () => {
    
    countUp();
  }, 10);
}

// 活性非活性（初期状態・リセット状態）
function setButtonStateInitial() {
  start.classList.remove('inactive'); //活性
  stop.classList.add('inactive'); //非活性
  reset.classList.add('inactive'); //非活性
}
//活性非活性（タイマー動作中）
function setButtonStateRunning() {
  start.classList.add('inactive'); //非活性
  stop.classList.remove('inactive'); //活性
  reset.classList.remove('inactive'); //活性にしたい
}
//活性非活性（タイマー一時停止中）
function setButtonStateStoped() {
  start.classList.remove('inactive'); //活性
  stop.classList.add('inactive'); //非活性
  reset.classList.remove('inactive'); //活性
}

// スタートボタン）
start.addEventListener("click", () => {
  if (start.classList.contains('inactive') === true) {
    return;
  }
  //タイマー動作させる →動作中の選択肢は常にストップorリセット
  setButtonStateRunning();
  startTime = Date.now();
  countUp();
});

// ストップボタン
stop.addEventListener("click", () => {
  if (stop.classList.contains('inactive') === true) {
    return;
  }
  // タイマー停止する →停止中の選択肢は常にスタートorリセット
  setButtonStateStoped();
  clearTimeout(timeoutid);
  elapsedTime += Date.now() - startTime;
  
});

// リセットボタン（動作中ならリセット直後再スタート）
reset.addEventListener("click", () => {
  if (start.classList.contains('inactive') === true) {
   setButtonStateInitial();
   clearTimeout(timeoutid);
   elapsedTime = 0;
   timer.textContent = '0:0:0:0';
   }else{
  // タイマー停止中なら初期値にリセット
  setButtonStateInitial();
  timer.textContent = '0:0:0:0';
  elapsedTime = 0;
   }
});