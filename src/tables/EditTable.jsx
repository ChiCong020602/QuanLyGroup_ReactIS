import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./EditTable.css";

const EditTable = ({
  isModalOpen,
  setIsModalOpen,
  itemDetail,
  setItemDetail,
  callBackUpdate,
  data,
}) => {
  const [groupName, setGroupName] = useState("");
  const [member, setMember] = useState("");
  const [groupNameTemp, setGroupNameTemp] = useState("");

  const [errorGroupName, setErrorGroupName] = useState(""); // Initialize error state
  const [errorMember, setErrorMember] = useState(""); // Initialize error state
  useEffect(() => {
    if (itemDetail) {
      setGroupName(itemDetail?.groupName || "");
      setMember(`${itemDetail?.member}` || "");
      setGroupNameTemp(itemDetail?.groupName || "");
    }
  }, [itemDetail?.id, itemDetail?.groupName]);

  const handleOk = () => {
    const groupNameList = data
      .filter((e) => e.groupName !== groupNameTemp)
      .map((e) => e.groupName);
    const checkGroupNameIsExists =
      groupNameList.find((e) => {
        return e === groupName;
      }) === undefined
        ? true
        : false;
    if (!checkGroupNameIsExists) {
      alert("Group name đã tồn tại!");
      return;
    }

    if (groupName.trim() === "" || member.trim() === "") {
      if (groupName.trim() === "") {
        setErrorGroupName("Vui lòng nhập name");
        setErrorMember("");
      } else if (member.trim() === "") {
        setErrorMember("Vui lòng nhập age");
        setErrorGroupName("");
      }
      //btvn hiển thi thông báo lỗi cho người dùng, nâng cao hơn là ktra lỗi là lỗi nào
      return;
    }
    const result = {
      ...itemDetail,
      groupName,
      member,
    };
    // console.log(("result", result));
    // setIsModalOpen(false);
    callBackUpdate(result);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrorGroupName("");
    setErrorMember("");
  };

  return (
    <>
      <Modal
        title="Edit Item"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label className="edit_lable_input">
          <span className="edit_content_name">
            <b>Group name</b>
          </span>
          <input
            className="edit_input_value"
            type="text"
            value={groupName || ""}
            name="groupName"
            placeholder="name"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>
        <p className="edit_error_input">{errorGroupName}</p>{" "}
        {/* Display the error message */}
        <label className="edit_lable_input">
          <span className="edit_content_name">
            <b>Member</b>
          </span>
          <input
            className="edit_input_value"
            type="text"
            value={member || ""}
            name="member"
            placeholder="age"
            onChange={(e) => setMember(e.target.value)}
          />
        </label>
        <p className="edit_error_input">{errorMember}</p>{" "}
        {/* Display the error message */}
      </Modal>
    </>
  );
};

export default EditTable;
