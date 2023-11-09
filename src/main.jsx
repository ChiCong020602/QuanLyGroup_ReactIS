import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.jsx'
import ErrorPage from './error-page.jsx'
import DashBoard from './components/DashBoard.jsx'
import TableCp from './tables/Table.jsx'
import AddItemTable from './tables/AddItemTable';
import store from './store'
import { Provider } from 'react-redux';
import Form from './forms/form.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import { fakeAuthProvider } from './auth/auth.js';
// import RegisterAndLogin from './auth/RegisterAndLogin';
import LoginForm from './auth/LoginForm.jsx'
import ForgotPass from './auth/ForgotPass.jsx'
import Profile from './profile/Profile.jsx'
import ChangePass from './auth/ChangePass.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <RequireAuth>
        <Root />
      </RequireAuth>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "DashBoard",
        element: <DashBoard />,
      },
      {
        path: "Form",
        element: <Form />,
      },
      {
        path: "Table",
        element: <TableCp />,
      },
      {
        path: "Me",
        element: <Profile />
      },
      {
        path: "addItemTable",
        element: <AddItemTable />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginForm />
  },
  {
    path: 'ForgotPass',
    element: <ForgotPass />
  },
  {
    path: 'ChangePass',
    element: <ChangePass/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)

let AuthContext = React.createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {

  // user kieem tra xem nguoi dung login chua

  let signin = ( callback) => {
    return fakeAuthProvider.signin(() => {
      callback("/DashBoard", { replace: true });
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      localStorage.clear();
      callback("/");
    });
  };

  let value = { signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}