import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dotLoading from "../../assets/img/icons8-도트-로딩.gif";
// 스타일 선언부 시작

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f8fa;
  padding: 0;
  @media (max-width: 600px) {
    padding-top: 32px;
  }
`;

const CircleWrapper = styled.div`
  width: 140px;
  height: 140px;
  margin: 20px auto 26px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProgressText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 1.55em;
  font-weight: 700;
  color: #222;
`;

const DateText = styled.div`
  font-size: 1.2em;
  color: #223d59;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 60px;
`;

const SectionTitle = styled.div`
  font-size: 1.15em;
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 17px 0 7px 0;
`;

const JournalText = styled.div`
  font-size: 1.05em;
  color: #6e7388;
  text-align: center;
  margin-bottom: 18px;
`;

const ExplainText = styled.div`
  font-size: 1.04em;
  text-align: center;
  color: #555;
  margin: 7px 0 18px 0;
  padding: 0 13px;
  line-height: 1.42;
`;

const CardGroup = styled.div`
  width: 98%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto 19px auto;
`;

const CardRow = styled.div`
  display: flex;
  gap: 14px;
`;

const SmallCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 13px;
  padding: 14px 14px;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.07);
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LargeCard = styled.div`
  background: #fff;
  border-radius: 13px;
  padding: 12px 15px;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.07);
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  margin-top: 2px;
`;

const ColRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
`;

const Label = styled.span`
  color: #8ca1be;
  font-size: 1.1em;
  font-weight: 550;
`;

const Value = styled.span`
  color: #253b51;
  font-size: 1.08em;
`;

const ButtonRow = styled.div`
  width: 98%;
  max-width: 440px;
  display: flex;
  gap: 19px;
  margin: 0 auto 25px auto;
`;

const NavBtn = styled.button`
  box-shadow: none;
  font-size: 1.12em;
  border-radius: 13px;
  border: none;
  background: #616985;
  color: #fff;
  padding: 17px 0;
  width: 100%;
  cursor: pointer;
`;

const LoadingWrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingImg = styled.img`
  width: 54px;
  height: 54px;
`;

function EnergyCircle({ percent }) {
  const radius = 46;
  const stroke = 11;
  const normalizedPercent = Math.round(percent);
  const circum = 2 * Math.PI * radius;
  const offset = circum - (normalizedPercent / 100) * circum;
  return (
    <CircleWrapper>
      <svg width="140" height="140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#eee"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="70"
          cy="70"
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

function formatKoreanDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function getEmotionText(level) {
  if (level === 5) return "매우 행복";
  if (level === 4) return "행복";
  if (level === 3) return "평온";
  if (level === 2) return "피곤";
  if (level === 1) return "우울";
  return "정보없음";
}
function getConversationText(level) {
  if (level === 5) return "매우 많음";
  if (level === 4) return "많음";
  if (level === 3) return "보통";
  if (level === 2) return "적음";
  if (level === 1) return "거의 없음";
  return "정보없음";
}
function getTransportText(mode) {
  if (mode === "walk") return "도보";
  if (mode === "subway") return "지하철";
  if (mode === "bus") return "버스";
  return mode || "정보없음";
}
function getWeatherText(code) {
  if (code === "clear") return "맑음";
  if (code === "clouds") return "흐림";
  if (code === "rain") return "비";
  if (code === "snow") return "눈";
  return code || "정보없음";
}
function getCongestionText(level) {
  return (
    ["여유로움", "살짝 붐빔", "보통", "붐빔", "매우 붐빔"][level - 1] ||
    "정보없음"
  );
}

export default function AiResult() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // #root의 height를 없애고 싶을 때
    const root = document.getElementById("root");
    if (root) {
      // 기존 height를 저장하고 초기화
      root.dataset.prevHeight = root.style.height;
      root.style.height = "auto"; // 또는 "auto"
    }
    return () => {
      // 페이지 벗어날 때 height 복구
      if (root && root.dataset.prevHeight !== undefined) {
        root.style.height = root.dataset.prevHeight;
        delete root.dataset.prevHeight;
      }
    };
  }, []);

  function getRequestBody() {
    return {
      emotion_level: Number(localStorage.getItem("emotion_level")),
      conversation_level: Number(localStorage.getItem("conversation_level")),
      meeting_count: Number(localStorage.getItem("meeting_count")),
      transport_mode: localStorage.getItem("transport_mode"),
      congestion_level: Number(localStorage.getItem("congestion_level")),
      location: localStorage.getItem("location") || "강남구",
      journal: localStorage.getItem("journal"),
    };
  }

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.style.background = "#f8f8fa";
    return () => {
      if (root) root.style.background = "";
    };
  }, []);

  useEffect(() => {
    async function fetchResult() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const body = getRequestBody();
        const response = await axios.post("/api/records", body, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.data);
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
      <LoadingWrapper>
        <LoadingImg src={dotLoading} alt="로딩중" />
        <p>결과를 기다리고 있어요</p>
      </LoadingWrapper>
    );
  }
  if (error || !data) {
    return (
      <PageWrapper>
        <CircleWrapper>
          <div>{error || "결과를 불러올 수 없습니다."}</div>
        </CircleWrapper>
      </PageWrapper>
    );
  }

  const {
    record_date,
    journal,
    energy_score,
    ai_prescription,
    weather_log,
    energy_level,
    emotion_level,
    conversation_level,
    meeting_count,
    transport_mode,
    congestion_level,
  } = data;

  return (
    <PageWrapper>
      <DateText>{formatKoreanDate(record_date)}</DateText>
      <EnergyCircle percent={energy_score} />
      <SectionTitle>오늘의 한 줄 일기</SectionTitle>
      <JournalText>&quot;{journal}&quot;</JournalText>
      <hr
        style={{
          width: "96%",
          border: "none",
          borderTop: "1px solid #e4e4e4",
          marginBottom: 18,
        }}
      />
      <ExplainText>{ai_prescription?.journal_explain || ""}</ExplainText>
      <CardGroup>
        <CardRow>
          <SmallCard>
            <ColRow>
              <Label>감정</Label>
              <Value>{getEmotionText(emotion_level)}</Value>
            </ColRow>
            <ColRow>
              <Label>대화량</Label>
              <Value>{getConversationText(conversation_level)}</Value>
            </ColRow>
          </SmallCard>
          <SmallCard>
            <ColRow>
              <Label>날씨</Label>
              <Value>{getWeatherText(weather_log?.condition)}</Value>
            </ColRow>
            <ColRow>
              <Label>기온</Label>
              <Value>{weather_log?.temperature ?? "-"}°C</Value>
            </ColRow>
            <ColRow>
              <Label>미세먼지</Label>
              <Value>{weather_log?.pm10 ?? "-"}</Value>
            </ColRow>
          </SmallCard>
        </CardRow>
        <LargeCard>
          <ColRow>
            <Label>활동구역</Label>
            <Value>{weather_log?.location || "-"}</Value>
          </ColRow>
          <ColRow>
            <Label>이동수단</Label>
            <Value>{getTransportText(transport_mode)}</Value>
          </ColRow>
          <ColRow>
            <Label>혼잡도</Label>
            <Value>{getCongestionText(congestion_level)}</Value>
          </ColRow>
        </LargeCard>
      </CardGroup>
      <ButtonRow>
        <NavBtn onClick={() => navigate("/saving")}>기록 저장하기</NavBtn>
      </ButtonRow>
    </PageWrapper>
  );
}
