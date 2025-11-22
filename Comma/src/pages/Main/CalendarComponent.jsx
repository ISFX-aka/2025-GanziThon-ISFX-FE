import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./CalendarComponent.css";

function CalendarComponent({ onHasTodayRecordChange }) {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const [date, setDate] = useState(new Date());
  const [hasTodayRecord, setHasTodayRecord] = useState(false);

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
          recordId: recordData.id,
        },
      });
    }
  };

  useEffect(() => {
    const fetchScores = async () => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      try {
        const res = await fetch(`/api/records?year=${year}&month=${month}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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

        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() + 1) {
          const mm = String(month).padStart(2, "0");
          const dd = String(today.getDate()).padStart(2, "0");
          const todayKey = `${year}-${mm}-${dd}`;
          setHasTodayRecord(!!scoreMap[todayKey]);
        }
      } catch (err) {
        console.error("서버 통신 실패 또는 네트워크 에러:", err);
        setScores({});
      }
    };

    fetchScores();
  }, [date]);

  useEffect(() => {
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth();

    if (isCurrentMonth) {
      onHasTodayRecordChange(hasTodayRecord);
    }
  }, [hasTodayRecord, date, onHasTodayRecordChange]);

  return (
    <Calendar
      value={date}
      onActiveStartDateChange={({ activeStartDate }) =>
        setDate(activeStartDate)
      }
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
