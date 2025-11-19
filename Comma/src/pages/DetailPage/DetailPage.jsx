import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// SVG 에너지 프로그래스 그래프
const CircleWrapper = styled.div`
  width: 160px;
  height: 160px;
  margin: 24px auto 32px auto;
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
  font-size: 2em;
  font-weight: 700;
  color: #222;
`;

function EnergyCircle({ percent }) {
  const radius = 64;
  const stroke = 14;
  const normalizedPercent = Math.round(percent);
  const circum = 2 * Math.PI * radius;
  const offset = circum - (normalizedPercent / 100) * circum;
  return (
    <CircleWrapper>
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#eee"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
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

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0;
  background: #f8f8fa;

  @media (max-width: 600px) {
    padding-top: 45px; // 모바일에서 더 크게!
  }
`;

const DateText = styled.div`
  font-size: 1.4em;
  color: #223d59;
  font-weight: bold;
  text-align: center;
  margin-top: 70px;
`;

const SectionTitle = styled.div`
  font-size: 1.13em;
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 20px 0 9px 0;
`;

const JournalText = styled.div`
  font-size: 1.1em;
  color: #577;
  text-align: center;
  margin-bottom: 18px;
`;

const ExplainText = styled.div`
  font-size: 1.06em;
  text-align: center;
  color: #555;
  margin: 8px 0 19px 0;
  padding: 0 18px;
  line-height: 1.5;
`;

const CardGroup = styled.div`
  width: 95%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto 35px auto;
`;

const CardRow = styled.div`
  display: flex;
  gap: 16px;
`;

const SmallCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 13px;
  padding: 15px 16px;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.07);
  font-size: 1.04em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Label = styled.span`
  color: #8ca1be;
  font-size: 0.96em;
  font-weight: 550;
`;

const Value = styled.span`
  color: #253b51;
  font-size: 1em;
`;

const LargeCard = styled.div`
  background: #fff;
  border-radius: 13px;
  padding: 16px 16px;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.07);
  font-size: 1em;
  display: flex;
  flex-direction: column;
  margin-top: 2px;
`;

const ButtonRow = styled.div`
  width: 95%;
  max-width: 400px;
  display: flex;
  gap: 19px;
  margin: 0 auto 28px auto;
`;

const NavBtn = styled.button`
  box-shadow: none;
  font-size: 1em;
  border-radius: 11px;
  border: none;
  background: #616985;
  color: #fff;
  padding: 15px 0;
  width: 100%;
  cursor: pointer;
`;

export default function DetailPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지 마운트 시 #root 배경색 변경
    const root = document.getElementById("root");
    if (root) root.style.background = "#f8f8fa";

    // 언마운트 시 원래대로 원복
    return () => {
      if (root) root.style.background = "";
    };
  }, []);

  useEffect(() => {
    // localStorage에 response key들을 임시로 저장해뒀다고 가정합니다
    // 실제로는 axios 받은 데이터를 분기 처리해서 저장하거나 prop으로 받은 data 사용

    // 예시 response 어느 페이지에서 localStorage.setItem...
    // 여기서는 덤으로 하드코딩된 데이터 사용
    setData({
      record_date: "2025년 11월 4일",
      journal: "시험 공부 때문에 힘든 하루였다.",
      energy_score: 80,
      energy_level: "midium",
      ai_prescription: {
        recommendation_text:
          "오늘은 조금 쉬어가는 시간을 가져보세요. 집에서 가벼운 스트레칭이나 요가를 하면서 몸을 풀어주고, 좋아하는 음악을 들으며 마음을 편안하게 해보세요. 충분한 휴식이 내일의 에너지를 충전해줄 거예요!",
        journal_explain:
          "곧 시험이시군요! 오늘 날씨가 흐려서 괜시리 울적했겠어요. 🥲",
      },
      weather_log: {
        location: "강남구",
        condition: "맑음",
        temperature: 12.5,
        pm10: 35,
      },
      // 설문 응답 추가 예시
      emotion: "피곤하다",
      conversation: "적었다",
      area: "강남구",
      vehicle: "지하철",
      congestion: "발 디딜 틈이 없었다",
    });
  }, []);

  if (!data) {
    return (
      <PageWrapper>
        <CircleWrapper>
          <div>Loading...</div>
        </CircleWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <DateText>{data.record_date}</DateText>
      <EnergyCircle percent={data.energy_score} />
      <SectionTitle>오늘의 한 줄 일기</SectionTitle>
      <JournalText>&quot;{data.journal}&quot;</JournalText>
      <hr
        style={{
          width: "92%",
          border: "none",
          borderTop: "1px solid #e4e4e4",
          marginBottom: 18,
        }}
      />
      <ExplainText>{data.ai_prescription.journal_explain}</ExplainText>

      <CardGroup>
        <CardRow>
          <SmallCard>
            <ColRow>
              <Label>감정</Label>
              <Value>{data.emotion}</Value>
            </ColRow>
            <ColRow>
              <Label>대화량</Label>
              <Value>{data.conversation}</Value>
            </ColRow>
          </SmallCard>
          <SmallCard>
            <ColRow>
              <Label>날씨</Label>
              <Value>{data.weather_log.condition}</Value>
            </ColRow>
            <ColRow>
              <Label>기온</Label>
              <Value>{data.weather_log.temperature}</Value>
            </ColRow>
            <ColRow>
              <Label>미세먼지</Label>
              <Value>{data.weather_log.pm10}</Value>
            </ColRow>
          </SmallCard>
        </CardRow>
        <LargeCard>
          <ColRow>
            <Label>활동구역</Label>
            <Value>{data.area}</Value>
          </ColRow>
          <ColRow>
            <Label>이동수단</Label>
            <Value>{data.vehicle}</Value>
          </ColRow>
          <ColRow>
            <Label>혼잡도</Label>
            <Value>{data.congestion}</Value>
          </ColRow>
        </LargeCard>
      </CardGroup>

      <ButtonRow>
        <NavBtn onClick={() => navigate("/edit")}>기록 수정하기</NavBtn>
        <NavBtn onClick={() => navigate("/remove")}>기록 삭제하기</NavBtn>
      </ButtonRow>
    </PageWrapper>
  );
}
