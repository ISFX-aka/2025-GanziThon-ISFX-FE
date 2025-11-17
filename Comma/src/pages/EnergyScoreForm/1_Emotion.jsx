import React from "react";
import BottomBar from "../../components/BottomBar";

const emotions = ["서럽다", "행복하다", "피곤하다", "화가난다", "평온하다"];

function Emotion() {
  return (
    <div className="emotion-wrapper">
      <div className="emotion-header">
        <span>6/1</span>
        <p>
          하루가 끝난 지금,
          <br />
          당신의 감정상태는 어떤가요?
        </p>
      </div>
      <div className="emotion-options">
        {emotions.map((emotion, idx) => (
          <button key={idx} className="emotion-btn">
            {emotion}
          </button>
        ))}
      </div>
      <BottomBar prevLabel="이전" nextLabel="다음" />
    </div>
  );
}

export default Emotion;
