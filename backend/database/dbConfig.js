import mongoose from "mongoose";
export const dbconfig = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URL);
    if (dbConnection) {
      console.log(
        `database connected successfully!connection id: ${dbConnection.connection.id}`
      );
    } else {
      console.log("database connection failed");
    }
  } catch (err) {
    console.log(err);
  }
};
