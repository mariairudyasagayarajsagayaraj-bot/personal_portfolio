const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // ✅ added

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ONLY ONE DB CONNECTION (use Railway URL)
const db = mysql.createConnection(process.env.MYSQL_URL);

// connect to DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ Database Connected");
  }
});

// add data
app.post("/add", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send("User added");
      }
    }
  );
});

// get data
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

// home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// start server
const PORT = process.env.PORT || 5000; // ✅ important for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});