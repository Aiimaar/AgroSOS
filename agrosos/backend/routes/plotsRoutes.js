import express from 'express';
import multer from 'multer';
import * as plotController from '../controllers/plotController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", authenticateToken, plotController.getPlots);
router.post("/", authenticateToken, upload.single('image'), plotController.createPlot);
router.put("/:id", authenticateToken, upload.single('image'), plotController.updatePlot);
router.delete("/:id", authenticateToken, plotController.deletePlot);

export default router;
