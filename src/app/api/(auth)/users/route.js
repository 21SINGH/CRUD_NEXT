import { NextResponse } from "next/server";
import connect from "../../../../../lib/db";
import User from "../../../../../lib/modals/user";
import { Types } from "mongoose";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect(); // Ensure connection before querying
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching user: " + error, {
      status: 500,
    });
  }
};

// Exporting a function named POST
export const POST = async (request) => {
  try {
    const body = await request.json();
    const { email, userName, password} = body;

    console.log(body);

    await connect();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

   
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });
    await newUser.save();

  
    const data = {
      user : {
        id: newUser.id
      }
    }
    console.log(data);
    const authToken = jwt.sign(data , process.env.JWT_SECRET);
    
    return new NextResponse(
      JSON.stringify({ message: "User created", authToken: authToken}),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse("Error in Creating user: " + error, {
      status: 500,
    });
  }
};

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { userId, newUserName } = body;

    await connect();

    if (!userId || !newUserName) {
      return new NextResponse(
        JSON.stringify({ message: "ID or newusername is required" }),
        {
          status: 400,
        }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid UserId" }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { userName: newUserName },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found | didn't update user succesfully",
        }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User updated succesfully",
        user: updatedUser,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Error in updating User: " + error, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => { 
  try {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");

    // validate the userId
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "userId is required" }),
        {
          status: 400,
        }
      );
    }

    // validate if userId is valid ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid UserId" }), {
        status: 400,
      });
    }

    await connect();

    //TODO


    const deltedUser  =  await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    )

    // check if user was found and deleted
    if (!deltedUser) {
      return new NextResponse(JSON.stringify({ message: "User Not found" }), {
        status: 404,
      });
    }

    // user deleted successfully
    return new NextResponse(
      JSON.stringify({
        message: "User deleted succesfully",
      }),
      {
        status: 200,
      }
    );

  } catch (error) {
    return new NextResponse("Error in deleting User: " + error, {
      status: 500,
    });
  }
}
