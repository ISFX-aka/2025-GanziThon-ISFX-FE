import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SAVING_GIF = "../../assets/img/icons8-구하다.gif";

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
      navigate("/main");
    }, 3500);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <SavingWrapper>
      <SavingImg src={SAVING_GIF} alt="로딩중" />
    </SavingWrapper>
  );
}
