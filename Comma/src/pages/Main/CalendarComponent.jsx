import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./CalendarComponent.css";

function CalendarComponent({ onHasTodayRecordChange }) {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const [date, setDate] = useState(new Date());

  // 해당 날짜의 id와 점수 반환
  function getScore(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const key = `${year}-${month}-${day}`;
    return scores[key] ?? null;
  }

  const handleDayClick = (clickedDate) => {
    const recordData = getScore(clickedDate);
    if (!recordData) return;
    if (recordData && recordData.id) {
      navigate("/detail", {
        state: {
          recordId: recordData.id, // 상세조회 api 호출을 위해 record_id 넘기기 (useLocation으로 받기)
        },
      });
    }
  };

  useEffect(() => {
    const fetchScores = async () => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      try {
        const res = await fetch(
          `http://3.36.228.115:8080/api/records?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          console.error(json?.message ?? res.status);
          setScores({});
          return;
        }

        const items = Array.isArray(json?.data) ? json.data : [];
        const scoreMap = {};
        items.forEach((item) => {
          scoreMap[item.record_date] = {
            id: item.record_id,
            score: item.energy_score,
          };
        });
        setScores(scoreMap);
      } catch (err) {
        console.error("서버 통신 실패 또는 네트워크 에러:", err);
        setScores({}); // 실서비스에서는 빈 데이터로!
      }
    };

    fetchScores();
  }, [date]);

  // 오늘 기록 존재 여부를 부모에게 알려줌 -> 기록 버튼 유무 결정
  useEffect(() => {
    const hasRecord = !!getScore(new Date());
    onHasTodayRecordChange(hasRecord);
  }, [scores]);

  return (
    <Calendar
      value={date}
      onActiveStartDateChange={({ activeStartDate }) =>
        setDate(activeStartDate)
      } // 월 변경 시 API 호출
      formatDay={(locale, date) => date.getDate()}
      tileContent={({ date }) => {
        const recordData = getScore(date);
        const score = recordData ? Math.round(recordData.score) : null;
        return (
          <div
            className="energy-circle"
            style={{
              backgroundColor: score ? "#AEC3AA" : "#EAEAEA",
            }}
          >
            {score ?? ""}
          </div>
        );
      }}
      onClickDay={handleDayClick}
    />
  );
}

export default CalendarComponent;
