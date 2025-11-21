import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 에너지 원형 그래프 (살짝 확대)
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

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f8fa;
  padding: 0;

  @media (max-width: 600px) {
    padding-top: 32px;
  }
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

export default function DetailPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.style.background = "#f8f8fa";
    return () => {
      if (root) root.style.background = "";
    };
  }, []);

  useEffect(() => {
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
          width: "96%",
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
