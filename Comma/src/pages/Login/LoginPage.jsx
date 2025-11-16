import styles from './LoginPage.module.css';
import serviceLogo from '../../assets/쉼_로고.svg'
import kakaoLogo from '../../assets/카카오_로고.svg'

function Login() {
  return (
    <div className={styles.viewport}>
      <div className={styles.container}>
        <img className={styles.serviceLogo} src={serviceLogo}></img>
        <div className={styles.guideText}>
          <p><span className={styles.highlightText}>오늘의 소셜 에너지</span>를 분석하여</p>
          <p><span className={styles.highlightText}>회복 루틴</span>을 추천해드릴게요.</p>
        </div>
        <button className={styles.btn}>
          <img className={styles.kakaoLogo} src={kakaoLogo}></img>
          카카오톡으로 시작하기
        </button>
      </div>
    </div>
  )
}

export default Login;
