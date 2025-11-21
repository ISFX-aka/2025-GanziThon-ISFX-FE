import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./LoginPage.module.css";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    fetch("http://3.36.228.115:8080/api/auth/social/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "kakao", code: code }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("응답 데이터:", data);
        if (data.data.token) {
          const token = data.data.token;
          localStorage.setItem("token", token);
          console.log("토큰 저장 완료!", token);
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
        <p
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: "500"
          }}
        >
          로그인 중입니다...⏳
        </p>
      </div>
    </div>
  );
}

export default KakaoRedirect;
