import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100%;
  background: #f8f8fa;
  padding: 0;
  @media (max-width: 600px) {
    padding-top: 32px;
  }
`;
const LoadingPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0;
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
  padding: 12px 0;
  width: 100%;
  cursor: pointer;
  position: relative;
  z-index: 0;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(51, 51, 51, 0.17);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  background: #fff;
  border-radius: 15px;
  width: 92vw;
  max-width: 320px;
  box-shadow: 0 4px 22px rgba(70, 70, 70, 0.15);
  padding: 24px 17px 15px 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalTitle = styled.div`
  font-size: 1.07em;
  font-weight: bold;
  color: #22294e;
  text-align: center;
  margin-bottom: 15px;
`;
const ModalText = styled.div`
  font-size: 1em;
  color: #82828a;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 23px;
`;
const ModalBtnRow = styled.div`
  display: flex;
  gap: 11px;
  width: 100%;
  margin-top: 6px;
`;
const ModalBtn = styled.button`
  flex: 1;
  border-radius: 9px;
  font-size: 1em;
  border: none;
  padding: 14px 0;
  background: ${({ primary }) => (primary ? "#535970" : "#edeef3")};
  color: ${({ primary }) => (primary ? "#fff" : "#535970")};
  font-weight: 550;
  cursor: pointer;
`;

const LOADING_GIF = "src/assets/img/icons8-도트-로딩.gif";

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
function formatKoreanDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}
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

export default function DetailPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.background = "#f8f8fa";
      root.style.height = "auto";
    }
    return () => {
      if (root) root.style.background = "";
    };
  }, []);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      setError("");
      const recordId = location.state?.recordId;
      if (!recordId) {
        setError("상세 기록 ID가 없습니다.");
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/records/${recordId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json().catch(() => null);
        if (!response.ok) {
          setError(json?.message ?? response.status);
          setLoading(false);
          return;
        }
        setData(json.data ?? json);
      } catch (err) {
        setError("서버에서 기록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
    // eslint-disable-next-line
  }, [location]);

  // 삭제 API (딜레이 후 새로고침)
  async function handleDelete() {
    if (!data?.record_id) return;
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/records/${data.record_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        alert("기록이 삭제되었습니다.");
        navigate("/main");
        // 서버 반영을 기다려 0.3초 후 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        const msg =
          (await res.json().catch(() => null))?.message || "삭제 실패";
        alert(msg);
        setDeleteLoading(false);
        setShowDeleteModal(false);
      }
    } catch (err) {
      alert("삭제 요청 중 에러가 발생했습니다.");
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) {
    return (
      <LoadingPageWrapper>
        <img src={LOADING_GIF} alt="로딩중" style={{ marginTop: 14 }} />
        <div style={{ marginTop: 9 }}>기록을 불러오는 중...</div>
      </LoadingPageWrapper>
    );
  }

  if (error || !data) {
    return (
      <LoadingPageWrapper>
        <div>{error || "결과를 불러올 수 없습니다."}</div>
      </LoadingPageWrapper>
    );
  }

  const {
    record_id,
    record_date,
    journal,
    energy_score,
    ai_prescription,
    weather_log,
    emotion_level,
    conversation_level,
    meeting_count,
    transport_mode,
    congestion_level,
    location: area,
  } = data;

  return (
    <PageWrapper>
      {showDeleteModal && (
        <Overlay>
          <Modal>
            <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
            <ModalText>
              한 번 삭제한 기록은 복구할 수 없습니다.
              <br />
              삭제하시겠어요?
            </ModalText>
            <ModalBtnRow>
              <ModalBtn onClick={handleDelete} primary disabled={deleteLoading}>
                {deleteLoading ? "삭제중..." : "삭제"}
              </ModalBtn>
              <ModalBtn onClick={() => setShowDeleteModal(false)}>
                취소
              </ModalBtn>
            </ModalBtnRow>
          </Modal>
        </Overlay>
      )}
      {/* 날짜와 화살표 묶음 예시 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: 0,
          marginTop: 80,
        }}
      >
        <img
          src="src/assets/img/Path 1.png"
          alt="뒤로가기"
          style={{
            width: 11,
            height: 17,
            marginLeft: -70,
            marginRight: 60,
            marginTop: -10,
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        />
        <DateText>{formatKoreanDate(record_date)}</DateText>
      </div>
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
            <ColRow>
              <Label>만남 횟수</Label>
              <Value>{meeting_count ?? 0}회</Value>
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
            <Value>{area || weather_log?.location || "-"}</Value>
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
        <NavBtn
          onClick={() =>
            navigate("/editdetail", {
              state: { recordId: record_id },
            })
          }
        >
          기록 수정하기
        </NavBtn>
        <NavBtn onClick={() => setShowDeleteModal(true)}>기록 삭제하기</NavBtn>
      </ButtonRow>
    </PageWrapper>
  );
}
