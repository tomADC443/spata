import { GetServerSideProps } from "next";
import { NextPage } from "next";
import Answers from "../components/Quiz/Answers";
import Code from "../components/Quiz/Code";
import { MouseEvent, useState } from "react";
import { useSession } from "next-auth/react"


export type Answer = { id: number; phrase: string };
export type handleAnswerClick = (answerId: number) => void;
interface QuizProps {
  quizData: Array<{
    code: number;
    rightAnswerId: number;
    answers: Array<Answer>;
  }>;
}
type UserAnswer = {
  code: number;
  userAnswer: string;
  answer: string;
  hasAnsweredCorrect: boolean;
};
type quizResult = UserAnswer[];
const quizResult:quizResult = [];

const Quiz: NextPage<QuizProps> = (props) => {
  const { data: session, status } = useSession()


  const [index, setIndex] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const challenge = props.quizData[index];

  const handleEndQuizClick =async () =>{
    setQuizOver(true)
    if(status=="authenticated"){
      await postQuizResult(quizResult);
    }
  }
  const handleAnswerClick: handleAnswerClick = async (userAnswerId) => {
    const isTrue = userAnswerId === challenge.rightAnswerId ? true : false;
    quizResult.push({
      code: challenge.code,
      hasAnsweredCorrect: isTrue,
      answer: challenge.answers[challenge.rightAnswerId].phrase,
      userAnswer: challenge.answers[userAnswerId].phrase,
    });
    if (props.quizData[index + 1]) {
      setIndex(index + 1);
    } else {
     await handleEndQuizClick();
    }
  };

  return (
    <>
      {!quizOver && challenge && (
        <div>
          <Code code={challenge.code}></Code>
          <Answers
            handleClick={handleAnswerClick}
            answers={challenge.answers}
          ></Answers>
          <button onClick={async () => await handleEndQuizClick()}>end quiz</button>
        </div>
      )}
      {quizOver && (
        <div>
          <p>Your results</p>
          <p>{JSON.stringify(quizResult)}</p>
        </div>
      )}
    </>
  );
};

const postQuizResult = async (quizResult:quizResult) => {
  const response = fetch("api/quiz", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizResult),
  });
};
export default Quiz;


export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      quizData: [
        {
          code: 400,
          rightAnswerId: 1,
          answers: [
            { id: 0, phrase: "Continue" },
            { id: 1, phrase: "Bad Request" },
            { id: 2, phrase: "Unauthorized" },
            { id: 3, phrase: "Not Implemented" },
          ],
        },
        {
          code: 401,
          rightAnswerId: 2,
          answers: [
            { id: 0, phrase: "Expectation Failed" },
            { id: 1, phrase: "Locked" },
            { id: 2, phrase: "Forbidden" },
            { id: 3, phrase: "Method Not Allowed" },
          ],
        },
        {
          code: 202,
          rightAnswerId: 3,
          answers: [
            { id: 0, phrase: "Use Proxy" },
            { id: 1, phrase: "Multi-Status" },
            { id: 2, phrase: "OK" },
            { id: 3, phrase: "Accepted" },
          ],
        },
      ],
    },
  };
};