import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { generateQuizData } from "../../server/quiz/generateQuiz";
import authorize from "../../server/auth/authorize";

const prisma = new PrismaClient();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const session = await authorize (req, res)
      if (!session) {
        res.status(401).json({ error: "Unauthorized - no session provided" });
        return;
      }
      const createCounter = postUserQuizData(req, res, session);
      res.status(201).json({ rowsCreated: createCounter });
      break;
    case "GET":
      const quizData = await generateQuizData();

      res.status(200).json({ quizData: quizData });
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      return;
  }
};
export default handler;

const postUserQuizData = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
): number => {
  let createCounter = 0;
  req.body.forEach(async (quizResult: any) => {
    const right_wrong = quizResult.hasAnsweredCorrect ? "right" : "wrong";

    await prisma.user_HttpCode.upsert({
      where: {
        codeId_userId: {
          codeId: quizResult.code as number,
          userId: session.user.id as string,
        },
      },
      create: {
        userId: session.user.id as string,
        codeId: quizResult.code as number,
        [right_wrong]: 1,
      },
      update: {
        [right_wrong]: { increment: 1 },
      },
    });
    createCounter++;
  });
  return createCounter;
};
