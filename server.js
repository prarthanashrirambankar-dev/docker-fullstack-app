const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "apppassword",
  database: process.env.DB_NAME || "appdb"
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS time");

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Docker Full-Stack App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
          }
          h1 {
            color: #333;
          }
          .status {
            padding: 15px;
            display: inline-block;
            border-radius: 8px;
            background: #e8f5e9;
          }
        </style>
      </head>
      <body>
        <h1>🚀 Docker Full-Stack Application</h1>
        <div class="status">
          ✅ Node.js application is running<br>
          ✅ PostgreSQL database is connected<br>
          Database time: ${result.rows[0].time}
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <h1>Application Error</h1>
      <p>Database connection failed.</p>
    `);
  }
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      status: "healthy",
      database: "connected"
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      database: "disconnected"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});