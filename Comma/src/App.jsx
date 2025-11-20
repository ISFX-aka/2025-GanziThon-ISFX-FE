// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Main from "./pages/Main/MainPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import MyPage from "./pages/MyPage/MyPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import Emotion from "./pages/EnergyScoreForm/1_Emotion";
import KakaoRedirect from "./pages/Login/KakaoRedirect";

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
        <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />
        {/* 필요한 만큼 추가하세요 */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;