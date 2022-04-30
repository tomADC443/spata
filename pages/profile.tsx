import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

import Table from "../components/Table/Table";
import getUserPerformance from "../server/profile/performance";
import Navbar from "../components/Navbar/Navbar";

const Profile: NextPage<any> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status !== "authenticated" || !session) {
    return (
      <>
        <Navbar />
        <div className="content">
          <h1>Access Denied</h1>
          <p>Please login before accessing this page.</p>
        </div>
      </>
    );
  }

  const headers = ["Code", "Meaning", "Accuracy"];

  const toTableRow = (obj: any, i: number) => [
    obj.code.code,
    obj.code.phrase,
    obj.correctness + "%",
  ];

  const topTen = props.userPerformance.slice(0, 10);
  const bottomTen = props.userPerformance.slice(-10, -1);

  const topTable = topTen.map(toTableRow);
  const bottomTable = bottomTen.map(toTableRow);

  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Hey {session?.user.given_name}, this is your profile</h1>

        <h2>These are the Codes you know the best</h2>
        <Table headers={headers} table={topTable} />
        <h2>These are the ones you should train</h2>
        <Table headers={headers} table={bottomTable} />
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const session = await getSession(context);
  // const performanceData = await fetch(config.SERVER_URL + "/api/performance", {
  //   method: "GET",
  // });
  let userPerformance;
  if (session) {
    userPerformance = await getUserPerformance(session);
  }

  return {
    props: { userPerformance: userPerformance || null },
  };
};

export default Profile;
