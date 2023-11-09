import { Button } from "antd";
import "./AddTable.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItemTable = () => {
  const api = "http://localhost:8090/api/v1/groups";
  const redirecUrl = useNavigate();
  const [errorGroupName, setErrorGroupName] = useState(""); // Initialize error state
  const [errorMember, setErrorMember] = useState(""); // Initialize error state
  // Khai báo tham chiếu
  const groupNameRef = useRef("");
  const memberRef = useRef("");
  const addItem = () => {
    const creatorUserId = localStorage.getItem("userId");
    console.log(creatorUserId);
    //get item
    const result = {
      groupName: groupNameRef.current.value,
      member: memberRef.current.value,
      creatorUserId: creatorUserId,
    };
    // console.log(result);
    const { groupName, member } = result;
    if (groupName.trim() === "" || member.trim() === "") {
      // if(groupName.trim() === '' && member.trim() === ''){
      //     setErrorGroupName('Vui lòng nhập name');
      //     setErrorMember("Vui lòng nhập age");
      // }else
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
    axios
      .post(api, result)
      .then((res) => {
        if (res.data === "ok") {
          //do something
          // redirect về listTable
          redirecUrl("/Table");
        } else if (res.data === "not ok") {
          alert("Group name đã tồn tại!");
        }
      })
      .catch((err) => {
        //btvn, show modal error, or alert error
        alert("Error!");
        // console.log("err post", err);
      });
  };

  return (
    <>
      <div>
        <h3>Thêm mới item</h3>
        <label className="edit_lable_input">
          <span className="edit_content_name">
            <b>Group name</b>
          </span>
          <input
            className="edit_input_value"
            type="text"
            name="groupName"
            placeholder="Group name"
            ref={groupNameRef}
          />
        </label>
        <p className="add_error_input">{errorGroupName}</p>{" "}
        {/* Display the error message */}
        <label className="edit_lable_input">
          <span className="edit_content_name">
            <b>Member</b>
          </span>
          <input
            className="edit_input_value"
            type="text"
            name="member"
            placeholder="Member"
            ref={memberRef}
          />
        </label>
        <p className="add_error_input">{errorMember}</p>
      </div>
      <Button onClick={() => addItem()}>Add Item</Button>
    </>
  );
};

export default AddItemTable;
