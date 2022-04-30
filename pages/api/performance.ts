import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import authorize from "../../server/auth/authorize";
import getUserPerformance from "../../server/profile/performance";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const session = await authorize(req, res);
      if (!session) {
        res.status(401).json({ error: "Unauthorized - no session provided" });
        return;
      }
      const userPerformance = await getUserPerformance(session);
      res.status(201).json({ userPerformance: userPerformance });
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      return;
  }
};
export default handler;

