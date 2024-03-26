import User from "../../../../../../lib/modals/user";
import { NextResponse } from "next/server";
import connect from "../../../../../../lib/db";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    await connect();

    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return new NextResponse(JSON.stringify({ message: "Invalid Credintentials" }), {
        status: 401,
      });
    } 

    const passwordComapare = await bcrypt.compare(password, oldUser.password);
    if(!passwordComapare){
        return new NextResponse(JSON.stringify({ message: "Invalid Credintentials" }), {
            status: 401,
          });
    }

    const data = {
        user : {
          id : oldUser.id,
        }
      }
    const authToken =  jwt.sign(data , process.env.JWT_SECRET);
    return new NextResponse(JSON.stringify({ message: "Login Successful" , authToken }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in login : " + error, {
      status: 500,
    });
  }
};
