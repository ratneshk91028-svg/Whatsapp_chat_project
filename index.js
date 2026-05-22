const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

//Index Rout
app.get("/chats",async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
});

//New Route
app.get("/chats/new",(req, res) => {
    res.render("new.ejs");
});

//Create Rout
app.post("/chats", (req, res) =>{
    let { from, to, massage } = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        massage : massage,
        created_at : new Date(),
    });

    newChat
        .save()
        .then((result) => {
            console.log("Chat was saved");
            res.redirect("/chats");
        })
        
        .catch((err) => {
            console.log(err);
        });
});

//Edit Rout
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Rout: 
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {massage : newMassage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {massage : newMassage},
        { runValidators : true, new:true}
    );

    // console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Rout:
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("Server is Working");
});

app.listen(8080,() => {
    console.log("Server is listining on port 8080");
});