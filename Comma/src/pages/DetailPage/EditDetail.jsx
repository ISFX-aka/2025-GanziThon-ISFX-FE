import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

// --------------------------- styled-components 선언부 ---------------------------
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
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
  font-size: 1.4em;
  font-weight: 700;
  color: #222;
`;

const DateText = styled.div`
  font-size: 1.2em;
  color: #223d59;
  font-weight: bold;
  text-align: center;
  margin-top: 30%;
  margin-bottom: 60px;
`;

const SectionTitle = styled.div`
  font-size: 1.15em;
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 17px 0 7px 0;
`;

const JournalText = styled.textarea`
  font-size: 1.05em;
  color: #6e7388;
  display: block;
  margin: 0 auto 18px auto;
  width: 86%;
  border: 1px solid #e0e0e0;
  border-radius: 9px;
  padding: 10px 14px;
  background: #fcfcfc;
  resize: none;
  outline: none;
  line-height: 1.6;
  font-family: inherit;
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
  font-size: 1em;
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
  padding: 14px 0;
  width: 100%;
  cursor: pointer;
`;

// 로딩 GIF
const LOADING_GIF = "src/assets/img/icons8-도트-로딩.gif";

// --------------------------- 렌더 유틸 ---------------------------
function formatKoreanDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

// 에너지 원형 그래프 컴포넌트
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

// --------------------------- Main ---------------------------
export default function EditDetail() {
  const [form, setForm] = useState(null); // form 상태
  const [origin, setOrigin] = useState(null); // 최초 서버 원본
  const [result, setResult] = useState(null); // 서버 저장 결과
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const EMOTION = [
    { value: 1, label: "우울" },
    { value: 2, label: "피곤" },
    { value: 3, label: "평온" },
    { value: 4, label: "행복" },
    { value: 5, label: "매우 행복" },
  ];
  const CONVERSATION = [
    { value: 1, label: "거의 없음" },
    { value: 2, label: "적음" },
    { value: 3, label: "보통" },
    { value: 4, label: "많음" },
    { value: 5, label: "매우 많음" },
  ];
  const TRANSPORT = [
    { value: "walk", label: "도보" },
    { value: "subway", label: "지하철" },
    { value: "bus", label: "버스" },
  ];
  const CONGESTION = [
    { value: 1, label: "여유로움" },
    { value: 2, label: "살짝 붐빔" },
    { value: 3, label: "보통" },
    { value: 4, label: "붐빔" },
    { value: 5, label: "매우 붐빔" },
  ];
  const LOCATIONS = [
    "강남구",
    "강서구",
    "광진구",
    "동작구",
    "송파구",
    "중구",
    "서초구",
    "노원구",
    "마포구",
    "성동구",
  ];

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

  // fetch 원본
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
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json().catch(() => null);
        if (!response.ok) {
          setError(json?.message ?? response.status);
          setLoading(false);
          return;
        }
        const data = json.data ?? json;
        setOrigin(data);
        setForm({
          emotion_level: data.emotion_level,
          conversation_level: data.conversation_level,
          meeting_count: data.meeting_count,
          transport_mode: data.transport_mode,
          congestion_level: data.congestion_level,
          location: data.location,
          journal: data.journal,
        });
      } catch (err) {
        setError("서버에서 기록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
    // eslint-disable-next-line
  }, [location]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!origin?.record_id) return;
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/records/${origin.record_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const json = await response.json().catch(() => null);
      if (!response.ok) {
        setError(json?.message ?? "수정 실패");
        setSubmitting(false);
        return;
      }
      setResult(json.data ?? json);
      alert("수정이 완료되었습니다!");
      navigate(-1); // 바로 이전 페이지로 이동(상세→상세)
    } catch (err) {
      setError("서버와 통신 중 오류가 발생했습니다.");
      setSubmitting(false);
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
  if (error || !form) {
    return (
      <LoadingPageWrapper>
        <div>{error || "결과를 불러올 수 없습니다."}</div>
      </LoadingPageWrapper>
    );
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <DateText>{formatKoreanDate(origin?.record_date)}</DateText>

        {/* 에너지 점수 원형 그래프 */}
        <EnergyCircle percent={origin?.energy_score || 0} />

        <SectionTitle>오늘의 한 줄 일기</SectionTitle>
        <JournalText
          rows={2}
          maxLength={120}
          value={form.journal}
          onChange={(e) => setForm((f) => ({ ...f, journal: e.target.value }))}
          required
        />
        <hr
          style={{
            width: "96%",
            border: "none",
            borderTop: "1px solid #e4e4e4",
            marginBottom: 18,
          }}
        />
        <CardGroup>
          <CardRow>
            <SmallCard>
              <ColRow>
                <Label>감정</Label>
                <select
                  value={form.emotion_level}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      emotion_level: Number(e.target.value),
                    }))
                  }
                  style={{
                    fontSize: "1em",
                    padding: 1,
                    borderRadius: 7,
                    width: "4em",
                    backgroundColor: "#eee",
                    border: "1px solid #eee",
                  }}
                  required
                >
                  {EMOTION.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </ColRow>
              <ColRow>
                <Label>대화량</Label>
                <select
                  value={form.conversation_level}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      conversation_level: Number(e.target.value),
                    }))
                  }
                  style={{
                    fontSize: "1em",
                    padding: 1,
                    borderRadius: 7,
                    width: "4em",
                    backgroundColor: "#eee",
                    border: "1px solid #eee",
                  }}
                  required
                >
                  {CONVERSATION.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </ColRow>
            </SmallCard>
            <SmallCard>
              <ColRow>
                <Label>이동</Label>
                <select
                  value={form.transport_mode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, transport_mode: e.target.value }))
                  }
                  style={{
                    fontSize: "1em",
                    padding: 1,
                    borderRadius: 7,
                    width: "4em",
                    backgroundColor: "#eee",
                    border: "1px solid #eee",
                  }}
                  required
                >
                  {TRANSPORT.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </ColRow>
              <ColRow>
                <Label>혼잡도</Label>
                <select
                  value={form.congestion_level}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      congestion_level: Number(e.target.value),
                    }))
                  }
                  style={{
                    fontSize: "1em",
                    padding: 1,
                    borderRadius: 7,
                    width: "4em",
                    backgroundColor: "#eee",
                    border: "1px solid #eee",
                  }}
                  required
                >
                  {CONGESTION.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </ColRow>
              <ColRow>
                <Label>활동구역</Label>
                <select
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  style={{
                    fontSize: "1em",
                    padding: 1,
                    borderRadius: 7,
                    width: "4em",
                    backgroundColor: "#eee",
                    border: "1px solid #eee",
                  }}
                  required
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </ColRow>
            </SmallCard>
          </CardRow>
        </CardGroup>
        <ButtonRow>
          <NavBtn type="submit" disabled={submitting}>
            {submitting ? "저장중..." : "수정 완료"}
          </NavBtn>
          <NavBtn
            type="button"
            style={{ background: "#dadada", color: "#232323" }}
            onClick={() => navigate(-1)}
          >
            취소
          </NavBtn>
        </ButtonRow>
        {error && (
          <div
            style={{
              textAlign: "center",
              color: "#d43",
              marginTop: 8,
              fontSize: 15,
            }}
          >
            {error}
          </div>
        )}
      </form>
    </PageWrapper>
  );
}
