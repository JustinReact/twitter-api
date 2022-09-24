const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

app.use(cookieParser());

app.use("/api/tweets", require("./routes/api/tweets"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static("client/build"));

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on PORT 5000");
});
