// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Main from "./pages/Main/MainPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import MyPage from "./pages/MyPage/MyPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import Emotion from "./pages/EnergyScoreForm/1_Emotion";
import Talk from "./pages/EnergyScoreForm/2_Talk";
import Vehicle from "./pages/EnergyScoreForm/3_Vehicle";
import Crowding from "./pages/EnergyScoreForm/4_Crowding";
import Area from "./pages/EnergyScoreForm/5_Area";
import Comment from "./pages/EnergyScoreForm/6_Comment";
import LoadingPage from "./pages/Loading/LoadingPage";
import SavingPage from "./pages/Loading/SavingPage";
import EditProfile from "./pages/MyPage/editProfile";
import Date from "./pages/MyPage/Date";
import Delete from "./pages/MyPage/Delete";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/energy" element={<Emotion />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/crowding" element={<Crowding />} />
        <Route path="/area" element={<Area />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/saving" element={<SavingPage />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/date" element={<Date />} />
        <Route path="/delete" element={<Delete />} />
        {/* 필요한 만큼 추가하세요 */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
