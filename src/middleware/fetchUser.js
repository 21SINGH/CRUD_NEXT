var jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and id to request object
  // console.log("1");
  const headersList = headers();
  // console.log("2");
  const token = headersList.get("auth-token");
  // console.log("3");
  console.log(token);
  try {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Please authenticate using a valid token" }),
        {
          status: 401,
        }
      );
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "please authenticate using a valid token " }),
      {
        status: 401,
      }
    );
  }
};

module.exports = fetchuser;
