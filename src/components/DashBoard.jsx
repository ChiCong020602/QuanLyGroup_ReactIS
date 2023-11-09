import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import './DashBoard.css';
import { Chart } from "./Chartjs";
import { PieChart } from "./PieChartjs";
import Clock from './Clockjs';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from "../features/counter/counterReducer";

import { fetchUserById } from './../features/apiSave/recallApiLoading';
import { Link } from "react-router-dom";

export default function DashBoard() {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    return (
        <>
            <div id="body_container">
                <div id="dash_head">
                    <h1 id="welcome">Welcome back {localStorage.getItem("userName")} </h1>
                    <Link to={"/Me"}><p className="head_image_user"><img src="src\image\luffy.jpg" alt="user" className="image_user" /></p></Link>
                </div>
                <div id="dash_body">
                    <div className="body_left"><Clock /></div>
                    <div className="body_right">
                        <div className="body_right_chart"><Chart /></div>
                        <div className="body_right_bottom">
                            <div className="body_right_img"></div>
                            <div className="body_right_pie"><PieChart /></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(fetchUserById())}
                >
                    call api
                </button>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <button
                    aria-label="decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(incrementByAmount(3))}
                >
                    Increment + 3
                </button>
            </div>
            <h2>this is state of redux: {count}</h2> */}
        </>
    );
}