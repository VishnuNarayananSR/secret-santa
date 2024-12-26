import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import _404 from "./pages/_404";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Participant from "./pages/Participants";
import snowman1 from "./assets/snowman1.svg";
import tree from "./assets/tree.svg";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen text-gray-900">
          <Navbar />
          <main className="flex flex-grow flex-col justify-center items-center size-full p-4 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:groupId/participants/" element={<Participant />} />
              <Route path="*" element={<_404 />} />
            </Routes>
            <img
              src={snowman1}
              alt="snowman"
              className="z-[-1] fixed top-32 right-0 w-32 h-32 md:top-36 md:right-0 md:w-40 md:h-40"
            />
            <img
              src={tree}
              alt="snowman"
              className="z-[-1] fixed bottom-4 left-7 w-32 h-32 md:bottom-0 md:left-0 md:w-40 md:h-40"
            />
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
