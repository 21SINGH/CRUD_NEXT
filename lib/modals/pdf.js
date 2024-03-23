import { Schema, model, models } from "mongoose";

const PdfSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user : {type : Schema.Types.ObjectId, ref: "User"}
});


const Pdf = models.Pdf || model("Pdf", PdfSchema);

export default Pdf ;
