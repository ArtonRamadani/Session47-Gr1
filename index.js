const express = require("express");
const { add } = require("./helpers/math");
// const routes = require("routes")
// const pathPrefix = "/api-v1"
const app = express();

app.use(express.json());

// let result = add(5, 3)
// console.log("result",result)

app.get("/", (req, res) => {
    res.send("Hello from my node js app for Session 47!")
})
app.get("/health", (req, res) => {
    res.send("Server is healthy")
})
// app.use(pathPrefix, routes)

app.listen(8047)
console.log("server is up and running at 8047")

module.exports = app