import { useParams } from "react-router-dom";
import DispatchLetter from "../components/DispatchLetter";
import ParticipantList from "../components/ParticipantList";
import ParticipantCreate from "../components/ParticipantCreate";

const Participants = () => {
  const { groupId } = useParams();
  return (
    <div className="flex flex-col mt-12 flex-grow items-center gap-4 size-full p-2 animate-fade-in md:flex-row md:justify-between">
      <div className="fixed top-20 right-4 md:right-8">
        <DispatchLetter groupId={groupId} />
      </div>
      <div className="flex flex-col items-center gap-4 w-full justify-center flex-grow">
        <ParticipantList />
        <ParticipantCreate />
      </div>
    </div>
  );
};

export default Participants;
