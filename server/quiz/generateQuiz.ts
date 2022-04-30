import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Answers from "../../components/Quiz/Answers";

const prisma = new PrismaClient();

const getPhrases = async () => {
  return await prisma.httpCode.findMany({
    select: { phrase: true },
  });
};

type Answers = { id: number; phrase: string };
export const generateQuizData = async () => {
  
  const allPhrases = (await getPhrases()).map((phraseObj) => phraseObj.phrase);
  const codeSolutions = await prisma.httpCode.findMany();

  const quizData = codeSolutions.map((codeSolution) => {
    let randomAnswerArr: string[] = getRandomAnswerArr(
      codeSolution.phrase,
      4,
      allPhrases
    );
    const rightAnswerIndex = randomAnswerArr.indexOf(codeSolution.phrase);
    const randomAnswerObjArr: Answers[] = randomAnswerArr.map(
      (randomAnswer, i) => {
        return { id: i, phrase: randomAnswer };
      }
    );
    return {
      code: codeSolution.code,
      rightAnswerId: rightAnswerIndex,
      answers: randomAnswerObjArr,
    };
  });
  return shuffleArray(quizData);
};

const getRandomAnswerArr = (
  rightAnswer: string,
  answerNum: number,
  wrongAnswerPool: Array<string>
) => {
  const getRandomAnswer = () => {
    return wrongAnswerPool[Math.floor(Math.random() * wrongAnswerPool.length)];
  };
  const randomAnswerArr = [rightAnswer];
  for (let i = 1; i < answerNum; i++) {
    let randomAnswer = getRandomAnswer();
    while (randomAnswerArr.includes(randomAnswer)) {
      randomAnswer = getRandomAnswer();
    }
    randomAnswerArr.push(randomAnswer);
  }
  shuffleArray(randomAnswerArr);
  return randomAnswerArr;
};

const shuffleArray = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// {
//   code: 400,
//   rightAnswerId: 1,
//   answers: [
//     { id: 0, phrase: "Continue" },
//     { id: 1, phrase: "Bad Request" },
//     { id: 2, phrase: "Unauthorized" },
//     { id: 3, phrase: "Not Implemented" },
//   ],
// },
// {
//   code: 401,
//   rightAnswerId: 2,
//   answers: [
//     { id: 0, phrase: "Expectation Failed" },
//     { id: 1, phrase: "Locked" },
//     { id: 2, phrase: "Forbidden" },
//     { id: 3, phrase: "Method Not Allowed" },
//   ],
// },
// {
//   code: 202,
//   rightAnswerId: 3,
//   answers: [
//     { id: 0, phrase: "Use Proxy" },
//     { id: 1, phrase: "Multi-Status" },
//     { id: 2, phrase: "OK" },
//     { id: 3, phrase: "Accepted" },
//   ]
