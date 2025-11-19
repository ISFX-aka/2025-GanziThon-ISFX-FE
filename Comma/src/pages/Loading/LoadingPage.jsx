import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// public 폴더에 저장 시 경로 (예: public/loading.gif)
const LOADING_GIF = "src/assets/img/icons8-도트-로딩.gif";

// styled-components 예시
const Wrapper = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingImg = styled.img`
  width: 54px;
  height: 54px;
`;

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // 원하는 경로로 이동
      navigate("/result");
    }, 3500); // 3.5초 후 이동
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Wrapper>
      <LoadingImg src={LOADING_GIF} alt="로딩중" />
    </Wrapper>
  );
}
