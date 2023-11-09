import {
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    DashboardOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../main';


export default function Root() {
    let authStore = useAuth();
    let navigate = useNavigate();

    const logoutPage = () => {
        authStore.signout(navigate);
    }

    return (
        <>
            <div id="sidebar">
                <h1 style={{cursor:"pointer"}} onClick={() => logoutPage()}>logout - Đăng xuất</h1>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faReact} spin fontSize={'30px'}></FontAwesomeIcon>
                    </div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button className='nav_btn_search' type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/DashBoard`}><DashboardOutlined />Dashboard</Link>
                        </li>
                        <li>
                            <Link to={`/Form`}><SettingFilled />Form</Link>
                        </li>
                        <li>
                            <Link to={`/Table`}><SmileOutlined />Table</Link>
                        </li>
                        <li>
                            <Link to={`/Me`}><SyncOutlined />Me</Link>
                        </li>
                    </ul>
                </nav>
                    <p><Link to={`/ChangePass`}>Change password</Link></p>
            </div>
            <div id="detail">
                <Outlet></Outlet>
            </div>
        </>
    );
}