import { GetServerSideProps } from "next";
import { NextPage } from "next";
import Answers from "../components/Quiz/Answers";
import { useState } from "react";
import { useSession } from "next-auth/react";
import config from "../config";
import Navbar from "../components/Navbar/Navbar";

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

  const numRightAnswers = quizResult?.filter(
    (i) => i.hasAnsweredCorrect
  ).length;

  if (quizOver)
    return (
      <>
        <Navbar />
        <div className="content panel">
          <span className="quiz-question">
            Congratulations, you have guessed {numRightAnswers}/
            {quizResult.length} codes correctly
          </span>

          <a className="button subtleButton" href="/quiz">
            Retry
          </a>
          <a className="button subtleButton" href="/profile">
            View your Statistics
          </a>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="content panel">
        <span className="quiz-question">{challenge.code}</span>
        <Answers handleClick={handleAnswerClick} answers={challenge.answers} />

        <button
          onClick={async () => await handleEndQuizClick()}
          className="button subtleButton"
        >
          End Quiz
        </button>
      </div>
    </>
  );
};

const postQuizResult = async (quizResult: quizResult) => {
  const res = await fetch("api/quiz", {
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
  const quizData = await fetchQuizData();

  return {
    props: quizData,
  };
};
const fetchQuizData = async () => {
  const res = await fetch(config.SERVER_URL + "/api/quiz");
  const data = await res.json();

  return data;
};
