import express from "express";
import {
  addMaintenance,
  getMaintenanceByAsset
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", addMaintenance);
router.get("/:assetId", getMaintenanceByAsset);

export default router;
