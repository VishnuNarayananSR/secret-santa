import GroupCreate from "../components/GroupCreate";
import GroupList from "../components/GroupList";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-4 size-full justify-center p-4 animate-fade-in">
      <GroupList />
      <GroupCreate />
    </div>
  );
};

export default Home;
