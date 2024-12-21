import { Router } from "express";
import { addNewParticipantByGroupId } from "../controllers/participantController";

const router = Router();

router.post("/", addNewParticipantByGroupId);

export default router;
