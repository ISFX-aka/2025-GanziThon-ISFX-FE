import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  background: transparent;
  pointer-events: none;
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

// 주요 UI 스타일
const DateText = styled.div`
  font-size: 1.4em;
  color: #223d59;
  font-weight: bold;
  text-align: center;
  margin-top: 30%;
  margin-bottom: 30%;
`;

const SectionTitle = styled.div`
  font-size: 1.05em;
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 30px 0 11px 0;
`;

const JournalText = styled.div`
  font-size: 1.1em;
  color: #6e7388;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  margin: 240px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
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

const ResultPageLoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 54px;
  height: 54px;
`;

const LOADING_GIF = "src/assets/img/icons8-도트-로딩.gif";

export default function SurveyResultPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 로컬스토리지에서 request body 값 가져오기
  function getRequestBody() {
    //  로컬스토리지에 저장된 값(key)
    return {
      emotion_level: Number(localStorage.getItem("emotion_level")),
      conversation_level: Number(localStorage.getItem("conversation_level")),
      transport_mode: localStorage.getItem("transport_mode"),
      congestion_level: Number(localStorage.getItem("congestion_level")),
      location: localStorage.getItem("location") || "강남구",
      journal: localStorage.getItem("journal"),
    };
  }

  useEffect(() => {
    async function fetchResult() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const body = getRequestBody();
        const response = await axios.post(
          "http://3.36.228.115:8080/api/records",
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResult(response.data.data);
      } catch (e) {
        setError(
          e?.response?.data?.message ||
            "에너지 기록을 불러오는 도중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, []);

  if (loading) {
    return (
      <ResultPageLoadingWrapper>
        <LoadingImg src={LOADING_GIF} alt="로딩중" />
        <p>결과를 기다리고 있어요</p>
      </ResultPageLoadingWrapper>
    );
  }

  if (error) {
    return (
      <ResultPageLoadingWrapper>
        <div>{error}</div>
      </ResultPageLoadingWrapper>
    );
  }

  if (!result) {
    return (
      <LoadingWrapper>
        <div>결과를 불러올 수 없습니다.</div>
      </LoadingWrapper>
    );
  }

  // 명세 응답 구조 반영
  const {
    record_date,
    journal,
    energy_score,
    ai_prescription,
    weather_log,
    energy_level,
  } = result;
  function formatKoreanDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
  }
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
      <DateText>{formatKoreanDate(record_date)}</DateText>
      <SectionTitle>
        오늘의 <span style={{ color: "#7daee1" }}>에너지</span> 점수에요
      </SectionTitle>
      <EnergyCircle percent={energy_score} />
      <SectionTitle>오늘의 한 줄 일기</SectionTitle>
      <JournalText>&quot;{journal}&quot;</JournalText>
      {/* AI 처방, 날씨, 추가 데이터 필요시 카드/추가 컴포넌트 구성 */}
      <ButtonGroup>
        <PrescribeBtn onClick={() => navigate("/airesult")}>
          AI 처방 생성
        </PrescribeBtn>
        <SaveBtn onClick={() => navigate("/saving")}>저장하기</SaveBtn>
      </ButtonGroup>
    </div>
  );
}
