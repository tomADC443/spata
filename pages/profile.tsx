import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Table from "../components/Table/Table";
import config from "../config";
import getUserPerformance from "../server/profile/performance";
import { generateQuizData } from "../server/quiz/generateQuiz";

const Profile: NextPage<any> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
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
  if (status === "authenticated" && session) {




    return (
      <>

        <h1>Hey {session?.user.given_name}, this is your profile</h1>
        <h2>Personal info</h2>
        <p>session</p>
        <h2>this are the 10 Codes you know the best</h2>
        <Table headers={headers} table={topTable}></Table>
        <h2>These 10 Codes are not that great</h2>
        <Table headers={headers} table={bottomTable}></Table>
      </>
    );
  }

  return (
    <div>
      <h1>Access Denied</h1>
      <p>please login before accessing this page.</p>
    </div>
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
    console.log("USER PERFORMANCE", userPerformance);
  }

  return {
    props: { userPerformance: userPerformance || null },
  };
};

export default Profile;
