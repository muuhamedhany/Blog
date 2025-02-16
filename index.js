import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// To store the posts
let posts = [];

// CREATE a Post
function Post(title, content) {
  this.title = title;
  this.content = content;
  this.fullDate = new Date();
  this.date = this.fullDate.toLocaleString();
}

// ADD a Post
function addPost(title, content) {
  let post = new Post(title, content);
  posts.push(post);
}

// DELETE a Post
function deletePost(index) {
  posts.splice(index, 1);
}

// EDIT a Post
function editPost(index, title, content) {
  posts[index] = new Post(title, content);
}

/////////////////////////// --RENDERING THE WEBPAGES-- ///////////////////////////

// HOME
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

// VIEW
app.get("/view/:id", (req, res) => {
  let index = req.params.id; // Gets the id parameter from the URL
  let post = posts[index];

  res.render("view.ejs", {
    postId: index,
    title: post.title,
    content: post.content,
  });
});

// DELETE
app.post("/delete", (req, res) => {
  let index = req.body["postId"];
  deletePost(index);
  res.redirect("/");
});

// EDIT
app.get("/edit/:id", (req, res) => {
  let index = req.params.id;
  let post = posts[index];

  res.render("create.ejs", {
    postId: index,
    title: post.title,
    content: post.content,
  });
});

// UPDATE
app.post("/update", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];
  let index = req.body["index"];
  editPost(index, title, content);
  res.redirect("/");
});

function glow() {
  let glowElement = document.getElementById("create");
  if (glowElement) {
    glowElement.classList.add("glow");
  }
}

// CREATE
app.get("/create", (req, res) => {
  res.render("create.ejs");

  console.log(function glow() {
    let glowElement = document.getElementById("create");
    if (glowElement) {
      glowElement.classList.add("glow");
    }
  });
  glow();
});

// ADD
app.post("/add", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];

  addPost(title, content);
  res.redirect("/");
});

app.listen(port, () => {
  addPost(
    "How Easy It Is to Build a Blog with Express.js and EJS",
    "Creating a blog website with Express.js and EJS is surprisingly simple! Express.js handles the backend logic, while EJS makes rendering dynamic content a breeze. With just a few lines of code, you can set up routes, manage posts, and create a functional blog. These tools are beginner-friendly and perfect for learning web development. Start your project today!"
  );
  addPost(
    "Why Red Dead Redemption 2 is a Masterpiece",
    "Red Dead Redemption 2 (RDR2) is an open-world game set in the Wild West. With stunning visuals, a gripping story, and immersive gameplay, it lets you live the life of outlaw Arthur Morgan. From hunting and fishing to epic shootouts, RDR2 offers endless adventures. Its rich world and emotional narrative make it a must-play for gamers."
  );
  console.log(`YOOO THE SERVER IS HOSTING ON ${port}.`);
});
