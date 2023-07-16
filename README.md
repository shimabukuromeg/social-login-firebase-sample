# social-login-firebase-sample

## get started

```bash
# ツールインストール
$ npm install -g firebase-tools

# バージョン確認
$ firebase --version

# ログイン
$ firebase login

# プロジェクト作成
$ firebase init

# デプロイ
$ firebase deploy

# ビルド & デプロイ
$ npm run deploy
```

## シーケンス図

```mermaid
sequenceDiagram
    participant A as Browser/User
    participant B as App
    participant C as FirebaseAuth
    participant D as IdP
    A->>B: 1.ログイン操作（Googleでログインするボタン）
    B->>C: 2.アプリがGoogleログインに<br />に関するFirebaseAuthのAPI<br>を呼び出す。<br><br>signInWithPopup(auth, provider）
    C->>D: 3.FirebaseAuthが<br>IdP(Google)に対して<br>ログイン処理を開始する<br>リクエストする
    D->>A: 4.IdP(Google)とUserでGoogle認証が行われる（ブラウザにポップアップ表示される）
    D->>C: 5.認証が成功するとIdPから<br>IDトークンとアクセストークンを<br>Firebase authが取得する
    C->>C: 6.FirebaseAuthがIDトークンを検証し<br>UserがIdPによって認証されたことを確認する
    C->>C: 7.FirebaseAuthがセッションを発行し<br>Userをログイン状態にする
    C->>B: 8.2のレスポンスとして<br>ユーザー情報を取得（ポップアップが閉じる）
```
