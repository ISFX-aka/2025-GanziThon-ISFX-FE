import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ------ styled-components ------
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
  margin: 28px 0 24px 0;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 24px 15px;
  margin: 0 auto 18px auto;
  width: 92%;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.11);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserProfile = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2em;
  color: #b0b0b0;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
`;

const StatisticCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 29px 15px 22px 15px;
  margin: 0 auto 18px auto;
  width: 92%;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.11);
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
  margin-top: 13px;
  color: #435166;
`;

const ButtonGroup = styled.div`
  width: 92%;
  margin: 28px auto 0 auto;
  display: flex;
  gap: 7px;
`;

const NavBtn = styled.button`
  box-shadow: none;
  font-size: 1.07em;
  border-radius: 11px;
  border: none;
  background: #fff;
  color: #222;
  padding: 15px 0;
  width: 100%;
  cursor: pointer;
  border: 1.4px solid #ededf4;
  font-weight: 600;
  &:hover {
    background: #f6f8ff;
    border-color: #d7dced;
  }
`;

const EnergyCircleWrapper = styled.div`
  width: 110px;
  height: 110px;
  margin: 15px auto 0 auto;
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
  font-size: 1.69em;
  font-weight: 700;
  color: #222;
`;

// ------ 그래프 컴포넌트 ------
function EnergyCircle({ percent }) {
  const radius = 44;
  const stroke = 11;
  const normalizedPercent = Math.round(Number(percent) || 0);
  const circum = 2 * Math.PI * radius;
  const offset = circum - (normalizedPercent / 100) * circum;
  return (
    <EnergyCircleWrapper>
      <svg width="110" height="110">
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#e2e4e9"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#97bee7"
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

// ------ 날짜 레이블 함수 ------
function getStatPeriodLabel(start_date, end_date) {
  if (!start_date || !end_date) return "-";
  const [sYear, sMonth, sDay] = start_date.split("-");
  // 2주차 계산(1일~7일 1주, 8~14일 2주...)
  const week = Math.floor((parseInt(sDay, 10) - 1) / 7) + 1;
  return `${sYear.slice(2)}년 ${parseInt(sMonth, 10)}월 ${week}주차 통계`;
}

// ------ Main 컴포넌트 ------
export default function MyPage() {
  const [user, setUser] = useState(null);
  const [stat, setStat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 사용자 info GET
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          "http://3.36.228.115:8080/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.data || response.data); // data.data 대응
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, [token]);

  // 통계 GET
  useEffect(() => {
    async function fetchStat() {
      setLoading(true);
      try {
        // 오늘 날짜
        const today = new Date();
        const ymd = today.toISOString().slice(0, 10);
        const response = await axios.get(
          "http://3.36.228.115:8080/api/users/me/status",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { period: "week", date: ymd },
          }
        );
        setStat(response.data.data || response.data); // data.data 대응
      } catch {
        setStat(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStat();
  }, [token]);

  // 로딩 처리
  if (loading || !user) {
    return (
      <PageWrapper>
        <StatisticCard>
          <div>로딩중...</div>
        </StatisticCard>
      </PageWrapper>
    );
  }

  // stat 구조 체크 및 안전 처리
  const {
    average_energy_score = 0,
    record_count = 0,
    start_date = "",
    end_date = "",
  } = stat || {};

  return (
    <PageWrapper>
      <Title>마이페이지</Title>
      <Card>
        <UserProfile>
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" fill="#ccc" />
            <ellipse cx="12" cy="17" rx="7" ry="5" fill="#ccc" />
          </svg>
        </UserProfile>
        <InfoCol>
          <div style={{ fontWeight: 600, marginBottom: 3 }}>
            {user?.name || "닉네임"} &gt;
          </div>
          <div style={{ color: "#888", fontSize: "0.98em" }}>{user?.email}</div>
        </InfoCol>
      </Card>
      <StatisticCard>
        <SectionLabel>{getStatPeriodLabel(start_date, end_date)}</SectionLabel>
        <EnergyCircle percent={average_energy_score} />
        <SubValue>총 {record_count}개의 기록이 있어요.</SubValue>
      </StatisticCard>
      <ButtonGroup>
        <NavBtn onClick={() => navigate("/edit")}>내 계정 관리</NavBtn>
        <NavBtn onClick={() => navigate("/delete")}>회원 탈퇴</NavBtn>
      </ButtonGroup>
    </PageWrapper>
  );
}
