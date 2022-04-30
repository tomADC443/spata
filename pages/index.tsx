import { NextPage } from "next";
import Navbar from "../components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Landing: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Hi {session?.user?.given_name || "Stranger"}</h1>
        <h2>
          Click <Link href="/quiz">here</Link> to learn some http codes.
        </h2>
      </div>
    </>
  );
};
export default Landing;
