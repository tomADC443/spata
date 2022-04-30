import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
interface ButtonI {
  text: string;
  handleClick: any;
}

const AuthButtons = () => {
  const { data: session } = useSession();

  const button: ButtonI = {
    text: session ? "Logout" : "Login",
    handleClick: session ? signOut : signIn,
  };
  return (
    <div>
      <button onClick={button.handleClick} className="button subtleButton">
        {button.text}
      </button>
    </div>
  );
};
export default AuthButtons;
