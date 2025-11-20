import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from "react-calendar";
import './CalendarComponent.css';

function CalendarComponent() {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const [date, setDate] = useState(new Date());

  const TEMP_SCORES = { // 연동 전 임시 데이터
    "2025-11-01": { id: 1001, score: 73 },
    "2025-11-02": { id: 1002, score: 87 },
    "2025-11-03": { id: 1003, score: 92 }
  };

  const handleDayClick = (clickedDate) => {
    const recordData = getScore(clickedDate);

    if (recordData && recordData.id) {
      navigate('/detail', {
        state: {
          recordId: recordData.id // 상세조회에서의 api 호출을 위해 record_id 넘기기
        }
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    fetch(`http://3.36.228.115:8080/api/records?year=${year}&month=${month}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200) {
          const scoreMap = {};
          data.forEach(item => {
            scoreMap[item.record_date] = {
              id: item.record_id,
              score: item.energy_score
            };
          });
          setScores(scoreMap);
        } else {
          console.error(data.message);
          setScores({});
        }
      })
      .catch(err => {
        console.error("연동 실패로 임시 데이터 표시:", err);
        setScores(TEMP_SCORES);
      });
  }, [date]);

  // 해당 날짜의 id와 점수 반환
  function getScore(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    return scores[key] ?? null;
  }

  return (
    <Calendar
      value={date}
      onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)} // 월 변경 시 API 호출
      formatDay={(locale, date) => date.getDate()}
      tileContent={({ date }) => {
        const recordData = getScore(date);
        const score = recordData ? recordData.score : null;
        return (
          <div
            className="energy-circle"
            style={{
              backgroundColor: score ? "#AEC3AA" : "#EAEAEA"
            }}
          >
            {score ?? ""}
          </div>
        )
      }}
      onClickDay={handleDayClick}
    />
  );
}

export default CalendarComponent;