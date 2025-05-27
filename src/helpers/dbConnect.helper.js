import { connect } from "mongoose";

const dbConnect = async (link) => {
  try {
    await connect(link);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
