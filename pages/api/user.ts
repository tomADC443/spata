import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Unauthorized - no session provided" });
    return;
  }
  if (!(typeof session.user?.id === "string")) {
    res
      .status(400)
      .json({ error: "Bad Request - user id must be provided as -string-" });
    return;
  }
  switch (method) {
    case "POST":
      //   postUser(req, res,session);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      return;
  }
  res.status(200).json({ data: "foo" });
};
export default handler;

// const postUser = (req: NextApiRequest, res: NextApiResponse, session:Session) => {
//   req.body.quizResult.forEach(async (quizResult: any) => {
//     const right_wrong = quizResult.hasAnsweredCorrect ? "right" : "wrong";

//     await prisma.user_HttpCode.upsert({
//       where: {
//         codeId_userId: {
//           codeId: quizResult.code as number,
//           userId: session.user.id as string,
//         },
//       },
//       create: {
//         userId: session.user.id as string,
//         codeId: quizResult.code as number,
//         [right_wrong]: 1,
//       },
//       update: {
//         [right_wrong]: { increment: 1 },
//       },
//     });
//   });
// };
