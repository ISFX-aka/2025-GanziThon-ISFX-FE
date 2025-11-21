import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(41, 41, 51, 0.13);
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 18px;
  width: 87vw;
  max-width: 330px;
  min-width: 265px;
  box-shadow: 0 4px 24px rgba(80, 80, 80, 0.12);
  padding: 28px 19px 22px 19px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.07em;
  font-weight: 700;
  color: #22294e;
  text-align: center;
  margin-bottom: 21px;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 17px;
  justify-content: center;
`;

const DateInput = styled.input`
  border: 1.5px solid #dde3ef;
  border-radius: 9px;
  padding: 11px 14px;
  font-size: 1.02em;
  background: #f4f5f8;
  text-align: center;
  width: 135px;
  outline: none;
`;

const PeriodLabel = styled.div`
  font-size: 1.04em;
  color: #555;
  margin: 0 7px;
`;

const RadioRow = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 27px;
  margin-top: 2px;
`;

const CustomRadio = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.06em;
  color: #353e57;
  padding: 0 7px;
  input {
    display: none;
  }
  span {
    width: 18px;
    height: 18px;
    margin-right: 2px;
    border-radius: 50%;
    border: 2px solid #c5c6d7;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f7f8fa;
  }
  input:checked + span {
    border-color: #6a779e;
    background: #dde5fa;
  }
  b {
    font-weight: 500;
    margin-left: 2px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  margin-top: 13px;
`;

const Btn = styled.button`
  flex: 1;
  border-radius: 9px;
  font-size: 1em;
  border: none;
  padding: 14px 0;
  background: ${({ primary }) => (primary ? "#535970" : "#edeef3")};
  color: ${({ primary }) => (primary ? "#fff" : "#444")};
  font-weight: 550;
  cursor: pointer;
`;

export default function Date() {
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [period, setPeriod] = useState("month");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // 기간 선택 핸들러
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  // API 호출 및 페이지 이동
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const params = {
        period,
        ...(date && { date }), // 입력값 있으면 파라미터 추가
      };
      const response = await axios.get("/api/users/me/status", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      // response.data를 마이페이지 등에서 활용(필요 시 상태전달/전환)
      // 예시: navigate("/mypage", { state: { stat: response.data } });
      navigate(-1); // 모달 닫고 결과 반영 (실제 구현에 맞게 이동/전달 가능)
    } catch (e) {
      // 에러 처리
      alert("통계 정보를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>통계 기간 설정</Title>
        <InputRow>
          <span
            role="img"
            aria-label="cal"
            style={{ fontSize: "1.35em", marginRight: "5px" }}
          >
            📅
          </span>
          <DateInput
            type="date"
            value={date}
            onChange={handleDateChange}
            placeholder="YYYY-MM-DD"
            max={new Date().toISOString().slice(0, 10)}
          />
          <PeriodLabel>이 포함된</PeriodLabel>
        </InputRow>
        <RadioRow>
          <CustomRadio>
            <input
              type="radio"
              name="period"
              value="month"
              checked={period === "month"}
              onChange={handlePeriodChange}
            />
            <span />
            <b>월</b>
          </CustomRadio>
          <CustomRadio>
            <input
              type="radio"
              name="period"
              value="week"
              checked={period === "week"}
              onChange={handlePeriodChange}
            />
            <span />
            <b>주</b>
          </CustomRadio>
        </RadioRow>
        <ButtonRow>
          <Btn onClick={() => navigate(-1)}>취소하기</Btn>
          <Btn primary onClick={handleSave} disabled={loading}>
            {loading ? "조회중..." : "저장하기"}
          </Btn>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
