import express from "express";
import "dotenv/config";
import { apiRoutes } from "./routes/api";
import getConnection from "./config/database";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

// Cấu hình CORS - ĐẶT TRƯỚC TẤT CẢ MIDDLEWARE KHÁC
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

apiRoutes(app);

getConnection();

app.listen(port, () => {
  console.log(`My web is running in port: ${port}`);
});
