import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
        console.log("서버 응답 데이터:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/main", { replace: true });
        } else {
          console.log("에러 메세지:", data.message);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error("로그인 에러", err);
        navigate("/", { replace: true });
      });
  }, [code, navigate]);

  return <h1>로그인 중입니다...</h1>; // 임시 화면
}

export default KakaoRedirect;
