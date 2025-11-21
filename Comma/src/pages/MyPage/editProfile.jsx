import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(40, 45, 55, 0.12);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 22px;
  width: 86vw;
  max-width: 380px;
  min-width: 280px;
  margin: 0 auto;
  box-shadow: 0 4px 28px rgba(80, 80, 80, 0.08);
  padding: 28px 22px 26px 22px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 17px;
  right: 17px;
  font-size: 1.38em;
  color: #a2a2b2;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.15em;
  font-weight: bold;
  color: #22294e;
  text-align: center;
  margin-bottom: 29px;
`;

const ProfileImageBox = styled.div`
  position: relative;
  width: 74px;
  height: 74px;
  margin-bottom: 18px;
`;
const ProfileImage = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: #f3f4f8;
  object-fit: cover;
`;
const CameraIcon = styled.label`
  position: absolute;
  right: -6px;
  bottom: -5px;
  width: 32px;
  height: 32px;
  background: #dee2f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px white solid;
  box-shadow: 0 2px 8px rgba(100, 100, 100, 0.06);
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  color: #c8c8d0;
  font-weight: bold;
  font-size: 19px;
  cursor: pointer;
`;

const NicknameInput = styled.input`
  width: 92%;
  background: #f2f3f7;
  border: none;
  border-radius: 10px;
  padding: 16px 13px;
  color: #252a45;
  font-size: 1.07em;
  text-align: center;
  margin-bottom: 32px;
  outline: none;
  font-family: inherit;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 13px;
  width: 100%;
`;

const Btn = styled.button`
  flex: 1;
  border-radius: 10px;
  font-size: 1em;
  border: none;
  padding: 15px 0;
  background: ${({ primary }) => (primary ? "#535970" : "#edeef3")};
  color: ${({ primary }) => (primary ? "#fff" : "#444")};
  font-weight: 550;
  cursor: pointer;
`;

export default function EditProfile() {
  const [nickname, setNickname] = useState("기존 닉네임");
  const [profileImg, setProfileImg] = useState("");
  const navigate = useNavigate();

  // 이미지 업로드
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
      // 실제 서버 업로드 로직 필요
    }
  };

  // 이미지 삭제
  const handleImageDelete = () => setProfileImg("");

  const handleCancel = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleSave = () => {
    // 저장 로직 (닉네임/이미지 변경 API 등)
    // 이후 마이페이지로 이동 또는 닫기
    navigate(-1); // 일단 뒤로 가기
  };

  // 닫기(모달 X)
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Overlay>
      <Modal>
        <CloseIcon onClick={handleClose}>×</CloseIcon>
        <Title>프로필 수정</Title>
        <ProfileImageBox>
          <ProfileImage src={profileImg || "/user-icon.png"} alt="프로필" />
          <CameraIcon htmlFor="profile-upload">
            <span role="img" aria-label="camera" style={{ fontSize: "21px" }}>
              📷
            </span>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </CameraIcon>
          {profileImg && <DeleteIcon onClick={handleImageDelete}>×</DeleteIcon>}
        </ProfileImageBox>
        <NicknameInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={24}
        />
        <ButtonRow>
          <Btn onClick={handleCancel}>취소하기</Btn>
          <Btn primary onClick={handleSave}>
            저장하기
          </Btn>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
