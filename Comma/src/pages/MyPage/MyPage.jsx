import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ------- styled-components --------
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
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2em;
  color: #b0b0b0;
  overflow: hidden;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

const EmailText = styled.div`
  font-size: 1.02em;
  color: #92929e;
  font-weight: 400;
  margin-top: 2px;
  margin-left: 1px;
  word-break: break-all;
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
  font-size: 1em;
  border-radius: 11px;
  border: none;
  background: #fff;
  color: #222;
  padding: 12px 0;
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

// 프로필 이미지 컴포넌트 스타일
const ProfileImg = styled.div`
  width: 94px;
  height: 94px;
  border-radius: 50%;
  background: #d9d9d9;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 15px 0 18px 0;
  z-index: 1;
`;

const ProfileImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CameraButton = styled.button`
  position: absolute;
  bottom: 13px;
  right: 13px;
  background: #eff0f5;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(80, 80, 80, 0.13);
`;

const DeleteImageButton = styled.button`
  position: absolute;
  top: 3.5px;
  right: 3.5px;
  background: #fff;
  border: 1.5px solid #e1e1e6;
  color: #888;
  border-radius: 50%;
  width: 23px;
  height: 23px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
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

// ----- 프로필 편집 모달 -----
function ProfileEditModal({ show, onClose, curNickname, curImg, onSave }) {
  const fileRef = useRef();
  const [nick, setNick] = useState(curNickname || "");
  const [img, setImg] = useState(curImg || null);

  useEffect(() => {
    setNick(curNickname || "");
    setImg(curImg || null);
  }, [curNickname, curImg, show]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImg(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImg = () => setImg(null);

  const handleSave = () => {
    onSave(nick.trim() || "닉네임", img);
    onClose();
  };

  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalClose
          aria-label="닫기"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </ModalClose>
        <ModalTitle>프로필 수정</ModalTitle>
        <ProfileImg>
          {img ? (
            <ProfileImageStyled src={img} alt="profile" />
          ) : (
            <svg width="66" height="66" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="10" r="4" fill="#FFFFFF" />
              <ellipse cx="12" cy="19" rx="7" ry="5" fill="#FFFFFF" />
            </svg>
          )}
          {img && (
            <DeleteImageButton onClick={handleRemoveImg} title="사진 삭제">
              ×
            </DeleteImageButton>
          )}
          <CameraButton
            onClick={() => fileRef.current.click()}
            title="사진 업로드"
            type="button"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M5 20q-0.8 0-1.4-0.6T3 18V8q0-0.8 0.6-1.4T5 6h2.15l0.8-1.6Q8.2 4 8.5 4h7q0.3 0 0.55 0.2l0.8 1.6H19q0.8 0 1.4 0.6T21 8v10q0 0.8-0.6 1.4T19 20H5zm7-3q1.25 0 2.12-0.88T15 14q0-1.25-0.88-2.12T12 11q-1.25 0-2.12 0.88T9 14q0 1.25 0.88 2.12T12 17z"
                fill="#6E7388"
              />
            </svg>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImgChange}
            />
          </CameraButton>
        </ProfileImg>
        <ModalInput
          maxLength={20}
          value={nick}
          autoFocus
          placeholder="닉네임 입력"
          onChange={(e) => setNick(e.target.value)}
          style={{ textAlign: "center" }}
        />
        <div style={{ width: "90%", display: "flex", gap: 8 }}>
          <NavBtn
            onClick={onClose}
            style={{ background: "#B7BBCF", color: "#fff" }}
          >
            취소하기
          </NavBtn>
          <NavBtn
            onClick={handleSave}
            style={{ color: "#fff", background: "#6E7388" }}
          >
            저장하기
          </NavBtn>
        </div>
      </ModalBox>
    </Overlay>
  );
}

// ------ 메인 ------
export default function MyPage() {
  const [nickname, setNickname] = useState("닉네임");
  const [email, setEmail] = useState(""); // 이메일도 상태 관리
  const [showNickModal, setShowNickModal] = useState(false);
  const [profileImg, setProfileImg] = useState(() =>
    localStorage.getItem("profileImg")
  ); // base64
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

  // 유저 기본 정보 조회 - 최초 마운트
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://3.36.228.115:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.data.email);
          console.log(data.email);
          // 이름은 nickname 대신 저장/관리 (닉네임 개별 관리하는 경우 아래 라인 생략)
          // setNickname(data.name);
        }
      } catch (e) {
        // 통신 실패 시 email 빈값 유지
      }
    })();

    const stored = localStorage.getItem("nickname");
    if (stored) setNickname(stored);
    const storedImg = localStorage.getItem("profileImg");
    if (storedImg) setProfileImg(storedImg);
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
        setStat(resJson.data);
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

  // 초기 통계 조회
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

  // 닉네임, 사진 상태 -> 스토리지 저장
  const handleProfileSave = (nextNick, nextImg) => {
    setNickname(nextNick);
    localStorage.setItem("nickname", nextNick);
    setProfileImg(nextImg || null);
    if (nextImg) {
      localStorage.setItem("profileImg", nextImg);
    } else {
      localStorage.removeItem("profileImg");
    }
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

      {/* 프로필/닉네임 수정 모달 */}
      <ProfileEditModal
        show={showNickModal}
        onClose={() => setShowNickModal(false)}
        curNickname={nickname}
        curImg={profileImg}
        onSave={handleProfileSave}
      />

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
        <UserProfile
          onClick={() => setShowNickModal(true)}
          style={{ cursor: "pointer" }}
          title="프로필/닉네임 수정"
        >
          {profileImg ? (
            <img
              src={profileImg}
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill="#fff" />
              <ellipse cx="12" cy="17" rx="7" ry="5" fill="#fff" />
            </svg>
          )}
        </UserProfile>
        <InfoCol>
          <div
            style={{
              fontWeight: 600,
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowNickModal(true)}
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
          <EmailText>{email}</EmailText>
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
