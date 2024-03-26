import User from "../../../../../../lib/modals/user";
import { NextResponse } from "next/server";
import fetchUser from "../../../../../middleware/fetchUser";
import connect from "../../../../../../lib/db";

export const POST = async (request) => {
    try {
        await connect();
        await fetchUser(request);
        const userId = request.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                {
                    status: 404,
                }
            );
        }
        return new NextResponse(JSON.stringify({ message: "user", user }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse("Error in fetching user detail: " + error, {
            status: 500,
        });
    }
};
