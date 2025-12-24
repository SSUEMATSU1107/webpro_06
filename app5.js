"use strict";
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

//11/7の追加分/////////////
let cafe = [
  { id:1, name:"スターバックス", area:"幕張" },
  { id:2, name:"ドトール", area:"津田沼" },
  { id:3, name:"タリーズ", area:"千葉" }
];

///////11/14-----------------------------------------
let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});
///////11/14-----------------------------------------


app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: cafe });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  cafe.push( newdata );
  //res.redirect('/public/keiyo_add.html');
  res.render('db1', { data: cafe });
});
//追加分終わり/////////////////



// 1. 山手線システム
let yamanote = [
  { id: 1, code: "JY01", name: "東京駅", passengers: 403831 },
  { id: 2, code: "JY02", name: "神田駅", passengers: 100000 }
];

app.get("/yamanote", (req, res) => res.render('yamanote', { data: yamanote }));
app.get("/yamanote/create", (req, res) => res.redirect('/public/yamanote_new.html'));
app.post("/yamanote", (req, res) => {
  yamanote.push({ id: yamanote.length + 1, code: req.body.code, name: req.body.name, passengers: Number(req.body.passengers) });
  res.redirect('/yamanote');
});
app.get("/yamanote/:number", (req, res) => res.render('yamanote_detail', { id: req.params.number, data: yamanote[req.params.number] }));
app.get("/yamanote/edit/:number", (req, res) => res.render('yamanote_edit', { id: req.params.number, data: yamanote[req.params.number] }));
app.post("/yamanote/update/:number", (req, res) => {
  const n = req.params.number;
  if(yamanote[n]) {
    yamanote[n].code = req.body.code;
    yamanote[n].name = req.body.name;
    yamanote[n].passengers = Number(req.body.passengers);
  }
  res.redirect('/yamanote/' + n);
});
app.get("/yamanote/delete/:number", (req, res) => {
  yamanote.splice(req.params.number, 1);
  res.redirect('/yamanote');
});

// 2. 筋肉トレーニングシステム
let workout = [
  { id: 1, name: "ベンチプレス", part: "胸", reps: 10 },
  { id: 2, name: "スクワット", part: "足", reps: 12 }
];

app.get("/workout", (req, res) => res.render('workout', { data: workout }));
app.get("/workout/create", (req, res) => res.redirect('/public/workout_new.html'));
app.post("/workout", (req, res) => {
  workout.push({ id: workout.length + 1, name: req.body.name, part: req.body.part, reps: Number(req.body.reps) });
  res.redirect('/workout');
});
app.get("/workout/:number", (req, res) => res.render('workout_detail', { id: req.params.number, data: workout[req.params.number] }));
app.get("/workout/edit/:number", (req, res) => res.render('workout_edit', { id: req.params.number, data: workout[req.params.number] }));
app.post("/workout/update/:number", (req, res) => {
  const n = req.params.number;
  if(workout[n]) {
    workout[n].name = req.body.name;
    workout[n].part = req.body.part;
    workout[n].reps = Number(req.body.reps);
  }
  res.redirect('/workout/' + n);
});
app.get("/workout/delete/:number", (req, res) => {
  workout.splice(req.params.number, 1);
  res.redirect('/workout');
});

// 3. 栄養と食事システム
let nutrition = [
  { id: 1, food: "鶏胸肉", calories: 108, protein: 22.3 },
  { id: 2, food: "ブロッコリー", calories: 33, protein: 4.3 }
];

app.get("/nutrition", (req, res) => res.render('nutrition', { data: nutrition }));
app.get("/nutrition/create", (req, res) => res.redirect('/public/nutrition_new.html'));
app.post("/nutrition", (req, res) => {
  nutrition.push({ id: nutrition.length + 1, food: req.body.food, calories: Number(req.body.calories), protein: Number(req.body.protein) });
  res.redirect('/nutrition');
});
app.get("/nutrition/:number", (req, res) => res.render('nutrition_detail', { id: req.params.number, data: nutrition[req.params.number] }));
app.get("/nutrition/edit/:number", (req, res) => res.render('nutrition_edit', { id: req.params.number, data: nutrition[req.params.number] }));
app.post("/nutrition/update/:number", (req, res) => {
  const n = req.params.number;
  if(nutrition[n]) {
    nutrition[n].food = req.body.food;
    nutrition[n].calories = Number(req.body.calories);
    nutrition[n].protein = Number(req.body.protein);
  }
  res.redirect('/nutrition/' + n);
});
app.get("/nutrition/delete/:number", (req, res) => {
  nutrition.splice(req.params.number, 1);
  res.redirect('/nutrition');
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));



