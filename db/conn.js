const mongoose = require('mongoose');

const DB = "mongodb+srv://sumit:sumit1234@cluster0.ep2ru.mongodb.net/users?retryWrites=true&w=majority";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB);
  console.log("connection successful");
}