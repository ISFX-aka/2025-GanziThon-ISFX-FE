import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e7e7e7;
  background: #fff;
  padding: 0px 33px;
  position: absolute;
  bottom: 0;
`;

const Btn = styled.button`
  font-size: 17px;
  background: #e8f0fe;
  color: #3a506b;
  border: none;
  border-radius: 10px;
  padding: 9px 26px;
  cursor: pointer;
`;

export default function BottomBar({ onPrev, onNext }) {
  return (
    <Bar>
      <Btn onClick={onPrev}>이전</Btn>
      <Btn onClick={onNext}>다음</Btn>
    </Bar>
  );
}
