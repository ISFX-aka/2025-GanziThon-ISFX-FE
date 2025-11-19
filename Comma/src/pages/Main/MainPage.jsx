import { useNavigate } from 'react-router-dom';
import CalendarComponent from './CalendarComponent';
import styles from './MainPage.module.css';
import mypageIcon from '../../assets/mypage-icon.svg';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.viewport}>
      <div className={styles.container}>
        <img
          src={mypageIcon}
          alt="마이페이지"
          className={styles.mypageIcon}
          onClick={() => { navigate('/mypage') }}
        />
        <CalendarComponent />
        <button className={styles.btn}
          onClick={() => { navigate('/energy') }}>
          오늘의 기록 입력하기
        </button>
      </div>
    </div>
  )
}

export default MainPage;