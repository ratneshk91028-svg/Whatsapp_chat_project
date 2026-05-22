const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("Connection Successfull");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let AllChats = [
    {
    from : "Neha",
    to : "Preeti",
    massage : "Send your exam sheets.",
    created_at : new Date(),
    },
    {
    from : "Rohit",
    to : "Mohit",
    massage : "teach me JS callbacks",
    created_at : new Date(),
    },
    {
    from : "amit",
    to : "sumit",
    massage : "All the best!",
    created_at : new Date(),
    },
    {
    from : "Anita",
    to : "Ramesh",
    massage : "Bring me some fruits:",
    created_at : new Date(),
    },
    {
    from : "tony",
    to : "peter",
    massage : "Love you 3000",
    created_at : new Date(),
    },
];

Chat.insertMany(AllChats);