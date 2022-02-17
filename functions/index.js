const express = require("express");
const cors = require("cors");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./todoit-firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors({ origin: true }));

app.get("/create-user", (req, res) => {
  const email = req.query.email;
  const password = req.query.birthday;

  admin
    .auth()
    .createUser({
      email: email,
      password: password,
    })
    .then((user) => {
      console.debug(user.uid);
      return res.json({ result: `user create success`, uid: user.uid });
    })
    .catch((error) => {
      console.debug(error);
      return res.json({ result: error.message, uid: null });
    });
});

app.delete("/delete-user", (req, res) => {
  const uid = req.query.uid;
  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return res.json({ result: `user deleted success` });
    })
    .catch((error) => {
      console.debug(error);
      return res.json({ result: error.message });
    });
});

exports.users = functions.region("asia-northeast3").https.onRequest(app);
