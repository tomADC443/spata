import AuthButtons from "./AuthButon";
import styles from "./Navbar.module.css";

import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-item"]}>
        <a href="/">Home</a>
      </div>
      <div className={styles["navbar-item"]}>
        <a href="/quiz">Quiz</a>
      </div>
      <div className={styles["navbar-item"]}>
        <a href="/profile">Profile</a>
      </div>
      <div className={styles["navbar-item"]} style={{ marginLeft: "auto" }}>
        <AuthButtons />
      </div>
      {session && (
        <a href="/profile">
          <img
            src={session?.user?.image}
            alt="Your Google Profile Picture"
            referrerPolicy="no-referrer"
            style={{
              width: "3rem",
              height: "3rem",
              marginLeft: "3rem",
              borderRadius: "50%",
            }}
            className={styles["navbar-item"]}
          />
        </a>
      )}
    </div>
  );
};
export default Navbar;
