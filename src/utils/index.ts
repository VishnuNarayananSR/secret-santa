import { Participant } from "../types";

export const shuffleAndAssignSecretSantas = (
  participants: Participant[]
): Map<Participant, Participant> => {
  const shuffledParticipants = [...participants].sort(
    () => 0.5 - Math.random()
  );
  return shuffledParticipants.reduce((map, participant, index) => {
    map.set(
      participant,
      shuffledParticipants[(index + 1) % shuffledParticipants.length]
    );
    return map;
  }, new Map<Participant, Participant>());
};
