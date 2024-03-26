import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connect from "../../../../../lib/db";
import Pdf from "../../../../../lib/modals/pdf";
import User from "../../../../../lib/modals/user";
import fetchUser from "../../../../middleware/fetchUser";

export const GET = async (request) => {
  try {
    await connect();

    await fetchUser(request);
    const userId = request.user.id;
    console.log(userId);
    // const userId = "6602df00864cb1d8f297eaea";
    const pdf  = await Pdf.find({user: userId});

    return new NextResponse(JSON.stringify(pdf), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching notes" + error, { status: 500 });
  }
};


export async function POST(request) {
  try {
    // Your existing code to fetch user ID, connect, parse form data, etc.
    // await fetchUser(request);
    // const userId = request.user.id;
    const userId = "6602df00864cb1d8f297eaea";
    console.log(userId);
    await connect();

    // console.log(userId);

    // Parse form data
    const formData = await request.formData();
    const title = formData.get("title");
    const pdfFile = formData.get("file");

    // Check if title, pdf file, and user ID are present
    if (!title || !pdfFile || !userId) {
      return new NextResponse(
        JSON.stringify({
          message: "Title, PDF file, and user ID are required",
        }),
        { status: 400 }
      );
    }

    // Convert pdf file to buffer
    const pdfBuffer = await pdfFile.arrayBuffer();
    const pdfData = {
      data: Buffer.from(pdfBuffer),
      contentType: pdfFile.type,
    };
    // Create new Pdf and update user
    const newPdf = await createPdfAndUpdateUser(userId, title, pdfData);

    return new NextResponse(
      JSON.stringify({ message: "PDF uploaded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST method:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error in uploading PDF" }),
      { status: 500 }
    );
  }
}

async function createPdfAndUpdateUser(
  userId,
  title,
  pdfData
) {
  // Create new Pdf document with the associated user ID
  const newPdf = new Pdf({
    title: title,
    pdf: pdfData,
    user: userId,
  });

  // Save Pdf document to the database
  await newPdf.save();

  // Update the user document to include the newly created PDF's ObjectId
  await User.findByIdAndUpdate(
    userId,
    { $push: { pdfs: newPdf._id } },
    { new: true }
  );

  return newPdf;
}
