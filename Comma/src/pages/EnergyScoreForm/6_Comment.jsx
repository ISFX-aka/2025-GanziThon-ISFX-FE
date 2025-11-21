import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BottomBar from "../../components/BottomBar";

// 아이콘 예시: src/assets/journal.png에 이미지 파일 넣었다고 가정
import JournalIcon from "../../assets/img/Writing.png";

const CommentWrapper = styled.div`
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
  margin: 60px 0 12px 0;
  font-size: 22px;
  font-weight: 700;
  color: #222;
  text-align: center;
  line-height: 1.4;
`;

const IconBox = styled.div`
  margin-bottom: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
`;

const InputBox = styled.textarea`
  width: 80%;
  min-height: 56px;
  background: #dddfe9;
  color: #222;
  border: none;
  border-radius: 11px;
  font-size: 18px;
  text-align: center;
  padding: 16px 12px;
  margin-bottom: 50%;
  margin-top: 25%;
  resize: none;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
`;

export default function Journal() {
  const [journal, setJournal] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJournal(e.target.value);
    localStorage.setItem("journal", e.target.value);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (journal.trim() !== "") {
      navigate("/result");
    }
  };

  return (
    <CommentWrapper>
      <Content>
        <Step>6/6</Step>
        <Question>
          오늘 하루를 한 줄 일기로
          <br />
          요약해보아요
        </Question>
        <IconBox>
          <img src={JournalIcon} alt="일기 아이콘" width={44} height={44} />
        </IconBox>
        <InputBox
          rows={2}
          value={journal}
          onChange={handleChange}
          placeholder="예: 시험공부 때문에 힘든 하루였다."
          maxLength={80}
        />
      </Content>
      <BottomBar
        onPrev={handlePrev}
        onNext={handleNext}
        nextDisabled={journal.trim() === ""}
      />
    </CommentWrapper>
  );
}
