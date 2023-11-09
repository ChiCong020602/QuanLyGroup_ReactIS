import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../main";
import "./LoginForm.css";

function LoginForm() {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorFName, setErrorFname] = useState("");
  const [errorLName, setErrorLName] = useState("");
  const [errorLUserName, setErrorLUserName] = useState("");
  const [errorLPass, setErrorLPass] = useState("");
  const navigate = useNavigate();

  const authStore = useAuth();

  const handleRegisterClick = () => {
    setRegisterVisible(true);
  };

  const handleLoginClick = () => {
    setRegisterVisible(false);
  };

  const handleLogin = () => {
    // Thực hiện AJAX request ở đây bằng cách sử dụng fetch hoặc axios

    // Ví dụ sử dụng fetch:
    // fetch('http://localhost:8090/api/v1/auth/login', {
    //   method: 'GET',
    // headers: {
    //   'Authorization': 'Basic ' + btoa(loginUsername + ':' + loginPassword),
    //   'Content-Type': 'application/json',
    // },
    // })
    // .then((response) => {
    //   if (response.status === 401) {
    //     console.log('401');
    //   } else {
    //     return response.json();
    //   }
    // })
    // .then((data) => {
    //   localStorage.setItem('tokenUser','asafasagasffasfaf');
    //   navigate('/Dashboard')
    //   // Làm gì đó với dữ liệu và điều hướng trang ở đây
    //   // Ví dụ: window.location.replace('http://127.0.0.1:5500/index.html');
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    setErrorLUserName("");
    setErrorLPass("");
    if (loginUsername.trim() === "") {
      setErrorLUserName("Vui lòng nhập username");
      return;
    } else if (loginPassword.trim() === "") {
      setErrorLPass("vui lòng nhập password");
      return;
    }
    axios
      .get("http://localhost:8090/api/v1/auth/login", {
        headers: {
          Authorization: "Basic " + btoa(loginUsername + ":" + loginPassword),
          "Content-Type": "application/json",
        },
      })
      // .then((response) => {
      //   console.log(response);
      //   if (response.status === 401) {
      //     // console.log("401");
      //     alert("Tài khoản hoặc mật khẩu không chính xác!");
      //   } else {
      //     return response.data;
      //   }
      // })
      .then((response) => {
        // console.log(response.data + "===" + "not ok");
        if (response.data === "not ok") {
          alert("Tài khoản chưa được kích hoạt!");
        } else {
          console.log(response);
          localStorage.setItem("tokenUser", "asafasagasffasfaf");
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userName", loginUsername);
          authStore.signin(navigate);
          // Làm gì đó với dữ liệu và điều hướng trang ở đây
        }
      })
      .catch((error) => {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
        console.error(error);
      });
  };

  const result = {
    userName: loginUsername,
    email: newEmail,
    firstName: newFirstName,
    lastName: newLastName,
    password: loginPassword,
  };

  const handleRegister = () => {
    setErrorUsername("");
    setErrorEmail("");
    setErrorFname("");
    setErrorLName("");
    setErrorPass("");
    if (loginUsername.trim() == "") {
      setErrorUsername("Vui lòng nhập Username");
      return;
    } else if (newEmail.trim() === "") {
      setErrorEmail("Vui lòng nhập Email");
      return;
    } else if (newFirstName.trim() === "") {
      setErrorFname("Vui lòng nhập First Name");
      return;
    } else if (newLastName.trim() === "") {
      setErrorLName("Vui lòng nhập Last Name");
      return;
    } else if (loginPassword.trim() === "") {
      setErrorPass("Vui lòng nhập Password");
      return;
    }
    axios
      .post("http://localhost:8090/api/v1/users", result)
      .then((res) => {
        console.log(res);
        if (res.data == "ok") {
          alert("Đăng ký thành công");
          setRegisterVisible(false);
        } else if (res.data == "not ok") {
          alert("Username hoặc Email đã tồn tại!");
        }
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <div className="Login_Form">
      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={handleLoginClick}>Login</button>
      {isRegisterVisible ? (
        <div id="register">
          <table>
            <tbody>
              <tr>
                <td className="content">Username</td>
                <td>
                  <input
                    type="text"
                    id="regester_user"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>{errorUsername}</span>
                </td>
              </tr>
              <tr>
                <td className="content">Email</td>
                <td>
                  <input
                    type="email"
                    id="regester_email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>{errorEmail}</span>
                </td>
              </tr>
              <tr>
                <td className="content">First Name</td>
                <td>
                  <input
                    type="text"
                    id="regester_firstName"
                    placeholder="First name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>{errorFName}</span>
                </td>
              </tr>
              <tr>
                <td className="content">Last Name</td>
                <td>
                  <input
                    type="text"
                    id="regester_lastName"
                    placeholder="Last Name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>{errorLName}</span>
                </td>
              </tr>
              <tr>
                <td className="content">Password</td>
                <td>
                  <input
                    type="password"
                    id="login-password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>{errorPass}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <button id="btn-login" onClick={handleRegister}>
            Register
          </button>
        </div>
      ) : (
        <div id="login">
          <p className="login_img">
            <img src="src/image/me.jpg" alt="" />
          </p>
          <table>
            <tbody>
              <tr>
                <td className="content">Username</td>
                <td>
                  <input
                    type="text"
                    id="login-user"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <span>{errorLUserName}</span>
                </td>
              </tr>
              <tr>
                <td className="content">Password</td>
                <td>
                  <input
                    type="password"
                    id="login-password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <span>{errorLPass}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <Link to={`/ForgotPass`}>ForgotPassword?</Link>
          </p>
          <button id="btn-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
