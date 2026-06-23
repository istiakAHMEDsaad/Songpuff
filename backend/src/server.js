import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true, path: ".env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", songRoutes);

app.get("/", (req, res) => {
  res.send({ success: 200, message: "Songpuff server is running..." });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port:${PORT}`);
// });
export default app;
