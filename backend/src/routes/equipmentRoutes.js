import express from "express";
import {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  getEquipmentRequests
} from "../controllers/equipmentController.js";

const router = express.Router();

router.post("/", createEquipment);
router.get("/", getEquipments);
router.get("/:id", getEquipmentById);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);
router.get("/:id/requests", getEquipmentRequests);

export default router;
