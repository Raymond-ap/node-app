const HttpError = require("../models/http-error");
const { validationResult } = require('express-validator')

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Raymond Adams",
    phone: 23356879030,
    location: {
      address: "Ghana",
      lng: 56.5959509,
      lat: -532344455,
    },
    email: "raymond@gmail.com",
    password: "testing",
  },
  {
    id: "u2",
    name: "Johnny James",
    phone: 23356879030,
    location: {
      address: "Ghana",
      lng: 56.5959509,
      lat: -532344455,
    },
    email: "johhny@gmail.com",
    password: "testing",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    throw new HttpError("Invalid inputs passed", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Email already taken", 401);
  }

  const createdUser = {
    id: new Date().getTime().toString(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const indentifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!indentifiedUser || indentifiedUser.password !== password) {
    throw new HttpError("User credentials invalid", 401);
  }
  res.json({ message: "Login Successful" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
