import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import Pdf from "../../../../../lib/modals/pdf";
import fetchUser from "../../../../middleware/fetchUser";
import connect from "../../../../../lib/db";

export const POST = async (req, res) => {
  try {
    await fetchUser(req); // Fix typo, should be req, not request
    const userId = req.user.id;
    console.log(userId);

    await connect(); // Establish database connection

    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");
    console.log(filename);

    // Save PDF file to the local directory
    await writeFile(path.join(process.cwd(), "pdfs/" + filename), buffer);

    // Save PDF data to the database
    const pdfData = {
      title: title,
      pdf: {
        data: buffer,
        contentType: file.type,
      },
      user: userId,
    };

    const newPdf = await Pdf.create(pdfData);

    return new NextResponse(
      JSON.stringify({ message: "PDF uploaded successfully", newPdf: newPdf }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};


export const GET = async (req, res) => {
  try {
    await fetchUser(req);
    const userId = req.user.id;
    console.log(userId);

    await connect(); // Establish database connection

    // Find all PDFs associated with the user
    const userPDFs = await Pdf.find({ user: userId });

    // Set Content-Disposition header to inline
    return new NextResponse(
      JSON.stringify({ userPDFs: userPDFs }),
      { status: 200, headers: { 'Content-Type': 'application/pdf' } } // Set correct content type
    );
  } catch (error) {
    console.log('Error occurred ', error);
    return new NextResponse(
      JSON.stringify({ Message: 'Failed', error: error }),
      { status: 500 }
    );
  }
};

