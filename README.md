# 将棋道場 🏯

将棋の大局観を鍛えるトレーニングアプリです。
具体的な盤面ではなく、手筋・格言・形勢判断・囲い相性・序中終盤の考え方をAIが出題・採点します。

ツルギ（執事）、イロハ（清楚ギャル）、カエデ（理系大学生）の3キャラがランダムに出題してくれます。

---

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/あなたのユーザー名/shogi-dojo.git
cd shogi-dojo
```

### 2. 依存パッケージをインストール

```bash
npm install
```

### 3. APIキーを設定

```bash
cp .env.example .env
```

`.env` を開いて `your_api_key_here` を実際の Anthropic APIキーに書き換えてください。

```
REACT_APP_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxx
```

APIキーは https://console.anthropic.com で取得できます。

### 4. 起動

```bash
npm start
```

ブラウザで http://localhost:3000 が開きます。

---

## Vercelで公開する（他の人に遊んでもらう）

1. [Vercel](https://vercel.com) にGitHubアカウントでサインイン
2. 「Add New Project」→ このリポジトリを選択
3. 「Environment Variables」に以下を追加：
   - `REACT_APP_ANTHROPIC_API_KEY` = あなたのAPIキー
4. 「Deploy」をクリック

デプロイ完了後、発行されたURLを共有すれば誰でも遊べます。

---

## 注意

- APIキーは `.env` に書き、**GitHubには絶対にアップしないでください**（`.gitignore` で除外済みです）
- Vercelの環境変数として設定すれば本番環境でも安全に動作します
- Anthropic APIの利用料金が発生します（従量課金）

---

## 機能

- 5カテゴリ：手筋・格言 / 形勢判断 / 囲い相性 / 定跡の考え方 / 序中終盤
- 難易度選択：初級 / 中級 / 上級
- 自分の戦法選択（囲い相性・定跡問題に反映）
- 直近20問の重複防止
- 3キャラクターがランダムに出題・採点
