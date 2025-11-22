import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(41, 41, 51, 0.13);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 18px;
  width: 87vw;
  max-width: 330px;
  min-width: 265px;
  box-shadow: 0 4px 24px rgba(80, 80, 80, 0.12);
  padding: 27px 18px 19px 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.08em;
  font-weight: bold;
  color: #22294e;
  text-align: center;
  margin-bottom: 17px;
`;

const ContentText = styled.div`
  font-size: 1.03em;
  color: #82828a;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 28px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 11px;
  width: 100%;
  margin-top: 6px;
`;

const Btn = styled.button`
  flex: 1;
  border-radius: 9px;
  font-size: 1em;
  border: none;
  padding: 14px 0;
  background: ${({ primary }) => (primary ? "#535970" : "#edeef3")};
  color: ${({ primary }) => (primary ? "#fff" : "#535970")};
  font-weight: 550;
  cursor: pointer;
`;

export default function Delete() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://shim.syu-likelion.org/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("탈퇴가 완료되었습니다. 🙏");
      localStorage.clear();
      navigate("/");
    } catch (e) {
      const msg = e?.response?.data?.message || "서버에서 오류가 발생했습니다.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>회원 탈퇴</Title>
        <ContentText>
          그동안의 기록이 모두 삭제됩니다.
          <br />
          정말 탈퇴하실 건가요?
        </ContentText>
        <ButtonRow>
          <Btn onClick={handleWithdraw} disabled={loading}>
            {loading ? "처리중..." : "탈퇴할게요"}
          </Btn>
          <Btn primary onClick={() => navigate(-1)}>
            더 써볼래요
          </Btn>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
