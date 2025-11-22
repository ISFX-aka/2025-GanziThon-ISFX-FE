import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ------ styled-components ------
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f8fa;
  padding-bottom: 36px;
  position: relative;
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
  text-align: center;
  font-weight: 600;
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

const Overlay = styled.div`
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(33, 38, 45, 0.23);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(80, 80, 80, 0.19);
  padding: 32px 22px 28px 22px;
  min-width: 260px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ModalTitle = styled.div`
  font-size: 1.11em;
  font-weight: bold;
  color: #224;
  text-align: center;
  margin-bottom: 14px;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.48em;
  color: #333a;
  cursor: pointer;
  z-index: 1;
`;

const ModalInput = styled.input`
  width: 90%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1.07em;
  border: 1px solid #d9d9e8;
  margin-bottom: 18px;
  margin-top: 6px;
  background: #f8f8fa;
`;

const Select = styled.select`
  width: 90%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1.07em;
  border: 1px solid #d9d9e8;
  margin-bottom: 18px;
  background: #f8f8fa;
`;

const EnergyList = styled.ul`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 12px;
  padding: 0;
  list-style: none;
  font-size: 0.95em;
  color: #333;
  border-top: 1px solid #ddd;
`;

const EnergyListItem = styled.li`
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
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

function getStatPeriodLabel(startDate, endDate, period) {
  if (!startDate || !endDate) return "-";
  if (period === "week") {
    const [sYear, sMonth, sDay] = startDate.split("-");
    const week = Math.floor((parseInt(sDay, 10) - 1) / 7) + 1;
    return `${sYear.slice(2)}년 ${parseInt(sMonth, 10)}월 ${week}주차 통계`;
  }
  if (period === "month") {
    const [sYear, sMonth] = startDate.split("-");
    return `${sYear.slice(2)}년 ${parseInt(sMonth, 10)}월 통계`;
  }
  return "-";
}

export default function MyPage() {
  const [nickname, setNickname] = useState("닉네임");
  const [showNickModal, setShowNickModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [stat, setStat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatModal, setShowStatModal] = useState(false);
  const navigate = useNavigate();
  // 기간 선택 모달 상태
  const [period, setPeriod] = useState("week");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // 닉네임(로컬스토리지) 관리
  useEffect(() => {
    const stored = localStorage.getItem("nickname");
    if (stored) setNickname(stored);
  }, []);

  // API 호출 함수: 통계 조회
  const fetchStat = async (periodParam, dateParam) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인 후 이용 가능합니다.");
        setLoading(false);
        return;
      }
      const query = new URLSearchParams({
        period: periodParam,
        date: dateParam,
      }).toString();
      const res = await fetch(
        `http://3.36.228.115:8080/api/users/me/status?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const resJson = await res.json();
        setStat(resJson.data); // data 필드만 저장
      } else {
        const err = await res.json();
        alert(err.message || "통계 조회 실패");
      }
    } catch (e) {
      alert("서버에서 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 초기 통계 조회: 오늘 기준 주간 통계
  useEffect(() => {
    fetchStat("week", date);
  }, []);

  const {
    averageEnergyScore = 0,
    recordCount = 0,
    startDate = "",
    endDate = "",
    energyTrend = [],
    period: statPeriod,
  } = stat || {};

  // 닉네임 모달 저장
  const handleNickSave = () => {
    const trimmed = inputValue.trim();
    const nextNick = trimmed ? trimmed : "닉네임";
    setNickname(nextNick);
    localStorage.setItem("nickname", nextNick);
    setShowNickModal(false);
  };

  // 기간 모달 저장 후 통계 호출
  const handleStatFetch = () => {
    fetchStat(period, date);
    setShowStatModal(false);
  };

  return (
    <PageWrapper>
      <Title>마이페이지</Title>

      {/* 닉네임 수정 모달 */}
      {showNickModal && (
        <Overlay onClick={() => setShowNickModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalClose
              aria-label="닫기"
              onClick={(e) => {
                e.stopPropagation();
                setShowNickModal(false);
              }}
            >
              ×
            </ModalClose>
            <ModalTitle>닉네임 수정</ModalTitle>
            <ModalInput
              maxLength={20}
              value={inputValue}
              autoFocus
              placeholder="새 닉네임 입력"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <NavBtn style={{ marginTop: 4 }} onClick={handleNickSave}>
              저장
            </NavBtn>
          </ModalBox>
        </Overlay>
      )}

      {/* 통계 기간 선택 모달 */}
      {showStatModal && (
        <Overlay onClick={() => setShowStatModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalClose
              aria-label="닫기"
              onClick={(e) => {
                e.stopPropagation();
                setShowStatModal(false);
              }}
            >
              ×
            </ModalClose>
            <ModalTitle>통계 기간 선택</ModalTitle>
            <SectionLabel>기간 선택</SectionLabel>
            <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="week">주간</option>
              <option value="month">월간</option>
            </Select>
            <SectionLabel>기준 날짜 선택</SectionLabel>
            <ModalInput
              type="date"
              value={date}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
            />
            <NavBtn onClick={handleStatFetch}>조회</NavBtn>
          </ModalBox>
        </Overlay>
      )}

      <Card>
        <UserProfile>
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" fill="#ccc" />
            <ellipse cx="12" cy="17" rx="7" ry="5" fill="#ccc" />
          </svg>
        </UserProfile>
        <InfoCol>
          <div
            style={{
              fontWeight: 600,
              marginBottom: 3,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setInputValue(nickname);
              setShowNickModal(true);
            }}
          >
            {nickname}
            <span
              style={{
                fontSize: "1.18em",
                fontWeight: 800,
                marginLeft: 6,
                color: "#868cb7",
              }}
            >
              &gt;
            </span>
          </div>
        </InfoCol>
      </Card>

      <StatisticCard>
        <SectionLabel>
          {getStatPeriodLabel(startDate, endDate, statPeriod)}
        </SectionLabel>
        {loading ? (
          <SubValue>로딩 중...</SubValue>
        ) : stat ? (
          <>
            <EnergyCircle percent={averageEnergyScore} />
            <SubValue>총 {recordCount}개의 기록이 있어요.</SubValue>
            <EnergyList>
              {energyTrend && energyTrend.length > 0 ? (
                energyTrend.map(({ recordId, recordDate, energyScore }) => (
                  <EnergyListItem key={recordId}>
                    <span>{recordDate}</span>
                    <span>{Math.round(energyScore)}</span>
                  </EnergyListItem>
                ))
              ) : (
                <EnergyListItem>기록된 에너지 점수가 없습니다.</EnergyListItem>
              )}
            </EnergyList>
          </>
        ) : (
          <SubValue>통계가 존재하지 않습니다.</SubValue>
        )}
        <NavBtn
          style={{ marginTop: 20, width: "60%" }}
          onClick={() => setShowStatModal(true)}
        >
          기간별 통계 조회
        </NavBtn>
      </StatisticCard>

      <ButtonGroup>
        <NavBtn onClick={() => navigate("/delete")}>회원 탈퇴</NavBtn>
      </ButtonGroup>
    </PageWrapper>
  );
}
