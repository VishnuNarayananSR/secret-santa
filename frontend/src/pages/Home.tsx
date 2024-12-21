import GroupCreate from "../components/GroupCreate";
import GroupList from "../components/GroupList";

const Home = () => {
  return (
    <div>
      <GroupList />
      <GroupCreate />
    </div>
  );
};

export default Home;
