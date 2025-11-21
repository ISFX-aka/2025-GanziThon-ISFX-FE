import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// public 폴더에 저장 시 경로 (예: public/loading.gif)
const SAVING_GIF = "src/assets/img/icons8-구하다.gif";

// styled-components 예시
const SavingWrapper = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SavingImg = styled.img`
  width: 33px;
  height: 33px;
`;

export default function SavingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // 원하는 경로로 이동
      navigate("/main");
    }, 3500); // 3.5초 후 이동
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <SavingWrapper>
      <SavingImg src={SAVING_GIF} alt="로딩중" />
    </SavingWrapper>
  );
}
