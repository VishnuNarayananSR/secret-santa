import express from "express";
import {
  createGroup,
  getGroupById,
  getGroups,
  editGroup,
  deleteGroup,
} from "../controllers/groupController";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.patch("/:id", editGroup);
router.delete("/:id", deleteGroup);

export default router;
