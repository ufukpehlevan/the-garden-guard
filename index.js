var admin = require("firebase-admin");
var express = require("express");

const app = express();

app.use(express.json());

var serviceAccount = require("./gg.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/addNotification", (req, res) => {
  const { text } = req.body;

  try {
    admin.app().firestore().collection("notifications").add({
      text: text,
      createdAt: new Date(),
    });

    res.status(200).send("Notification added");
  } catch (e) {
    console.log(e);
  }
});

app.post("/addImage", (req, res) => {
  try {
    admin.app().firestore().collection("images").add({
      url: "https://media.istockphoto.com/photos/freshly-cut-grass-picture-id1192014583?k=20&m=1192014583&s=612x612&w=0&h=Jr9HOAa9QJ6TiBrfBjJXlAR7UFPjsEOsKoP5c058Jck=",
      createdAt: new Date(),
    });

    res.status(200).send("Image added");
  } catch (e) {
    console.log(e);
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Running now");
});
