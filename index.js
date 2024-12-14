const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
let posts = [
    {
    id:uuidv4(),
    username: "developer01",
    content : "Sometimes the most complex problems have the simplest solutions,and it's in finding those solutions that true innovation happens."
    },
    {
    id:uuidv4(),
    username: "sde-sam",
    content : "CRUD in Node.js: Because who needs complex business logic when you can just create, read, update, and delete your way through life?"
    },
    {
    id:uuidv4(),
    username: "anonymous",
    content : "Stucked in a matrix, get me the row and column i'll get you out #DSA"
    }
];
app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});

app.post("/posts",(req,res) =>{
    let{username, content}=req.body;
    let id= uuidv4(); 
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) =>{
    let{id}=req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res) =>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res) => {
    let{id}=req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res) => {
    let{id}=req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("port is listening");
});