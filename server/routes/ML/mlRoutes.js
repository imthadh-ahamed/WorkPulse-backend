import express from "express";
import { predict } from "../../controllers/ML/mlController.js";

const router = express.Router();

router.post("/predict", predict);

export default router;