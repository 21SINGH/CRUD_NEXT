import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URL;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  } else if (connectionState === 2) {
    console.log("Connecting.....");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "restApiNEXT",
      bufferCommands: false,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connect;
