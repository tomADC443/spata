import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
const authorize = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session && typeof session.user.id === "string") {
      //res.status(401).json({ error: "Unauthorized - no session provided" });
     return session;
    } 
    return false;
  };
export default authorize;