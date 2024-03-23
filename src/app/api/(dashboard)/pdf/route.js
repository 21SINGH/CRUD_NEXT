import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connect from "../../../../../lib/db";
import Pdf from "../../../../../lib/modals/pdf";
import User from "../../../../../lib/modals/user";


export const GET = async (request) => {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing userId" }),
          { status: 400 }
        );
      }
  
      await connect();
  
      const user = await User.findById(userId);
      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }
  
      const pdf = await Pdf.find({ user: new Types.ObjectId(userId) });
      return new NextResponse(JSON.stringify(pdf), { status: 200 });
    } catch (error) {
      return new NextResponse("Error in fetching notes" + error, { status: 500 });
    }
  };