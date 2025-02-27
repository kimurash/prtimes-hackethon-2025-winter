import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
import MyDreamPage from "./pages/dreams/mine/MyDreamPage";
import LoginPage from "./pages/login/LoginPage";
import PublicDreamPage from "./pages/dreams/public/PublicDreamPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyDreamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dreams/mine" element={<MyDreamPage />} />
        <Route path="/dreams/public" element={<PublicDreamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
