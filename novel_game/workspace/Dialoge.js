
var buttonFont;
var dialoge
var bedroom, hodou, gamecenter1, slotmachine, slotmachine_rat, darkness, noumen;
function preload(){
    bedroom = loadImage('/images/shinsitsu.jpg')
    gamecenter1 = loadImage('/images/gamecenter.gif')
    hodou = loadImage('/images/hodou.jpg')
    slotmachine = loadImage('/images/slotmachine.jpg')
    slotmachine_rat = loadImage('/images/slotmachine_rat.jpg')
    darkness = loadImage('/images/nullImage.jpg')
    noumen = loadImage('/images/noumen.jpg')
    
    buttonFont = loadFont('/Button.ttf');
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------------//
    
    dialoge = {
        "chapter1":[
            bedroom, "金っていうのは、不思議なものだ。", "金に人生を狂わされる奴もいれば、金をあたかも飼いならしてるような奴もいる。",
            "ただの金貨や札束が人を殺せる力を持ってる。", "去年死んだ友人も、もめた原因は家族がらみの借金だったらしい。",　"友人は自殺だった。",
            "俺はというと．．．",　"飼われる側だろう。",　"まだガキだったころは夢も持っていたのが…結局行きついた先は消費者だ。",
            "仕事でちょこっと頑張って、美味い飯をちょこっと食って、",　"寝て、起きて、",
            "空いた時間でゲームセンターに行く。長年に慣れた体はそんな人生から抜け出せなくなっていた。", "中途半端な幸せは、いつしか不快感のある虚無感へと変わっていく。", "それでも、やめられない。",
            "沼のように執拗に獲物を逃がさないシステムは、さながら獲物を引きずり込むワニのようだ。", "時間を無駄にするこの感覚から抜け出せるものなら、ぜひどうすればいいのかお聞きしたい。",
            "そんな考えを脳の端に押しのけ、俺はまたもや「ラビリンス」へ向かってしまっていた。", hodou, 
            
            "外に出ると、空は黒に染まっていた。ちょうどいいくらいの風が肌になじんでくる。",
            "街灯やカフェがぽつりぽつりと歩道を照らし、首をどこに向けても一つの絵画のような美を感じさせた。",　"夜にもなると、昼に歩道を歩いていた老若男女達の割合も片寄り始めてくる。",
            "小学生の姿はほとんど見当たらず、帰宅する中年、散歩中の老人、数人の中高生などが間隔をあけて確認できる程度だ。",　"俺が歩くたびに、足元から伸びた影が伸び縮みする。それをボーっと見ながら、歩いていく。",
            "「おっと、急がないと．．．」",　"ラビリンスは午後十一時に閉店するため、俺は足を急がせた",
            gamecenter1,
            
            
            "ゲームセンター「ラビリンス」の中は、夜だというのに目が痛くなるほどのまぶしさだった。", "耳にはゲームセンター特有のジャカジャカとした機械音が飛び込んでくる。",
            "さっきまでの孤独感とは打って変わって、何人もの客がそこらじゅうに散らばっていた。道では距離感のあった人々とも、この空間ではどこか心の通じる感覚がある。",
            "「きっと俺みたいなやつもいるだろう」「全員が「勝利」という共通目標を持っている」「敗北も勝利も味わってだろう」",
            "そんな認識が、ここにいる人間達への親密感を濃くしていた。", "ちょっとした常連と軽いお辞儀をする、どうやらゲームに勝っているらしく、コインがかご一杯に詰まっていた。",
            "他人の不幸は蜜の味、こういう時はこれが当てはまらない例の一つだ。", "いつもよりどことなく高揚した俺は、そそくさとコインを受け取り、いつもの台に向かった。",slotmachine,
            
            "俺のお気に入りの台は、ゲームセンターの端のほうにあり、あまり人目につかないコーナーの一角にある。",　　
            "めずらしく古風なアメリカ風の台で、不思議とノスタルジックな気分になるその台を、俺は気に入っていた。",
            "何度もやっていくうちに、少しは勝率が上がっていき、自然と「自分の台」になっていった台だ。",　
            
            "ガチャッ．．．ガチャッ", "ギ～．．．ッコン", "コインを入れると、台の中で仕掛けが動いていくのが聞こえた。", "ガラガラガラ！！！",　
            "スロットが回り始める。目にも止まらないスピードで、残された残像が翻弄してくる仕掛けだ．．．が、", "俺はタイミングを読み、高速でレバーを振り下げた。",
            "その時、", slotmachine_rat,
            
            "ドスッ", "隣に誰かが座ったのが分かった", "いくらゲームセンターとはいえ、隣にいる人間に終始無言というのもどうかと思う。", "俺は", 
            ["select", ["右を見る","それに、仲良くしている常連の可能性もある。はたまた、俺と同じ台の好みを持つ人間だったらなお良し、話も広がるだろう。"], ["前を向き続ける","この時点で、俺にはひとつ違和感があった。"], ["左を向く",　"何か、右に座った人物にとてつもなく嫌な予感がした。"]],
            
            "この時点で、俺にはひとつ違和感があった。", "こんなに人目につかないコーナーに、しかもわざわざ俺の隣に座るこの人間に、何か嫌な予感がしたのだ",
            "俺の知ってる常連だったとしたら、挨拶くらいあってもおかしくない。", "俺に目を付けためんどくさい人間と目が合って、今日の気分を害するのもご免だ。",
            "右の人間に警戒しつつ、スロットを凝視する。", "先ほどのスロットが減速しはじめた。", "ゆっくりと、左のリールが停止に近づく。",
            "７の数字が通り過ぎ．．．ようとし、引き戻され、中央にそろった。", "中央のリールも、同様の動作をなぞる。俺の興奮は跳ね上がった。",
            "そんな俺をよそに、スロットは最後のリール、右のリールの停止に差し掛かった。",
            ["select", ["俺は死んだ",bedroom]],
            
            "それに、仲良くしている常連の可能性もある。はたまた、俺と同じ台の好みを持つ人間だったらなお良し、話も広がるだろう。", "俺は右を向いた。",
            darkness, "．．．瞬間、俺は凍った。", "悲鳴を上げそうな喉に、かろうじて栓をする。", "釘付けになった目は、そらそうとしてもそらせない。",
            "目の前に", noumen, "．．．能面だ。", "能面をつけた顔が、こちらを凝視している。",　"あまりに予想だにしなかった相手に、脳が真っ白になる",
            "いたずらの類ではないと、直感的に理解する。", "背景の鮮やかなゲームセンターと、数センチほど近くに浮かぶ能面との対比は、さながら天国と地獄だ。",
            "無表情なまっしろな顔をした能面は、つけているモノの正体を想像させる。", "両脇からすらりと垂れた髪の毛、着ている着物から、女性であることは予想できたが、",　
            "掻き立てられる想像は、次々と人間ではないモノを創り出していく。", "昔どこかで読んだ妖怪、地区内での都市伝説、のっぺらぼう、どの可能性をあたっても、まともな結果は出てこない。", "俺がとった行動は",
            ["select", ["目的を聞く","「な…なんでしょうか？」"], ["何者かを聞く","「ど、どなたでしょうか？」"], ["この場から去る",""]],
            
            "「な…なんでしょうか？」", "咄嗟に出た唯一の言葉だった。", "相手が何であれ、俺に何を求めているのかを追求した言葉だ。",
            "．．．", "沈黙が流れる。", "空気が秒を追うごとに張り詰めていき、いてもたってもいられなくなってきた。",
            "俺は席を立とうと、椅子に手をかけた、", "その瞬間、",
            "「なんで．．．殺した。」", "女がまるで喉をつぶされたかのような声で呟いた", "それに．．．俺は人殺しなどした覚えがない。",
            "俺は一刻も早くこの場を立ち去ろうと、椅子から立ち上がろうとする。",
            "「おおかぶりじゃ、おおかぶりじゃ」", "女の声が大きくなる", "「おおかぶりじゃ！悪足が！！！」", "「悪足が！！！呪い殺してやろうか！！！」",　
            "「おおそうだ、呪い殺してやろう！！！」", "女の声は、次第に大きくなっていき、わけのわからない言葉を連呼する", 
            "「おおそうだ、呪い殺してやろう！！！呪い殺してやろう！！！ひひひひ」", "「ひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひひ」",
            "狂気じみた笑い声に、俺はたまらずゲームセンターをとび出した", 
            
            "「ど、どなたでしょうか？」", "咄嗟に出た唯一の言葉だった。", "相手が何を求めているのかより、相手が何者なのかを追求した言葉だった。",
            "「なんで．．．殺した。」", "「つがもねえ、しょうつれもない！」",
            ["select", ["俺は死んだ",bedroom]],
            
            "何か、右に座った人物にとてつもなく嫌な予感がした。", "脳内で鳴り響いたブザー音に、俺は咄嗟に左を向いた。",
            ["select", ["俺は死んだ",bedroom]],
        ]
    }
}
