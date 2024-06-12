const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());



app.post("/chat", (req, res) => {
  const { message } = req.body;
  if (message === "debit") {
    res.json({
      messages: "You selected Debit. Here is the information.",
      buttons: [
        { name: "More Debit Info", res: "more debit info" },
        { name: "Go Back", res: "go back" },
      ],
    });
  } else if (message === "credit") {
    res.json({
      messages: "You selected Credit. Here is the information.",
      buttons: [
        { name: "More Credit Info", res: "more credit info" },
        { name: "Go Back", res: "go back" },
      ],
    });
  } else {
    res.json({ messages: `You said: ${message}` });
  }
});

app.use(express.static(path.join(__dirname, "web", "dist")));

app.get("*", (req, res) => {
  const public = path.join(__dirname, "web", "dist", "index.html");
  res.sendFile(public);
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
