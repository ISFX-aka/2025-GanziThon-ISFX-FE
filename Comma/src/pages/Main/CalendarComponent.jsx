import { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import './CalendarComponent.css';

function CalendarComponent() {
  const [scores, setScores] = useState({});
  const [date, setDate] = useState(new Date());

  const TEMP_SCORES = { // 연동 전 임시 데이터
    "2025-11-01": 73,
    "2025-11-02": 87,
    "2025-11-03": 92,
  };

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    fetch(`/api/records?year=${year}&month=${month}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200) {
          // 성공: 배열 -> 날짜-점수 객체
          const scoreMap = {};
          data.forEach(item => {
            scoreMap[item.record_date] = item.energy_score;
          });
          setScores(scoreMap);
        } else {
          console.error(data.message);
          setScores({}); // 에러 시 점수 초기화
        }
      })
      .catch(err => {
        console.error("연동 실패:", err);
        setScores(TEMP_SCORES); // 임시 데이터 표시
      });
  }, [date]);

  // 날짜별 점수 조회
  function getScore(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    return scores[key] ?? null;
  }

  return (
    <Calendar
      value={date} // 초기값 오늘 날짜
      onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)} // 월 변경 시 API 호출
      formatDay={(locale, date) => date.getDate()} // 숫자만 표시
      tileContent={({ date, view }) =>
        view === "month" ? (
          <div
            className="energy-circle"
            style={{
              backgroundColor: getScore(date) ? "#AEC3AA" : "#EAEAEA"
            }}
          >
            {getScore(date) ?? ""}
          </div>
        ) : null
      }
    />
  );
}

export default CalendarComponent;