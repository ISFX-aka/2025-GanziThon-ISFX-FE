import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from './LoginPage.module.css';

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (!code) return;
    console.log("전송할 인가코드: ", code);

    fetch("http://3.36.228.115:8080/api/auth/social/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "kakao", code: code }),
    })
      .then((res) => {
        console.log("응답 상태:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("응답 데이터:", data);
        if (data.data.token) {
          console.log("토큰:", data.data.token);
          localStorage.setItem("token", data.data.token);
          navigate("/main", { replace: true });
        } else {
          console.log("message:", data.message);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error("로그인 에러", err);
        navigate("/", { replace: true });
      });
  }, [code, navigate]);

  return (
    <div className={styles.viewport}>
      <div className={styles.container}>
        로그인 중입니다...⏳
      </div>
    </div>
  );
}

export default KakaoRedirect;
