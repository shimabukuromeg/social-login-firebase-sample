import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";

initializeApp(firebaseConfig);

const redirectToMyPageWhenLoginSuccess = async (provider) => {
  try {
    const auth = getAuth();
    console.log("auth", auth);
    /**
     * ログインに成功した場合、signInWithPopup()の返り値である
     * resultにはIdPから取得したユーザーの属性情報が含まれています。
     * その中で重要な情報はメールアドレスの確認フラグである
     * result.user.emailVerified です
     *
     * emailVerified が true メールアドレスが確認ずみ
     * emailVerified が false メールアドレスが確認されていない
     */
    const result = await signInWithPopup(auth, provider);
    console.log("result", result);
    // メールが確認されていない場合はメール登録画面に遷移する
    if (!result.user.emailVerified) {
      window.location.href = "register-email.html";
      return;
    }
    window.location.href = "/";
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      alert(
        `${error.customData.email}は他の SNS と連携した既存ユーザーが登録済みです。既存ユーザーでログイン後、こちらの SNS との連携が可能です。`
      );
      return;
    }
    alert(`ログイン/新規登録に失敗しました。\n${error.message}`);
  }
};

// Google ログインボタン
const googleLogin = () => {
  redirectToMyPageWhenLoginSuccess(new GoogleAuthProvider());
};
document.getElementById("googleLogin").addEventListener("click", googleLogin);

// GitHub ログインボタン
const githubLogin = () => {
  redirectToMyPageWhenLoginSuccess(new GithubAuthProvider());
};
document.getElementById("githubLogin").addEventListener("click", githubLogin);
