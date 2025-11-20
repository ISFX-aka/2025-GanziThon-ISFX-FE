import React, { useState } from "react";
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
  margin: 60px 0 180px 0;
  font-size: 22px;
  font-weight: 700;
  color: #222;
  text-align: center;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  width: 90%;
  margin: 0 auto;
`;

const EmotionBtn = styled.button`
  padding: 11px 0;
  width: 120%;
  border: none;
  border-radius: 12px;
  background: ${({ selected }) => (selected ? "#c0d3ee" : "#DDDFE9")};
  font-size: 14px;
  color: #323d4f;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.03);
  transition: background 0.2s;
`;

const areas = [
  { label: "강서구" },
  { label: "은평구" },
  { label: "종로구" },
  { label: "중구" },
  { label: "강북구" },
  { label: "양천구" },
  { label: "영등포구" },
  { label: "서대문구" },
  { label: "성북구" },
  { label: "강동구" },
  { label: "구로구" },
  { label: "금천구" },
  { label: "서초구" },
  { label: "강남구" },
  { label: "송파구" },
  { label: "용산구" },
  { label: "광진구" },
  { label: "성동구" },
  { label: "도봉구" },
  { label: "노원구" },
  { label: "광진구" },
  { label: "마포구" },
  { label: "관악구" },
  { label: "동대문구" },
  { label: "중랑구" },
];

export default function Area() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (idx) => {
    if (selected === idx) {
      setSelected(null);
      localStorage.removeItem("location");
    } else {
      setSelected(idx);
      localStorage.setItem("location", areas[idx].label);
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (selected !== null) {
      navigate("/comment");
    }
  };

  return (
    <Wrapper>
      <Content>
        <Step>6/5</Step>
        <Question>어디서 활동하셨나요?</Question>
        <ButtonGroup>
          {areas.map((area, idx) => (
            <EmotionBtn
              key={area.label}
              onClick={() => handleSelect(idx)}
              selected={selected === idx}
            >
              {area.label}
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
