import { GiverAndReceiver, Participant } from "../types";

export const shuffleAndAssignSecretSantas = (
  participants: Participant[]
): GiverAndReceiver[] => {
  const shuffledParticipants = [...participants].sort(
    () => 0.5 - Math.random()
  );
  return shuffledParticipants.reduce((map, participant, index) => {
    const receiver =
      shuffledParticipants[(index + 1) % shuffledParticipants.length];
    map.push({ giver: participant, receiver });
    return map;
  }, new Array<{ giver: Participant; receiver: Participant }>());
};
