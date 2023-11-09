import axios from "axios";
import "./Profile.css";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [typeProfile, setTypeProfile] = useState("");
  const [elementProfile, setElementProfile] = useState("");
  const [errorElement, setErrorElement] = useState("");
  let oldEmail = email;
  let oldName = fullName;

  axios
    .get(
      `http://localhost:8090/api/v1/users/userName/${localStorage.getItem(
        "userName"
      )}`
    )
    .then((res) => {
      setEmail(res.data.email);
      setUsername(res.data.userName);
      setFullName(res.data.lastName + " " + res.data.firstName);
    });

  const handleEditEmail = () => {
    setTypeProfile("email");
    setElementProfile(email);
    setIsModalOpen(true);
    setErrorElement("");
  };
  const handleEditName = () => {
    setTypeProfile("name");
    setElementProfile(fullName);
    setIsModalOpen(true);
    setErrorElement("");
  };

  const result = {
    typeEProfile: typeProfile,
    elmentProfile: elementProfile,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    if (elementProfile.trim() === "") {
      setErrorElement("Không được để trống");
      return;
    }
    if (oldEmail === result.elmentProfile || oldName === result.elmentProfile) {
      setIsModalOpen(false);
      return;
    }
    axios
      .put(
        `http://localhost:8090/api/v1/users/EditProfile/${localStorage.getItem(
          "userName"
        )}`,
        result
      )
      .then((res) => {
        if (res.data == "ok") {
          alert("Đã cập nhật");
          setIsModalOpen(false);
        } else if (res.data == "not ok") {
          alert("Email đã tồn tại");
        }
      })
      .catch((err) => {
        alert("Error");
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div id="profile_css">
        <div className="left">
          <img src="src\image\luffy.jpg" alt="" />
        </div>
        <div className="right">
          <ul className="content">
            <li>* Email</li>
            <p>
              {email} <EditOutlined onClick={handleEditEmail} />
            </p>
            <li>* Username</li>
            <p>{username}</p>
            <li>* Full name</li>
            <p>
              {fullName} <EditOutlined onClick={handleEditName} />
            </p>
          </ul>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          value={elementProfile}
          placeholder={elementProfile}
          onChange={(e) => {
            setElementProfile(e.target.value);
          }}
        />
        <p>{errorElement}</p>
      </Modal>
    </>
  );
};

export default Profile;
