// 将棋格言・手筋リスト
// 出典：将棋の定説として広く知られているもののみ収録

export const KAKUGEN_LIST = [
  // 歩カテゴリ
  { "text": "歩のない将棋は負け将棋", "level": "初級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "歩がないと攻めや受けの幅が狭まり、窮地に陥りやすくなること。" },
  { "text": "手のない時は端歩を突け", "level": "初級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "指し手に困ったときは、端歩を突いて形に変化を求めるのが有効であること。" },
  { "text": "開戦は歩の突き捨てから", "level": "初級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "攻めを開始する際は、まず歩を突き捨てて相手の陣形を乱すのが定石であること。" },
  { "text": "一歩千金", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "終盤のたった一枚の歩が、勝敗を分けるほど大きな価値を持つこと。" },
  { "text": "二枚替えなら歩ともせよ", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "相手の銀や金と歩を二枚交換できるなら、積極的に応じるべきであること。" },
  { "text": "三歩持ったら継ぎ歩とたれ歩", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "歩を三枚持てば、継ぎ歩や垂れ歩といった強力な攻め筋が生まれること。" },
  { "text": "５三のと金に負けなし", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "敵陣深く（５三など）に作ったと金は非常に強力で、形勢を大きくリードすること。" },
  { "text": "と金のおそはや", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "と金は遅いようだが、作ってしまえば非常に強力で勝ちに直結すること。" },
  { "text": "まむしのと金", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "まむしのようにしつこく敵陣を荒らすと金は、相手にとって非常に脅威であること。" },
  { "text": "焦点の歩に好手あり", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "複数の利きが集中する地点に歩を打つことで、相手の駒を効率よく捌けること。" },
  { "text": "打ち歩詰めに詰みの余地あり", "level": "上級", "category": { "phase": "ending", "piece": "fu", "concept": "attack" }, "meaning": "打ち歩詰めは禁じ手だが、それを利用して別の攻め筋を探す工夫が必要であること。" },

  // 玉カテゴリ
  { "text": "王手は追う手", "level": "初級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "やみくもに王手をかけると、かえって相手玉を安全な場所へ逃がしてしまうこと。" },
  { "text": "玉の早逃げ八手の得", "level": "初級", "category": { "phase": "ending", "piece": "gyoku", "concept": "defense" }, "meaning": "玉は早めに逃げておけば、後から数手分の価値を生むこと。" },
  { "text": "居玉はさけよ", "level": "初級", "category": { "phase": "opening", "piece": "gyoku", "concept": "defense" }, "meaning": "初期配置のままの玉は弱いため、早めに囲って安全を確保すべきであること。" },
  { "text": "初王手目の薬", "level": "初級", "category": { "phase": "middle", "piece": "gyoku", "concept": "attack" }, "meaning": "最初の王手は局面を好転させる良いきっかけになることが多いこと。" },
  { "text": "玉は敵の角筋を避けよ", "level": "初級", "category": { "phase": "opening", "piece": "gyoku", "concept": "defense" }, "meaning": "角の利きは遠くまで届くため、玉をそこから外して安全を確保すること。" },
  { "text": "玉は包むように寄せよ", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "玉を逃がさないよう、周囲を包囲するように攻めるのが定石であること。" },
  { "text": "玉は下段に落とせ", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "玉を上部に逃がさず、一段目に押し込むことで詰ませやすくなること。" },
  { "text": "中段玉は寄せにくし", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "defense" }, "meaning": "玉が中央に出ると逃げ道が多く、寄せが非常に難しくなること。" },
  { "text": "玉の腹から銀を打て", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "玉の側面（腹）から銀を打つと、相手の逃げ道を制限できること。" },
  { "text": "端玉には端歩", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "端へ逃げた玉には、端歩を突くのが最も効果的な寄せ筋であること。" },
  { "text": "桂頭の玉寄せにくし", "level": "上級", "category": { "phase": "ending", "piece": "gyoku", "concept": "defense" }, "meaning": "玉が桂馬の頭にいるときは、逃げ道が多く寄せにくいこと。" },

  // 攻めカテゴリ
  { "text": "飛車先の歩交換三つの得あり", "level": "初級", "category": { "phase": "opening", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "飛車先の歩を交換することで、持ち歩、開戦、将来的な突き越しなどの利があること。" },
  { "text": "攻めは飛角銀桂守りは金銀三枚", "level": "初級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "攻める駒と守る駒のバランスを意識した配置の基本であること。" },
  { "text": "駒は中央へ向かえ", "level": "初級", "category": { "phase": "opening", "piece": "kin-gin", "concept": "positioning" }, "meaning": "中央を制する者がゲームを制する。駒は効率よく中央へ活用すること。" },
  { "text": "飛車は十字に使え", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "飛車を縦横の両方向に活用できると、攻めの破壊力が増すこと。" },
  { "text": "角筋は受けにくし", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "角の斜めの利きは独特で、相手にとって受けが難しいこと。" },
  { "text": "要の金をねらえ", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "attack" }, "meaning": "守りの要である金駒を目標に攻めるのが効率的であること。" },
  { "text": "金はとどめに残せ", "level": "中級", "category": { "phase": "ending", "piece": "kin-gin", "concept": "attack" }, "meaning": "攻め駒を使い切るより、最後の詰めに金を残しておくと決めやすいこと。" },
  { "text": "三桂あって詰まぬ事なし", "level": "中級", "category": { "phase": "ending", "piece": "kei-kyo", "concept": "attack" }, "meaning": "桂馬を三枚持てば、どんな玉でも詰ませられるほど攻撃力が高いこと。" },
  { "text": "４枚の攻めは切れない", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "attack" }, "meaning": "連携した４枚の駒による攻めは、簡単には防ぎきれないということ。" },

  // 守りカテゴリ
  { "text": "玉飛車接近すべからず", "level": "初級", "category": { "phase": "opening", "piece": "hisha-kaku", "concept": "defense" }, "meaning": "玉と飛車を近づけると、一撃で両取りをかけられる危険があること。" },
  { "text": "金なし将棋に受け手なし", "level": "初級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "defense" }, "meaning": "守りの要である金がないと、受けが全く成立しなくなること。" },
  { "text": "攻めは銀、受けは金", "level": "初級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "defense" }, "meaning": "銀は機動力があり攻めに、金は安定しており守りに向いていること。" },
  { "text": "馬の守りは金銀三枚", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "defense" }, "meaning": "馬を作られても、金銀三枚で堅く守れば突破されにくいこと。" },
  { "text": "大駒は近づけて受けよ", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "defense" }, "meaning": "遠くから狙われると脅威だが、近くに受け駒を打てば威力を殺せること。" },
  { "text": "金底の歩岩より固し", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "defense" }, "meaning": "金の下に歩を打つ守り方は、非常に堅く突破されにくいこと。" },
  { "text": "金は引く手に好手あり", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "defense" }, "meaning": "金は引くことで攻めをいなし、新たな守りを形成できること。" },
  { "text": "歩越銀には歩で受けよ", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "defense" }, "meaning": "相手の銀が歩を越えてきたら、こちらも歩で突っかけてその銀を圧迫すべきであること。" },

  // 形勢カテゴリ
  { "text": "５五の位は天王山", "level": "初級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "中央の要所（５五）に駒を配置することは、主導権を握る上で非常に重要であること。" },
  { "text": "終盤は駒の損得より速度", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "終盤では駒の枚数より、相手玉を詰ますスピードを優先すべきであること。" },
  { "text": "風邪を引いても後手ひくな", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "体調が悪くても、攻めの手番（先手）を相手に渡してはいけないという気合の教え。" },
  { "text": "位を取ったら位の確保", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "有利な場所（位）を確保したら、それを維持して活用することが大切であること。" },
  { "text": "長い詰みより短い必死", "level": "上級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "複雑で長い詰みを探すより、確実に勝てる「必死」をかける方が実戦的であること。" },
  { "text": "不利なときは戦線拡大", "level": "上級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "不利な局面では局面を複雑化させ、相手にミスを誘う戦い方が有効であること。" },

  // 手筋カテゴリ
  { "text": "大駒は離して打て", "level": "初級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "positioning" }, "meaning": "大駒を近づけて打つと捕まりやすいため、離して使って利きを広げること。" },
  { "text": "序盤は飛車より角", "level": "初級", "category": { "phase": "opening", "piece": "hisha-kaku", "concept": "positioning" }, "meaning": "序盤は遠見の利きが働く角を優先的に活用すべきであること。" },
  { "text": "桂の高跳び歩のえじき", "level": "初級", "category": { "phase": "middle", "piece": "kei-kyo", "concept": "defense" }, "meaning": "高く跳ねた桂馬は歩で突かれると逃げ場がなくなり、タダで取られやすいこと。" },
  { "text": "竜は敵陣に馬は自陣に", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "positioning" }, "meaning": "竜は攻撃的に、馬は守備的に使うとバランスが取れること。" },
  { "text": "遠見の角に好手あり", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "positioning" }, "meaning": "遠くから盤面全体を睨む位置に配置された角が、好手の源泉になること。" },
  { "text": "振り飛車には角交換", "level": "中級", "category": { "phase": "opening", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "振り飛車に対しては角を交換することで、相手の陣形を乱す狙いがあること。" },
  { "text": "角の頭は丸い", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "defense" }, "meaning": "角は斜めに効くが、直上の頭が弱いためそこを狙われやすいこと。" },
  { "text": "金はななめに誘え", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "defense" }, "meaning": "金は斜めの動きを誘い出して、相手の陣形を崩すテクニックがあること。" },
  { "text": "銀は千鳥に使え", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "positioning" }, "meaning": "銀を前後左右にジグザグに使うことで、攻守に活用できること。" },
  { "text": "桂頭の銀", "level": "中級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "attack" }, "meaning": "桂馬の頭に銀を打つと、相手の跳ねを防ぎつつ強力な形になること。" },
  { "text": "桂は控えて打て", "level": "中級", "category": { "phase": "middle", "piece": "kei-kyo", "concept": "positioning" }, "meaning": "桂馬は直接的に当てるより、一段後ろから打つ方が逃げ道もあり使いやすいこと。" },
  { "text": "香は下段から打て", "level": "中級", "category": { "phase": "middle", "piece": "kei-kyo", "concept": "attack" }, "meaning": "香は下段から打つことで、将来的な利きを長く確保できること。" },
  { "text": "香を持ったら歩の裏を狙え", "level": "中級", "category": { "phase": "middle", "piece": "kei-kyo", "concept": "attack" }, "meaning": "香車は歩の裏から打つことで、相手の陣形を効率よく貫通できること。" },
  { "text": "寄せは俗手に好手あり", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "芸術的な手より、単純で泥臭い「俗手」の方が終盤では有効な場合が多いこと。" },
  { "text": "逃げ道に捨て駒", "level": "中級", "category": { "phase": "ending", "piece": "gyoku", "concept": "attack" }, "meaning": "玉の逃げ道に駒を捨てることで、強制的に退路を断つテクニック。" },
  { "text": "敵の打ちたい所に打て", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "defense" }, "meaning": "敵の好手となる地点を先取りする（自分の駒を配置する）防衛術。" },
  { "text": "敵の急所は自分の急所", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "相手が最も嫌がる地点は、自分にとっても重要な拠点であること。" },
  { "text": "端に手あり", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "盤面の中央が膠着したときは、端に活路を見出すのが定石であること。" },
  { "text": "浮き駒に手あり", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "attack" }, "meaning": "味方に守られていない（浮いている）駒は、標的にされやすいこと。" },
  { "text": "両取り逃げるべからず", "level": "中級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "attack" }, "meaning": "両取りをかけられても、もっと厳しい攻めを返せば怖くないということ。" },
  { "text": "遊び駒を活用せよ", "level": "中級", "category": { "phase": "middle", "piece": "fu", "concept": "positioning" }, "meaning": "働いていない駒を戦線に加えることが、勝率アップの近道であること。" },
  { "text": "角換わり将棋に５筋は突くな", "level": "上級", "category": { "phase": "opening", "piece": "hisha-kaku", "concept": "positioning" }, "meaning": "角換わりの定跡において、５筋を突くと中央が弱くなるため禁忌とされること。" },
  { "text": "内竜は外竜に勝る", "level": "上級", "category": { "phase": "middle", "piece": "hisha-kaku", "concept": "positioning" }, "meaning": "内側にある竜の方が、相手玉に近く利きが有効に働くということ。" },
  { "text": "一段金に飛車捨てあり", "level": "上級", "category": { "phase": "ending", "piece": "kin-gin", "concept": "attack" }, "meaning": "一段目に張り付いた金に対しては、飛車を捨てるような大胆な攻めが詰み筋になること。" },
  { "text": "銀は成らずに好手あり", "level": "上級", "category": { "phase": "middle", "piece": "kin-gin", "concept": "attack" }, "meaning": "銀は成るよりも、成らずに元の位置の利きを残す方が効果的な場合があること。" }
]

