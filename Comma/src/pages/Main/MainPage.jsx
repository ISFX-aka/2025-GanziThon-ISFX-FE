import styles from './MainPage.module.css';
import CalendarComponent from './CalendarComponent';

function MainPage() {
  return (
    <div className={styles.viewport}>
      <div className={styles.container}>
        <CalendarComponent />
        <button className={styles.btn}>오늘의 기록 입력하기</button>
      </div>
    </div>
  )
}

export default MainPage;