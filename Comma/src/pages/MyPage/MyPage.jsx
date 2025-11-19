import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f8fa;
  padding-bottom: 36px;
`;

const Title = styled.div`
  font-size: 1.2em;
  text-align: center;
  font-weight: 700;
  margin: 27px 0 21px 0;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 25px 15px;
  margin: 0 auto 18px auto;
  width: 94%;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const StatisticCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 29px 15px;
  margin: 0 auto 18px auto;
  width: 94%;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionLabel = styled.div`
  color: #888;
  font-size: 1em;
  margin-bottom: 9px;
`;

const SubValue = styled.div`
  font-size: 1.09em;
  text-align: center;
  margin-top: 17px;
  color: #435166;
`;

const ButtonGroup = styled.div`
  width: 94%;
  margin: 28px auto 0 auto;
  display: flex;
  gap: 6px;
`;

const NavBtn = styled.button`
  box-shadow: none;
  font-size: 1.03em;
  border-radius: 11px;
  border: none;
  background: #ededf4;
  color: #222;
  padding: 14px 0;
  width: 100%;
  cursor: pointer;
`;

const EnergyCircleWrapper = styled.div`
  width: 104px;
  height: 104px;
  margin: 9px auto 4px auto;
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
  font-size: 1.35em;
  font-weight: 700;
  color: #222;
`;

function EnergyCircle({ percent }) {
  const radius = 38;
  const stroke = 10;
  const normalizedPercent = Math.round(percent);
  const circum = 2 * Math.PI * radius;
  const offset = circum - (normalizedPercent / 100) * circum;
  return (
    <EnergyCircleWrapper>
      <svg width="104" height="104">
        <circle
          cx="52"
          cy="52"
          r={radius}
          stroke="#eee"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="52"
          cy="52"
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
    </EnergyCircleWrapper>
  );
}

const UserCard = styled(Card)`
  gap: 18px;
`;

export default function MyPage() {
  const [stat, setStat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const period = "month";
  const date = "2025-11-04";

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.style.background = "#f8f8fa";
    return () => {
      if (root) root.style.background = "";
    };
  }, []);

  useEffect(() => {
    async function fetchStat() {
      setLoading(true);
      try {
        const response = await axios.get("/api/statistics", {
          headers: { Authorization: `Bearer ${token}` },
          params: { period, date },
        });
        setStat(response.data);
      } catch (e) {
        setStat(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStat();
  }, [period, date, token]);

  if (loading) {
    return (
      <PageWrapper>
        <StatisticCard>
          <div>로딩중...</div>
        </StatisticCard>
      </PageWrapper>
    );
  }

  if (!stat) {
    return (
      <PageWrapper>
        <StatisticCard>
          <div>통계 정보를 불러올 수 없습니다.</div>
        </StatisticCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Title>마이페이지</Title>
      <UserCard>
        <img
          src="/user-icon.png"
          alt="프로필"
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: "#eee",
          }}
        />
        <InfoCol>
          <div>닉네임 &gt;</div>
          <div style={{ color: "#888", fontSize: "0.98em" }}>
            ganzithon@likelion.ac.kr
          </div>
        </InfoCol>
      </UserCard>
      <StatisticCard>
        <SectionLabel onClick={() => navigate("/date")}>
          {stat.start_date} ~ {stat.end_date} 통계
        </SectionLabel>
        <EnergyCircle percent={stat.average_energy_score} />
        <SubValue>총 {stat.record_count}개의 기록이 있어요.</SubValue>
      </StatisticCard>
      <ButtonGroup>
        <NavBtn onClick={() => navigate("/edit")}>내 계정 관리</NavBtn>
        <NavBtn onClick={() => navigate("/delete")}>회원 탈퇴</NavBtn>
      </ButtonGroup>
    </PageWrapper>
  );
}
