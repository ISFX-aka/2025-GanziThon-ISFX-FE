import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// SVG 원형 프로그레스 차트
const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0 32px 0;
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
`;

function EnergyCircle({ percent }) {
  const radius = 48;
  const stroke = 10;
  const normalizedPercent = Math.round(percent);
  const circum = 2 * Math.PI * radius;
  const offset = circum - (normalizedPercent / 100) * circum;
  return (
    <CircleWrapper
      style={{ position: "relative", width: "120px", height: "120px" }}
    >
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
      <ProgressText style={{ position: "absolute", width: "100%" }}>
        {normalizedPercent}%
      </ProgressText>
    </CircleWrapper>
  );
}

// 주요 결과 텍스트 UI 구성
const DateText = styled.div`
  font-size: 1.4em;
  color: #223d59;
  font-weight: bold;
  text-align: center;
  margin-top: 36px;
`;

const SectionTitle = styled.div`
  font-size: 1.05em;
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 16px 0 4px 0;
`;

const SmallText = styled.div`
  font-size: 1em;
  text-align: center;
  color: #666;
  margin-bottom: 10px;
`;

const JournalText = styled.div`
  font-size: 1.1em;
  color: #577;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  margin: 40px 0 0 0;
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

// 로딩 컴포넌트 예시
const LoadingWrapper = styled.div`
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SurveyResultPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 설문 제출 값을 requestBody로 구성해서 POST
        const requestBody = {
          /* ...로컬스토리지 등에서 취합... */
        };
        const response = await axios.post("/api/records", requestBody);
        setResult(response.data);
      } catch (e) {
        // 에러 처리 (예: 에러페이지 이동)
        setResult(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    // 로딩중 화면
    return (
      <LoadingWrapper>
        <div>...</div>
      </LoadingWrapper>
    );
  }

  if (!result) {
    return (
      <LoadingWrapper>
        <div>결과를 불러올 수 없습니다.</div>
      </LoadingWrapper>
    );
  }

  // response data 예시에서 필요한 값 추출
  const { record_date, journal, energy_score } = result;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        background: "#fff",
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
        <PrescribeBtn>AI 처방 생성</PrescribeBtn>
        <SaveBtn>저장하기</SaveBtn>
      </ButtonGroup>
    </div>
  );
}
