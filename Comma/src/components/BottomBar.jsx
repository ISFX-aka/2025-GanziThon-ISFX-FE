import React from "react";
import styled, { css } from "styled-components";

const Bar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 0px;
  position: absolute;
  bottom: 0;
  justify-content: center;
`;

const Btn = styled.button`
  font-size: 17px;
  display: inline-block;
  background: #dddfe9;
  color: #3a506b;
  border: none;
  border-radius: 10px;
  padding: 9px 24px;
  cursor: pointer;
  transition: background 0.3s;

  &.prevBtn {
    margin-right: 75px;
  }

  &.nextBtn {
    margin-left: 84px;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: #eee;
      color: #888;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

export default function BottomBar({ onPrev, onNext, nextDisabled }) {
  return (
    <Bar>
      <Btn className="prevBtn" onClick={onPrev}>
        이전
      </Btn>
      <Btn
        className="nextBtn"
        onClick={nextDisabled ? undefined : onNext}
        disabled={nextDisabled}
      >
        다음
      </Btn>
    </Bar>
  );
}
