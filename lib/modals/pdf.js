import { Schema, model, models } from "mongoose";

const PdfSchema = new Schema(
  {
    title: { type: String, required: true },
    pdf: { data: Buffer, contentType: String }, // Store PDF file as Buffer
    user: { type: Schema.Types.ObjectId, ref: "User" },
  }
);

const Pdf = models.Pdf || model("Pdf", PdfSchema);

export default Pdf;
