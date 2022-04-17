import { useEffect, useRef, useState } from "react";

import TextField from "@mui/material/TextField";

import axios from "axios";
import { SERVER } from "../../Constant/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAction } from "../../store/config/storeConfig";
import Cookies from "js-cookie";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postFormRef = useRef();
    const [loading, setLoading] = useState(false);




    const doLogin = createAsyncThunk("login", async (userCredentials) => {
        const res = await axios.post(SERVER + "auth", userCredentials);
        return res.data;
    });


    const onLoginRequestHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userCredentials = {
            email: postFormRef.current["email"].value,
            password: postFormRef.current["password"].value
        };
        const result = await dispatch(doLogin(userCredentials));

        console.log(result);

        if (result.meta.requestStatus === "rejected") {
            Swal.fire({
                icon: "error",
                title: "Invalid User Credentials",
                text: result.error.message,
            });
            setLoading(false);
        }
        else if (result.meta.requestStatus === "fulfilled") {

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Success....Redirecting',
                showConfirmButton: false,
                timer: 4000
            })

            dispatch(authAction.loginSuccessful());
            Cookies.set("accessToken", result.payload.accessToken);
            Cookies.set("refreshToken", result.payload.refreshToken);
            Cookies.set("userEmail", result.payload.email);

            setLoading(false);

            navigate("/dashboard");


        }
    }

    useEffect(() => {
        postFormRef.current["email"].focus();
    }, [])

    return (
        <>
            <div style={{ "margin": 50 }}>
                <div className="col-lg-6">
                    <h3>User Login</h3>
                    <p>
                        To login, please enter email and password. Submit it pressing the Login button.
                    </p>
                    <form ref={postFormRef}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="E-mail Address"
                            type="email"
                            fullWidth
                            required
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Secret Password"
                            type="password"
                            fullWidth
                            required
                            variant="standard"
                        />

                        {loading === true ?
                            <button className="btn btn-success mt-5" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Requesting Login...
                            </button>
                            :
                            <button onClick={(e) => onLoginRequestHandler(e)} type="submit" className="btn btn-success mt-5">Login</button>
                        }
                        <button className="btn btn-danger ml-2 mt-5" type="reset">Reset</button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default Login;