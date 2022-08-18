var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var uuid = require("uuid");

var ids = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];

var tasks = {
  [ids[0]]: {
    id: ids[0],
    title: "Task 1",
    status: "todo",
    description: "Read description of programming challenge",
  },
  [ids[1]]: {
    id: ids[1],
    title: "Task 2",
    status: "todo",
    description: "Implement awesome web app",
  },
  [ids[2]]: {
    id: ids[2],
    title: "Task 3",
    status: "completed",
    description: "Polish project",
  },
  [ids[3]]: {
    id: ids[3],
    title: "Task 4",
    status: "inprogress",
    description: "Send solution to LogMeIn",
  },
};

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.get("/api/tasks", function (req, res) {
  res.json(Object.keys(tasks).map((key) => tasks[key]));
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
    const msg = "Invalid task format";
    res.status(400).json({ msg: msg });
    return;
  }
  if (tasks[req.body.id]) {
    const msg = "Task already exists";
    res.status(409).json({ msg: msg });
    return;
  }

  tasks[req.body.id] = {
    id: req.body.id,
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
  };
  res.status(204).json();
});

app.put("/api/tasks/:id", function (req, res) {
  console.log("PUT a new Task", req.params.id, req.body);

  if (!tasks[req.params.id]) {
    const msg = "Task Not Found";
    res.status(404).json({ msg: msg });
    return;
  }

  const { id, title, status, description } = req.body;
  tasks[req.params.id] = {
    id: id,
    title: title,
    status: status,
    description: description,
  };
  res.status(204).json();
});

app.delete("/api/tasks/:id", function (req, res) {
  if (!tasks[req.params.id]) {
    const msg = "Task Not Found";
    res.status(404).json({ msg: msg });
    return;
  }

  delete tasks[req.params.id];
  res.status(204).json();
});

app.post("/api/tasks/order", function (req, res) {
  if (tasks[req.body.length === 0]) {
    const msg = "No Task to reorder";
    res.status(404).json({ msg: msg });
    return;
  }

  const taskArr = req.body;
  let newObj = {};
  Object.keys(taskArr).map((key) => {
    newObj[taskArr[key].id] = taskArr[key];
  });
  tasks = newObj;
  res.status(204).json();
});

app.listen(4000, function () {
  console.log("To-Do app listening on port 4000!");
});
