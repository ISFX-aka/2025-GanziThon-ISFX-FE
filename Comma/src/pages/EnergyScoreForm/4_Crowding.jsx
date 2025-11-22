import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BottomBar from "../../components/BottomBar";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  margin: 0 auto;
  border-radius: 20px;
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
  justify-content: center;
  align-items: stretch;
  gap: 14px;
  width: 90%;
  margin: 0 auto;
  height: 370px;
`;

const EmotionBtn = styled.button`
  padding: 18px 0;
  border: none;
  border-radius: 12px;
  background: ${({ selected }) => (selected ? "#c0d3ee" : "#DDDFE9")};
  font-size: 18px;
  color: #323d4f;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.03);
  transition: background 0.2s;
`;

const congestion = [
  { label: "매우 한산", value: 1 },
  { label: "한산함", value: 2 },
  { label: "보통", value: 3 },
  { label: "혼잡", value: 4 },
  { label: "매우 혼잡", value: 5 },
];

export default function Congestion() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (idx) => {
    setSelected(idx);
    localStorage.setItem("congestion_level", congestion[idx].value);
  };

  const handlePrev = () => navigate(-1);
  const handleNext = () => {
    if (selected !== null) navigate("/area");
  };

  return (
    <Wrapper>
      <Content>
        <Step>6/4</Step>
        <Question>혼집도는 어땠나요?</Question>
        <ButtonGroup>
          {congestion.map((c, idx) => (
            <EmotionBtn
              key={c.label}
              onClick={() => handleSelect(idx)}
              selected={selected === idx}
            >
              {c.label}
            </EmotionBtn>
          ))}
        </ButtonGroup>
      </Content>
      <BottomBar
        onPrev={handlePrev}
        onNext={handleNext}
        nextDisabled={selected === null}
      />
    </Wrapper>
  );
}
