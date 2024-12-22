import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Group from "./pages/Group";
import Navbar from "./components/NavBar";
import _404 from "./pages/_404";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Participant from "./pages/Participants";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participants/:id" element={<Participant />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
