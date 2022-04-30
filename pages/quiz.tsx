import { GetServerSideProps } from "next";
import { NextPage } from "next";
import Answers from "../components/Quiz/Answers";
import Code from "../components/Quiz/Code";
import { MouseEvent, useState } from "react";
import { useSession } from "next-auth/react";
import config from "../config";

export type Answer = { id: number; phrase: string };
export type handleAnswerClick = (answerId: number) => void;
interface QuizData {
  code: number;
  rightAnswerId: number;
  answers: Answer[];
}
[];
interface QuizProps {
  quizData: QuizData[];
}
type UserAnswer = {
  code: number;
  userAnswer: string;
  answer: string;
  hasAnsweredCorrect: boolean;
};
type quizResult = UserAnswer[];
const quizResult: quizResult = [];

const Quiz: NextPage<QuizProps> = (props) => {
  const { data: session, status } = useSession();

  const [index, setIndex] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const challenge = props.quizData[index];

  const handleEndQuizClick = async () => {
    setQuizOver(true);
    if (status == "authenticated") {
      await postQuizResult(quizResult);
    }
  };
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
          <button onClick={async () => await handleEndQuizClick()}>
            end quiz
          </button>
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

const postQuizResult = async (quizResult: quizResult) => {
  const response = await fetch("api/quiz", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizResult),
  });
};
export default Quiz;

export const getServerSideProps: GetServerSideProps<any> = async () => {

  const quizData = await fetchQuizData()
    
  
  console.log("THIS IS DATA:", quizData);
  return {
    props: quizData,
  };
};
const fetchQuizData = async () => {
  return fetch(config.SERVER_URL + "/api/quiz", {
    method: "GET",
  }).then((response) => {
    return response
      .json()
      .then((data) => {
        console.log("DATA:", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
