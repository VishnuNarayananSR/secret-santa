import { Router } from "express";
import {
  addNewParticipantByGroupId,
  editParticipantByGroupId,
  deleteParticipantByGroupId,
} from "../controllers/participantController";

const router = Router();

router.post("/", addNewParticipantByGroupId);
router.patch("/:groupId/:participantId", editParticipantByGroupId);
router.delete("/:groupId/:participantId", deleteParticipantByGroupId);

export default router;
