import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LOADING_GIF = "src/assets/img/icons8-도트-로딩.gif";

const LoadingWrapper = styled.div`
  background: #f8f8f8;
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
      navigate("/result");
    }, 3500);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <LoadingWrapper>
      <LoadingImg src={LOADING_GIF} alt="로딩중" />
    </LoadingWrapper>
  );
}
