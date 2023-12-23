const express = require("express");
const app = express();
const port = 4000;
app.use(express.json());

const users = [
  { id: "0", name: "ahmed", age: "25" },
  { id: "1", name: "salim", age: "28" },
  { id: "2", name: "nour", age: "22" },
  { id: "3", name: "houssem", age: "30" },
];

app.get("/users", (req, res) => {
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === id);
  res.send({ user });
});

app.post("/users/add", (req, res) => {
  const newUser = req.body;
  console.log("newUser", newUser);
  const userId = newUser.id;
  const userExist = users.find((el) => el.id === userId);
  console.log("userExist", userExist);
  if (userExist) return res.status(403).json({ msg: "user exist" });
  else {
    users.push(newUser);
    res.status(200);
    res.send({ msg: "users added", newUser });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userExist = users.find((el) => el.id === id);
  if (userExist) {
    delete users[id];
    res.send({ msg: "user deletet" });
  } else {
    res.status(404);
    res.send({ msg: "user not found" });
  }
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const user = users.find((el) => el.id === id);

  if (user) {
    Object.assign(user, updatedUser);
    res.send({ msg: "user updated" });
  } else {
    res.send({ msg: "user not found" });
  }
});

app.listen(port, function () {
  console.log(
    "The server is running, " +
      " please, open your browser at http://localhost:",
    port
  );
});
