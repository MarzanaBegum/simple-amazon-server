const mongoose = require("mongoose");

const connection = {};

async function dbConnect() {
  try {
    if (connection.isConnected) {
      console.log("Already connected");
      return;
    }
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log("use previous connection");
        return;
      }
      await mongoose.disconnect();
    }
    const db = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("new connection");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error, "connection failed!");
  }
}

async function dbDisconnect() {
  try {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
      } else {
        console.log("Not disconnected");
      }
    }
  } catch (error) {
    console.log("disconnected...", error);
  }
}

module.exports = { dbConnect, dbDisconnect };
