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

const MultiSelc = styled.span`
  font-size: smaller;
`;

const transports = [
  { label: "도보", value: "walk" },
  { label: "지하철", value: "subway" },
  { label: "버스", value: "bus" },
  { label: "택시", value: "taxi" },
];

export default function Vehicle() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (idx) => {
    let updated;
    if (selected.includes(idx)) {
      updated = selected.filter((i) => i !== idx);
    } else {
      updated = [...selected, idx];
    }
    setSelected(updated);
    const selectedVals = updated.map((i) => transports[i].value);
    localStorage.setItem("transport_mode", JSON.stringify(selectedVals));
  };

  const handlePrev = () => navigate(-1);
  const handleNext = () => {
    if (selected.length > 0) navigate("/crowding");
  };

  return (
    <Wrapper>
      <Content>
        <Step>6/3</Step>
        <Question>
          주로 이용한 이동수단은?
          <br />
          <MultiSelc>(복수 선택 가능)</MultiSelc>
        </Question>
        <ButtonGroup>
          {transports.map((t, idx) => (
            <EmotionBtn
              key={t.label}
              onClick={() => handleSelect(idx)}
              selected={selected.includes(idx)}
            >
              {t.label}
            </EmotionBtn>
          ))}
        </ButtonGroup>
      </Content>
      <BottomBar
        onPrev={handlePrev}
        onNext={handleNext}
        nextDisabled={selected.length === 0}
      />
    </Wrapper>
  );
}
