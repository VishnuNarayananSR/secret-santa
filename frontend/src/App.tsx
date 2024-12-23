import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import _404 from "./pages/_404";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Participant from "./pages/Participants";

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
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
