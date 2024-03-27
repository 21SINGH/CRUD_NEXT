import { PDFDocument } from "pdf-lib";
import { NextResponse } from "next/server";

// export const POST = async (req, res) => {
//   const body = await req.json();
//   const { pdfData, startPage, endPage } = body;

//   console.log(pdfData);

//   try {
//     // Ensure pdfData is provided and not null
//     if (!pdfData) {
//       throw new Error("PDF data is missing");
//     }

//     // Load the original PDF document
//     const pdfBuffer = Buffer.from(pdfData.data);
//     // console.log(pdfBuffer);
//     const pdfDoc = await PDFDocument.load(pdfBuffer);

//     // Create a new PDF document for storing extracted pages
//     const newPdfDoc = await PDFDocument.create();

//     // Iterate over the selected pages and copy them to the new PDF document
//     for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
//       // Ensure the page number is valid
//       if (pageNum < 1 || pageNum > pdfDoc.getPageCount()) {
//         throw new Error(`Invalid page number: ${pageNum}`);
//       }

      
//       // Copy the page from the original document
//       const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);

//       // Add the copied page to the new document
//       newPdfDoc.addPage(copiedPage);
//     }
//     // Save the new PDF document as bytes
//     const pdfBytes = await newPdfDoc.save();
//     console.log(pdfBytes)

//      // Convert Uint8Array to a regular array
//     const dataArray = Array.from(pdfBytes);

//     // Create the object with type and data fields
//     const pdfDataToSend = {
//       type: 'Buffer',
//       data: dataArray
//     };

//     console.log(pdfDataToSend);
//     return new NextResponse(
//       JSON.stringify({ message: "PDF splited successfully", pdfDataToSend }),
//       { status: 200, headers: { "Content-Type": "application/json" },  }
//     );
//   } catch (error) {
//     console.error("Error splitting PDF:", error);

//     // Return an error response if PDF splitting fails
//     return new NextResponse(JSON.stringify({ error: "Failed to split PDF" }), {
//       status: 500,
//     });
//   }
// };

export const POST = async (req, res) => {
  const body = await req.json();
  const { pdfData, pageNumbers } = body;

  try {
    if (!pdfData) {
      throw new Error("PDF data is missing");
    }

    // Load the original PDF document
    const pdfBuffer = Buffer.from(pdfData.data);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const newPdfDoc = await PDFDocument.create();

    // Parse page numbers provided by the user
    const pagesToCopy = parsePageNumbers(pageNumbers, pdfDoc.getPageCount());

    // Copy specified pages to the new document
    for (const pageNum of pagesToCopy) {
      // Ensure the page number is valid
      if (pageNum < 1 || pageNum > pdfDoc.getPageCount()) {
        throw new Error(`Invalid page number: ${pageNum}`);
      }

      // Copy the page from the original document
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);

      // Add the copied page to the new document
      newPdfDoc.addPage(copiedPage);
    }

    const pdfBytes = await newPdfDoc.save();
    const dataArray = Array.from(pdfBytes);

    const pdfDataToSend = {
      type: 'Buffer',
      data: dataArray
    };

    return new NextResponse(
      JSON.stringify({ message: "PDF split successfully", pdfDataToSend }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error splitting PDF:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to split PDF" }), {
      status: 500,
    });
  }
};

// Function to parse page numbers or ranges provided by the user
function parsePageNumbers(pageNumbers, maxPages) {
  const pagesToCopy = new Set();

  const ranges = pageNumbers.split(','); // Split by comma to handle multiple entries

  for (const range of ranges) {
    const parts = range.trim().split('-'); // Split by hyphen to handle ranges

    if (parts.length === 1) {
      // Single page number
      const pageNum = parseInt(parts[0]);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
        pagesToCopy.add(pageNum);
      }
    } else if (parts.length === 2) {
      // Page range
      const start = parseInt(parts[0]);
      const end = parseInt(parts[1]);
      if (!isNaN(start) && !isNaN(end) && start >= 1 && end <= maxPages && start <= end) {
        for (let i = start; i <= end; i++) {
          pagesToCopy.add(i);
        }
      }
    }
  }

  return Array.from(pagesToCopy);
}

