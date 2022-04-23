import { NextPage } from "next";
import Navbar from "../components/Navbar/Navbar";
import { useSession } from "next-auth/react"

const Landing: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div>
      <Navbar></Navbar>
      {console.log(session)}
      {/* <h1>Hi {session?.user?.name || "Stranger"}</h1> */}
      <h2>
        Click <a href="/quiz">here</a> to learn some http codes.
      </h2>
    </div>
  );
};

export default Landing;
