import { Router } from "express";
import { getSongs } from "../controllers/songController.js";

const router = Router();

router.get("/songs", getSongs);

export default router;