export const KAKOI_COMPATIBILITY = [
  {
    "name": "総矢倉",
    "category": {
      "type": "ibisha",
      "structure": "vertical"
    },
    "weakpoint": ["edge", "kobini"],
    "yowami": "金銀4枚を贅沢に使って玉頭や上部を極めて強固に守る反面、手数が非常にかかり、端攻めや横からの攻めにはやはり弱さがあります。",
    "koukana_seme": "スズメ刺しなどの端攻め、歩の継ぎ突きによるコビン攻め、下段からの飛車攻め"
  },
  {
    "name": "方矢倉（片矢倉）",
    "category": {
      "type": "ibisha",
      "structure": "vertical"
    },
    "weakpoint": ["bottom", "kobini"],
    "yowami": "手数を節約して角の打ち込みにも強いバランスの良い囲いですが、玉の真下が空いているため下段からの攻めに弱く、斜め（コビン）からの攻めにも脆さがあります。",
    "koukana_seme": "一段目（底）への飛車・金の打ち込み、端攻め、斜めのラインからのこじ開け"
  },
  {
    "name": "土肥矢倉（土居矢倉）",
    "category": {
      "type": "ibisha",
      "structure": "vertical"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "金銀のバランスが良く柔軟に構えられる一方で、通常の矢倉に比べると上部（玉頭）の強度がやや劣り、斜め（コビン）からの急戦に弱い特徴があります。",
    "koukana_seme": "3筋（あるいは7筋）からの玉頭攻め、歩の突き捨てから斜めを突く攻め"
  },
  {
    "name": "天守閣美濃",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "edge", "kobini"],
    "yowami": "横からの攻め（さばき）には威力を発揮しますが、玉の位置が3段目と高いため、玉頭からの攻めや端攻め、角のライン（コビン）に極めて弱いです。",
    "koukana_seme": "端攻め、玉頭への集中攻撃、斜めからの角のライン攻め"
  },
  {
    "name": "左美濃",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["edge", "kobini"],
    "yowami": "横からの攻めに対して美濃囲い特有の粘り強さを発揮しますが、端攻めや、斜め（コビン）からの角や桂馬による攻めに弱い面があります。",
    "koukana_seme": "端攻め、継ぎ歩でのコビン攻め、上部からの抑え込み"
  },
  {
    "name": "エルモ囲い",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "短手数で横からの攻めに強いコンパクトな囲いですが、玉が一段目にいるため、上部からの押し込みや斜め（コビン）のラインからの攻めに弱いです。",
    "koukana_seme": "8筋からの攻め、斜めからの角のライン攻め"
  },
  {
    "name": "ボナンザ囲い",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "金銀をL字に並べて角の割打ちや打ち込みを防ぎますが、手数が短い簡易的な囲いのため、玉頭（上部）からの攻めや斜めからの攻めに弱い面があります。",
    "koukana_seme": "玉頭からの歩の叩きや、桂馬を跳ねて上から圧迫する攻め"
  },
  {
    "name": "中住まい",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "bottom"],
    "yowami": "左右のバランスが非常に良く隙が少ないため急戦に向きますが、囲いとしての堅さは低く、中央突破や下段（底）からの挟み撃ちに弱いです。",
    "koukana_seme": "5筋からの中央突破、一段目への飛車下ろし、左右からの挟み撃ち"
  },
  {
    "name": "アヒル囲い",
    "category": {
      "type": "common",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "横からの攻めや、隙間のない陣形により角の打ち込みには極めて強いですが、上部（玉頭）が完全に薄いため、上からの押し込みには非常に脆いです。",
    "koukana_seme": "中央からの上部突破、歩を連打して上から金銀を圧迫する攻め"
  },
  {
    "name": "美濃囲い",
    "category": {
      "type": "furibisha",
      "structure": "lateral"
    },
    "weakpoint": ["edge", "head", "kobini"],
    "yowami": "横からの攻めには抜群の耐久力を誇りますが、端攻め、玉頭からの抑え込み、斜め（コビン）のラインからの攻めに弱い性質があります。",
    "koukana_seme": "端歩攻め、継ぎ歩でのコビン攻め、角と桂馬の斜めの攻め"
  },
  {
    "name": "片美濃囲い",
    "category": {
      "type": "furibisha",
      "structure": "lateral"
    },
    "weakpoint": ["edge", "head", "kobini"],
    "yowami": "美濃囲いよりもさらに早く組めますが、守備の金が1枚少ないため本美濃に比べて横からの耐久力も劣り、端や斜めからの攻めにも脆いです。",
    "koukana_seme": "4九（または6一）への金銀の打ち込み、端攻め、コビン攻め"
  },
  {
    "name": "高美濃囲い",
    "category": {
      "type": "furibisha",
      "structure": "lateral"
    },
    "weakpoint": ["edge", "kobini", "bottom"],
    "yowami": "美濃囲いの上部（玉頭）を金で補強した形ですが、金が上ずった分だけ下段（底）が薄くなっており、端攻めや斜めからの攻め、下からの飛車攻めに弱い面があります。",
    "koukana_seme": "一段目への飛車下ろし、端攻め、横からの攻め"
  },
  {
    "name": "銀冠",
    "category": {
      "type": "furibisha",
      "structure": "vertical"
    },
    "weakpoint": ["bottom", "kobini"],
    "yowami": "美濃囲いから発展し、玉頭（上部）の攻めに対しては非常に堅いですが、金銀が上に偏っているため、下段（底）や横からの攻めに弱い面があります。",
    "koukana_seme": "下段への飛車打ちから、横からの攻め"
  },
  {
    "name": "穴熊",
    "category": {
      "type": "common",
      "structure": "absolute"
    },
    "weakpoint": ["bottom", "kobini", "edge"],
    "yowami": "王が一番深く「絶対に王手がかからない」遠さが最大の武器ですが、端攻め、斜め（コビン）からのと金攻め、底からの崩しを受けると逃げ道がなく一気に潰される危険があります。",
    "koukana_seme": "端歩の突き捨てからのと金作り、斜めからのと金攻め、上からの攻め"
  },
  {
    "name": "金無双",
    "category": {
      "type": "furibisha",
      "structure": "vertical"
    },
    "weakpoint": ["edge", "kobini"],
    "yowami": "相振り飛車において素早く強固に上部を守れますが、銀が「壁銀」となりやすく玉の逃げ道を塞ぐため、端攻めや斜め（コビン）からの攻めに非常に弱いです。",
    "koukana_seme": "4筋の攻め、コビンへの集中攻撃、壁銀に追い込む攻め"
  },
  {
    "name": "舟囲い",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "bottom"],
    "yowami": "居飛車急戦用の代表的な足がかりとして素早く組めますが、全体的に肉薄で薄く、玉頭からのこじ開けや、下段（底）への金銀の割り打ちに極めて脆いです。",
    "koukana_seme": "玉頭からの歩と桂馬による攻め、4九（または6九）への割り打ち、端攻め"
  },
  {
    "name": "カニ囲い",
    "category": {
      "type": "ibisha",
      "structure": "vertical"
    },
    "weakpoint": ["bottom", "kobini"],
    "yowami": "矢倉への移行途中で用いられ上部への備えはありますが、玉が一段目にいて左右が狭いため、横からの攻めや下段（底）からの侵入、斜め（コビン）からの攻めに弱いです。",
    "koukana_seme": "横からの飛車攻め、下段への金銀の打ち込み、斜めからのライン攻め"
  },
  {
    "name": "雁木囲い",
    "category": {
      "type": "ibisha",
      "structure": "vertical"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "上部へのバランスが非常に良く引き角などとの相性も良いですが、玉が一段目にいることが多く、玉頭からの強襲や斜め（コビン）からの攻め、端攻めに弱いところがあります。",
    "koukana_seme": "玉頭からの歩の突き捨てを交えたこじ開け、桂馬を絡めた斜めからの攻め、端攻め"
  },
  {
    "name": "金美濃",
    "category": {
      "type": "furibisha",
      "structure": "lateral"
    },
    "weakpoint": ["kobini", "bottom"],
    "yowami": "角交換に強く5七（または5三）の地点をカバーしていますが、金が美濃の本来の位置からズレているため、下段（底）からの銀打ちやコビン攻めに弱いです。",
    "koukana_seme": "4九（または6九）への割り打ち・銀打ち、斜めからのコビン攻め"
  },
  {
    "name": "木村美濃",
    "category": {
      "type": "furibisha",
      "structure": "vertical"
    },
    "weakpoint": ["edge", "bottom"],
    "yowami": "桂馬を攻撃に活用しやすく上部への備えはありますが、玉の近くに金銀が密集していないため、端攻めや下段（底）からの潜り込みに脆い部分があります。",
    "koukana_seme": "端歩攻め、下段への飛車下ろし、横から金銀を剥がす攻め"
  },
  {
    "name": "ダイヤモンド美濃",
    "category": {
      "type": "furibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "金銀4枚をひし形に連結させるため横からの攻めには鉄壁を誇りますが、手数が非常にかかり、玉頭（上部）や斜め（コビン）のラインからの攻めが急所となります。",
    "koukana_seme": "桂馬を絡めた玉頭への集中攻撃、コビンからのこじ開け、と金攻め"
  },
  {
    "name": "松尾流穴熊",
    "category": {
      "type": "ibisha",
      "structure": "absolute"
    },
    "weakpoint": ["kobini", "bottom"],
    "yowami": "居飛車穴熊の中でも最強クラスの堅さと遠さを誇りますが、組み上げるまでに多くの手数を要し、一度崩されると斜め（コビン）からのと金攻めや底からの攻めに逃げ道がありません。",
    "koukana_seme": "斜めからのと金攻め、底に金を張り付かせる攻め、中央からの挟み撃ち"
  },
  {
    "name": "箱入り娘",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "舟囲いに比べて守備駒は密着していますが、玉の逃げ道が非常に狭く、玉頭からの攻めやコビン攻め、端攻めを受けると一気に息詰まり（頓死）しやすいです。",
    "koukana_seme": "端攻め、玉頭からの歩や桂馬での叩き、コビンからの角のライン攻め"
  },
  {
    "name": "右玉",
    "category": {
      "type": "ibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "玉の逃げ道が広く、相手の攻めを受け流しながらカウンターを狙うバランス重視の構えですが、囲いとしての堅さは低く、玉頭（上部）からの押し込みやコビン攻めに弱いです。",
    "koukana_seme": "上部からの歩・銀による抑え込み、端を絡めた上部からの突入"
  },
  {
    "name": "左玉",
    "category": {
      "type": "furibisha",
      "structure": "lateral"
    },
    "weakpoint": ["head", "kobini"],
    "yowami": "意表を突くカウンター用の特殊な玉配置で、逃げ道は広いですが、囲い自体の強度は低いため、玉頭からの抑え込みや斜め（コビン）からの狙い撃ちに弱いです。",
    "koukana_seme": "上部からの歩や銀による圧迫、斜めの角ラインを活かしたコビン攻め"
  }
];

