// 将棋格言・手筋リスト
// 出典：将棋の定説として広く知られているもののみ収録

export const KAKUGEN_LIST = [
  // ── 歩に関する格言 ──
  { text: "歩のない将棋は負け将棋", category: "歩", level: "初級" },
  { text: "歩は将棋の命", category: "歩", level: "初級" },
  { text: "と金の遠打ち", category: "歩", level: "中級" },
  { text: "継ぎ歩に垂れ歩", category: "歩", level: "中級" },
  { text: "垂れ歩の手筋", category: "歩", level: "中級" },
  { text: "たたきの歩", category: "歩", level: "中級" },

  // ── 玉に関する格言 ──
  { text: "玉の近くに金を打つな", category: "玉", level: "初級" },
  { text: "玉は包むように寄せよ", category: "玉", level: "中級" },
  { text: "玉飛接近すべからず", category: "玉", level: "初級" },
  { text: "入玉には竜を作れ", category: "玉", level: "上級" },
  { text: "玉は下段に落とせ", category: "玉", level: "中級" },

  // ── 攻めに関する格言 ──
  { text: "攻めは飛角銀桂", category: "攻め", level: "初級" },
  { text: "桂馬の高跳び歩の餌食", category: "攻め", level: "初級" },
  { text: "両取り逃げるべからず", category: "攻め", level: "中級" },
  { text: "角のない振り飛車は振り飛車にあらず", category: "攻め", level: "中級" },
  { text: "二枚替えは歩得に匹敵", category: "攻め", level: "中級" },
  { text: "馬は自陣に引け", category: "攻め", level: "中級" },
  { text: "竜は敵陣に作れ", category: "攻め", level: "中級" },

  // ── 守りに関する格言 ──
  { text: "金は斜めに引いて守れ", category: "守り", level: "初級" },
  { text: "受けに銀を使え", category: "守り", level: "初級" },
  { text: "自陣角は守りの切り札", category: "守り", level: "中級" },

  // ── 形勢判断に関する格言 ──
  { text: "駒の損得より速度", category: "形勢", level: "中級" },
  { text: "飛車より角、角より金、金より銀", category: "形勢", level: "初級" },
  { text: "終盤は駒の損得より速度", category: "形勢", level: "中級" },
  { text: "必死は詰めより勝る", category: "形勢", level: "上級" },

  // ── 手筋 ──
  { text: "割り打ちの銀", category: "手筋", level: "中級" },
  { text: "底歩の手筋", category: "手筋", level: "初級" },
  { text: "送りの手筋", category: "手筋", level: "中級" },
  { text: "ひもをつける", category: "手筋", level: "中級" },
];

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

