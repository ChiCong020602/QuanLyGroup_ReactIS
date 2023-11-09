import { Link } from "react-router-dom";
import "./ForgotPass.css";
import axios from "axios";
import { useState } from "react";

const ForgotPass = () => {
  const [userName, setUserName] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const handleChangePass = () => {
    if (userName.trim() === "") {
      setErrorUserName("Vui lòng nhập username!");
      return;
    }
    setErrorUserName("");
    axios
      .get(`http://localhost:8090/api/v1/users/${userName}`)
      .then((res) => {
        if(res.data != "not ok"){
          alert(`Mật khẩu mới là: ${res?.data}`);
        }else if(res.data == "not ok"){
          alert("Tài khoản không tồn tại!")
        }
        
      })
      .catch((err) => {
        alert("Error");
      });
  };

  return (
    <>
      <div id="forgot_pass">
        <table>
          <tbody>
            <tr>
              <td className="content">Username</td>
              <td>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
       <span> {errorUserName}</span>
        <button className="btn" onClick={handleChangePass}>
          Gửi mật khẩu mới
        </button>
        <button className="btn">
          <Link to={`/Login`}>Login</Link>
        </button>
      </div>
    </>
  );
};

export default ForgotPass;
