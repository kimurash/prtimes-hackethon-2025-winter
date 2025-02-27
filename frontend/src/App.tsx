import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
import MyDreamPage from "./pages/dreams/mine/MyDreamPage";
import PublicDreamPage from "./pages/dreams/public/PublicDreamPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyDreamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dreams/public" element={<PublicDreamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
