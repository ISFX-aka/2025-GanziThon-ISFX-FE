import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "./CalendarComponent";
import styles from "./MainPage.module.css";
import mypageIcon from "../../assets/mypage-icon.svg";

function MainPage() {
  const navigate = useNavigate();
  const [hasTodayRecord, setHasTodayRecord] = useState(false);
  useEffect(() => {
    // #root의 height를 없애고 싶을 때
    const root = document.getElementById("root");
    if (root) {
      // 기존 height를 저장하고 초기화
      root.dataset.prevHeight = root.style.height;
      root.style.height = "auto"; // 또는 "auto"
    }
    return () => {
      // 페이지 벗어날 때 height 복구
      if (root && root.dataset.prevHeight !== undefined) {
        root.style.height = root.dataset.prevHeight;
        delete root.dataset.prevHeight;
      }
    };
  }, []);
  return (
    <div className={styles.viewport}>
      <div className={styles.container}>
        <img
          src={mypageIcon}
          alt="마이페이지"
          className={styles.mypageIcon}
          onClick={() => {
            navigate("/mypage");
          }}
        />
        <CalendarComponent onHasTodayRecordChange={setHasTodayRecord} />
        {!hasTodayRecord && (
          <button
            className={styles.btn}
            onClick={() => {
              navigate("/energy");
            }}
          >
            오늘의 기록 입력하기
          </button>
        )}
      </div>
    </div>
  );
}

export default MainPage;
