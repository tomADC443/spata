import AuthButtons from "./AuthButon";
import styles from './Navbar.module.css'
const Navbar = () => {
  return (
    <div>
      <div className={styles["navbar"]}>
        <div className={styles['navbar-item']}>
          <a href="/profile">Profile</a>
        </div>
        <div className={styles['navbar-item']}>
          <a href="/demo">Demo</a>
        </div>
        <div className={styles['navbar-item']}>
          <AuthButtons></AuthButtons>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
