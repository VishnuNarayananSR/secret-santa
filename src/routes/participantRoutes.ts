import { Router } from "express";
import {
  addNewParticipantByGroupId,
  editParticipantByGroupId,
  deleteParticipantByGroupId,
  getParticipantsByGroupId,
} from "../controllers/participantController";

const router = Router();

router.get("/:groupId", getParticipantsByGroupId);
router.post("/", addNewParticipantByGroupId);
router.patch("/:groupId/:participantId", editParticipantByGroupId);
router.delete("/:groupId/:participantId", deleteParticipantByGroupId);

export default router;
