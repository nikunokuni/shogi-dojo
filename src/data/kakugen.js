// 将棋格言・手筋リスト
// 出典：将棋の定説として広く知られているもののみ収録

export const KAKUGEN_LIST = [
 // 歩
{ text: "歩のない将棋は負け将棋", category: "歩", level: "初級" },
{ text: "手のない時は端歩を突け", category: "歩", level: "初級" },
{ text: "開戦は歩の突き捨てから", category: "歩", level: "初級" },
{ text: "一歩千金", category: "歩", level: "中級" },
{ text: "二枚替えなら歩ともせよ", category: "歩", level: "中級" },
{ text: "三歩持ったら継ぎ歩とたれ歩", category: "歩", level: "中級" },
{ text: "５三のと金に負けなし", category: "歩", level: "中級" },
{ text: "と金のおそはや", category: "歩", level: "中級" },
{ text: "まむしのと金", category: "歩", level: "中級" },
{ text: "焦点の歩に好手あり", category: "歩", level: "中級" },
{ text: "打ち歩詰めに詰みの余地あり", category: "歩", level: "上級" },

// 玉
{ text: "王手は追う手", category: "玉", level: "初級" },
{ text: "玉の早逃げ八手の得", category: "玉", level: "初級" },
{ text: "居玉はさけよ", category: "玉", level: "初級" },
{ text: "初王手目の薬", category: "玉", level: "初級" },
{ text: "玉は敵の角筋を避けよ", category: "玉", level: "初級" },
{ text: "玉は包むように寄せよ", category: "玉", level: "中級" },
{ text: "玉は下段に落とせ", category: "玉", level: "中級" },
{ text: "中段玉は寄せにくし", category: "玉", level: "中級" },
{ text: "玉の腹から銀を打て", category: "玉", level: "中級" },
{ text: "端玉には端歩", category: "玉", level: "中級" },
{ text: "桂頭の玉寄せにくし", category: "玉", level: "上級" },

// 攻め
{ text: "飛車先の歩交換三つの得あり", category: "攻め", level: "初級" },
{ text: "攻めは飛角銀桂守りは金銀三枚", category: "攻め", level: "初級" },
{ text: "駒は中央へ向かえ", category: "攻め", level: "初級" },
{ text: "飛車は十字に使え", category: "攻め", level: "中級" },
{ text: "角筋は受けにくし", category: "攻め", level: "中級" },
{ text: "要の金をねらえ", category: "攻め", level: "中級" },
{ text: "金はとどめに残せ", category: "攻め", level: "中級" },
{ text: "三桂あって詰まぬ事なし", category: "攻め", level: "中級" },
{ text: "４枚の攻めは切れない", category: "攻め", level: "中級" },

// 守り
{ text: "玉飛車接近すべからず", category: "守り", level: "初級" },
{ text: "金なし将棋に受け手なし", category: "守り", level: "初級" },
{ text: "攻めは銀、受けは金", category: "守り", level: "初級" },
{ text: "馬の守りは金銀三枚", category: "守り", level: "中級" },
{ text: "大駒は近づけて受けよ", category: "守り", level: "中級" },
{ text: "金底の歩岩より固し", category: "守り", level: "中級" },
{ text: "金は引く手に好手あり", category: "守り", level: "中級" },
{ text: "歩越銀には歩で受けよ", category: "守り", level: "中級" },

// 形勢
{ text: "５五の位は天王山", category: "形勢", level: "初級" },
{ text: "終盤は駒の損得より速度", category: "形勢", level: "中級" },
{ text: "風邪を引いても後手ひくな", category: "形勢", level: "中級" },
{ text: "位を取ったら位の確保", category: "形勢", level: "中級" },
{ text: "長い詰みより短い必死", category: "形勢", level: "上級" },
{ text: "不利なときは戦線拡大", category: "形勢", level: "上級" },

// 手筋
{ text: "大駒は離して打て", category: "手筋", level: "初級" },
{ text: "序盤は飛車より角", category: "手筋", level: "初級" },
{ text: "桂の高跳び歩のえじき", category: "手筋", level: "初級" },
{ text: "竜は敵陣に馬は自陣に", category: "手筋", level: "中級" },
{ text: "遠見の角に好手あり", category: "手筋", level: "中級" },
{ text: "振り飛車には角交換", category: "手筋", level: "中級" },
{ text: "角の頭は丸い", category: "手筋", level: "中級" },
{ text: "金はななめに誘え", category: "手筋", level: "中級" },
{ text: "銀は千鳥に使え", category: "手筋", level: "中級" },
{ text: "桂頭の銀", category: "手筋", level: "中級" },
{ text: "桂は控えて打て", category: "手筋", level: "中級" },
{ text: "香は下段から打て", category: "手筋", level: "中級" },
{ text: "香を持ったら歩の裏を狙え", category: "手筋", level: "中級" },
{ text: "寄せは俗手に好手あり", category: "手筋", level: "中級" },
{ text: "逃げ道に捨て駒", category: "手筋", level: "中級" },
{ text: "敵の打ちたい所に打て", category: "手筋", level: "中級" },
{ text: "敵の急所は自分の急所", category: "手筋", level: "中級" },
{ text: "端に手あり", category: "手筋", level: "中級" },
{ text: "浮き駒に手あり", category: "手筋", level: "中級" },
{ text: "両取り逃げるべからず", category: "手筋", level: "中級" },
{ text: "遊び駒を活用せよ", category: "手筋", level: "中級" },
{ text: "角換わり将棋に５筋は突くな", category: "手筋", level: "上級" },
{ text: "内竜は外竜に勝る", category: "手筋", level: "上級" },
{ text: "一段金に飛車捨てあり", category: "手筋", level: "上級" },
{ text: "銀は成らずに好手あり", category: "手筋", level: "上級" },

export const KAKOI_COMPATIBILITY = [
  {
    kakoi: "矢倉",
    tsuyomi: "上からの攻め（縦の攻め）に強い",
    yowami: "横からの攻めに弱い。端攻めも有効",
    koukana_seme: ["端攻め", "銀冠への組み替えを狙う", "角交換から横に揺さぶる"],
  },
  {
    kakoi: "美濃囲い",
    tsuyomi: "横からの攻めに強い",
    yowami: "上（縦）からの攻めに弱い。金を剥がすと崩れやすい",
    koukana_seme: ["縦の攻め", "天王山制圧", "金を狙って上から崩す"],
  },
  {
    kakoi: "穴熊",
    tsuyomi: "固さが最強クラス。遠くにいるので攻めに集中できる",
    yowami: "端攻め・香の直射・桂の活用で崩れる。と金作りも有効",
    koukana_seme: ["端攻め", "と金を作ってじわじわ攻める", "香打ちで直射する"],
  },
  {
    kakoi: "舟囲い",
    tsuyomi: "素早く組める。攻撃的な局面向き",
    yowami: "固さは低め。玉頭攻めや横からの速攻に弱い",
    koukana_seme: ["玉頭攻め", "横からの速攻", "飛車先突破"],
  },
  {
    kakoi: "銀冠",
    tsuyomi: "バランスが良く、上からの攻めに強い",
    yowami: "端の守りが薄くなりがち",
    koukana_seme: ["端攻め", "角交換から揺さぶる"],
  },
];

