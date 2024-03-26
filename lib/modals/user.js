import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true},
  password: { type: String, required: true },
  pdfs: [{
    type: Schema.Types.ObjectId,
    ref: 'Pdf',
  }],
});

const User = models.User || model("User", userSchema);

export default User;
