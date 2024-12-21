import express from "express";
import {
  createGroup,
  getGroupById,
  getGroups,
} from "../controllers/groupController";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);

export default router;
