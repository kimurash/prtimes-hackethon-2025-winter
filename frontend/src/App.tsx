import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
import MyDreamPage from "./pages/dreams/mine/MyDreamPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyDreamPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
