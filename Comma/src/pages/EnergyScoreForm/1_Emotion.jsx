import React, { useState } from "react";
import styled from "styled-components";
import BottomBar from "../../components/BottomBar";

const Wrapper = styled.div`
  width: 393px;
  height: 852px;
  background: #fff;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Step = styled.div`
  margin-top: 44px;
  font-size: 16px;
  color: #444;
`;

const Question = styled.div`
  margin: 60px 0 36px 0;
  font-size: 22px;
  font-weight: 700;
  color: #222;
  text-align: center;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 90%;
  margin: 0 auto;
`;

const EmotionBtn = styled.button`
  padding: 18px 0;
  border: none;
  border-radius: 12px;
  background: #f5f7fa;
  font-size: 18px;
  color: #323d4f;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.03);
  transition: background 0.2s;
  &:active,
  &:focus {
    background: #c0d3ee;
  }
`;

const emotions = [
  { label: "서럽다", value: 10 },
  { label: "행복하다", value: 30 },
  { label: "피곤하다", value: 10 },
  { label: "화가난다", value: 0 },
  { label: "평온하다", value: 20 },
];

export default function Emotion({ onNext, onPrev }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (idx) => {
    setSelected(idx);
    localStorage.setItem("energy level", emotions[idx].value);
  };

  return (
    <Wrapper>
      <Content>
        <Step>6/1</Step>
        <Question>
          하루가 끝난 지금,
          <br />
          당신의 감정상태는 어떤가요?
        </Question>
        <ButtonGroup>
          {emotions.map((emo, idx) => (
            <EmotionBtn
              key={emo.label}
              onClick={() => handleSelect(idx)}
              style={{
                background: selected === idx ? "#c0d3ee" : "#f5f7fa",
              }}
            >
              {emo.label}
            </EmotionBtn>
          ))}
        </ButtonGroup>
      </Content>
      <BottomBar onPrev={onPrev} onNext={onNext} />
    </Wrapper>
  );
}
