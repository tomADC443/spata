import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();
const getUserPerformance = async (session: Session) => {
    const userCodes = await prisma.user_HttpCode.findMany({
      where: { userId: session.user.id },
      select: {
        code: true,
        right: true,
        wrong: true,
      },
    });
    const userPerformance = userCodes.map((userCode) => {
      return {
        code: userCode.code,
        correctness: Math.round(100 / (userCode.right + userCode.wrong) * userCode.right),
      };
    });
    userPerformance.sort((a, b) => {
      return b.correctness - a.correctness;
    });
    return userPerformance;
  };
export default getUserPerformance  