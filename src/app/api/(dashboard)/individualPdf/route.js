import { NextResponse } from "next/server";
import fetchUser from "../../../../middleware/fetchUser";
import Pdf from "../../../../../lib/modals/pdf";
import connect from "../../../../../lib/db";

export const GET = async (req, res) => {
  try {
    const { searchParams } = new URL(req.url);
    const pdfId = searchParams.get("pdfId");
    // await fetchUser(req);
    // const userId = req.user.id;
    await connect(); // Establish database connection
    const pdf = await Pdf.findById(pdfId);
    if (!pdf) {
      // If PDF is not found, return appropriate response
      return res.status(404).json({ error: "PDF not found" });
    }
    return new NextResponse(
      JSON.stringify({ message: "PDF fetched  successfully" , pdfData : pdf}),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ Message: "Failed" + error }), {
      status: 500,
    });
  }
};
