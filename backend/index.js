var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var uuid = require("uuid");

var tasks = [
  {
    id: uuid.v4(),
    title: "Task 1",
    status: "todo",
    description: "Read description of programming challenge",
  },
  {
    id: uuid.v4(),
    title: "Task 2",
    status: "todo",
    description: "Implement awesome web app",
  },
  {
    id: uuid.v4(),
    title: "Task 3",
    status: "completed",
    description: "Polish project",
  },
  {
    id: uuid.v4(),
    title: "Task 4",
    status: "inprogress",
    description: "Send solution to LogMeIn",
  },
];

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/tasks", function (req, res) {
  res.json(tasks);
});

app.post("/api/tasks", function (req, res) {
  console.log("POST a new Task", req.body);
  if (
    !req.body ||
    !req.body.id ||
    !req.body.description ||
    !req.body.title ||
    !req.body.status
  ) {
    res.status(400).send("Invalid task format");
    return;
  }
  if (tasks[req.body.id]) {
    res.status(409).send("Conflict. Task already defined");
    return;
  }

  tasks[req.body.id] = {
    id: req.body.id,
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
  };
  res.status(204).send();
});

app.put("/api/tasks/:id", function (req, res) {
  console.log("PUT a new Task", req.params.id, req.body);

  if (!tasks[req.params.id]) {
    res.status(404).send();
    return;
  }

  const { id, title, status, description } = req.body;
  tasks[req.params.id] = {
    id: id,
    title: title,
    status: status,
    description: description,
  };
  res.status(204).send();
});

app.delete("/api/tasks/:id", function (req, res) {
  if (!tasks[req.params.id]) {
    res.status(404).send();
    return;
  }

  delete tasks[req.params.id];
  res.status(204).send();
});

app.listen(4000, function () {
  console.log("To-Do app listening on port 4000!");
});
