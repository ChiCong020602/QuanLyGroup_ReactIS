import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ChangePass.css";
import axios from "axios";
import { useAuth } from "../main";

const ChangePass = () => {
  const navigate = useNavigate();

  const authStore = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errorOldPass, setErrorOldPass] = useState("");
  const [errorNewPass, setErrorNewPass] = useState("");

  const result = {
    oldPass: oldPass,
    newPass: newPass,
  };

  const handleChangePass = () => {
    if (oldPass.trim() === "") {
      setErrorOldPass("Vui lòng nhập mật khẩu cũ");
      setErrorNewPass("");
      return;
    } else if (newPass.trim() === "") {
      setErrorNewPass("Vui lòng nhập mật khẩu mới");
      setErrorOldPass("");
      return;
    }
    setErrorOldPass("");
    setErrorNewPass("");
    axios
      .put(
        `http://localhost:8090/api/v1/users/ChangePass/${localStorage.getItem(
          "userName"
        )}`,
        result
      )
      .then((res) => {
        console.log(res);
        if (res.data === "ok") {
          alert("đổi mk thanh công");
          authStore.signout(navigate);
        }else if(res.data === "not ok")(
          alert("Mật khẩu không đúng")
        )
      })
      .catch((err) => {
        alert("Error");
      });
  };
  return (
    <>
      <>
        <div id="change_pass">
          <table>
            <tbody>
              <tr className="input_changePass">
                <td className="content">Old password</td>
                <td>
                  <input
                    type="password"
                    name="passOld"
                    placeholder="Old password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="tr_err">
                <td colSpan={2}>{errorOldPass}</td>
              </tr>
              <tr className="input_changePass">
                <td className="content">New password</td>
                <td>
                  <input
                    type="password"
                    name="passNew"
                    placeholder="New password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="tr_err">
                <td colSpan={2}>{errorNewPass}</td>
              </tr>
              <tr>
                <td>
                  <button className="btn" onClick={handleChangePass}>
                    Đổi mật khẩu
                  </button>
                  <Link to={`/DashBoard`}>
                    <button className="btn">Quay Lại</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

export default ChangePass;
