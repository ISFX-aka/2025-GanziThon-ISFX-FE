import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

// SVG 원형 프로그레스 차트
const CircleWrapper = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px auto 32px auto;
  position: relative;
  flex-direction: column;
`;
const ProgressText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 1.7em;
  font-weight: 700;
  color: #222;
  background-color: #f8f8f8;
  background: transparent; // 필수! (배경색 없이)
  pointer-events: none; // 클릭방지, SVG와 상호작용 없음
`;

function EnergyCircle({ percent }) {
  const radius = 48;
  const stroke = 10;
  const normalizedPercent = Math.round(percent);
  const circum = 2 * Math.PI * radius;
  const offset = circum - (normalizedPercent / 100) * circum;
  return (
    <CircleWrapper>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#eee"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#7daee1"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circum}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s" }}
        />
      </svg>
      <ProgressText>{normalizedPercent}%</ProgressText>
    </CircleWrapper>
  );
}

// 주요 결과 텍스트 UI 구성
const DateText = styled.div`
  font-size: 1.4em;
  color: #223d59;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const SectionTitle = styled.div`
  font-size: 1.05em;
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 16px 0 4px 0;
  margin-top: 30px;
`;

const JournalText = styled.div`
  font-size: 1.1em;
  color: #6e7388;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  margin: 40px 0 0 0;
  margin-top: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const PrescribeBtn = styled.button`
  box-shadow: none;
  font-size: 1.15em;
  border-radius: 12px;
  border: none;
  background: #313b56;
  color: #fff;
  padding: 16px 0;
  width: 90%;
  margin: 0 auto;
  cursor: pointer;
`;

const SaveBtn = styled.button`
  box-shadow: none;
  font-size: 1.1em;
  border-radius: 12px;
  border: none;
  background: #dddfe9;
  color: #323d4f;
  padding: 16px 0;
  width: 90%;
  margin: 0 auto;
  cursor: pointer;
`;

const LoadingWrapper = styled.div`
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LOADING_GIF = "src/assets/img/icons8-도트-로딩.gif";

// styled-components 예시
const Wrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingImg = styled.img`
  width: 54px;
  height: 54px;
`;

export default function SurveyResultPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // axios 요청 코드 주석처리, 임시 데이터 삽입
    setTimeout(() => {
      setResult({
        record_date: "2025년 11월 4일",
        journal: "시험 공부 때문에 힘든 하루였다.",
        energy_score: 80,
      });
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <LoadingImg src={LOADING_GIF} alt="로딩중" />
        <br />
        <p>결과를 기다리고 있어요</p>
      </Wrapper>
    );
  }

  if (!result) {
    return (
      <LoadingWrapper>
        <div>결과를 불러올 수 없습니다.</div>
      </LoadingWrapper>
    );
  }

  const { record_date, journal, energy_score } = result;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        alignItems: "center",
        background: "#f8f8f8",
        padding: 0,
      }}
    >
      <DateText>{record_date}</DateText>
      <SectionTitle>
        오늘의 <span style={{ color: "#7daee1" }}>에너지</span> 점수에요
      </SectionTitle>
      <EnergyCircle percent={energy_score} />
      <SectionTitle>오늘의 한 줄 일기</SectionTitle>
      <JournalText>&quot;{journal}&quot;</JournalText>
      <ButtonGroup>
        <PrescribeBtn onClick={() => navigate("/airesult")}>
          AI 처방 생성
        </PrescribeBtn>
        <SaveBtn onClick={() => navigate("/saving")}>저장하기</SaveBtn>
      </ButtonGroup>
    </div>
  );
}
