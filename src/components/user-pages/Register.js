import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { loginActions } from "../../store/login-slice";

export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [cookies] = useCookies(["cookie-name"]);
    useEffect(() => {
        if (cookies.jwt) {
            history.push("/student");
        }
    }, [cookies, history]);

    const [values, setValues] = useState({
        name: "",
        usn: "",
        email: "",
        password: "",
        dept: "",
    });
    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
            theme: "dark",
            autoClose: 1500,
        });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/register`,
                    {
                        ...values,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const { errors, user } = data;
                if (errors) {
                    generateError(errors.error);
                    return;
                }
                if (user) {
                    dispatch(
                        userActions.setUserObj({ user, userType: "student" })
                    );
                    dispatch(loginActions.login());
                    toast.success("Registered Successfully", {
                        position: "bottom-right",
                        theme: "dark",
                        autoClose: 1500,
                    });
                }
                // console.log(data);
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="d-flex align-items-center auth px-0 h-100">
                <div className="row w-100 mx-0 mt-5">
                    <div className="col-lg-4 mx-auto">
                        <div className="card text-left py-5 px-4 px-sm-5">
                            <div>
                                <h2>Register</h2>
                            </div>
                            {/* <h4>New here?</h4> */}
                            <h6 className="font-weight-light">
                                Signing up is easy. It only takes a few steps
                            </h6>
                            <form
                                className="pt-3"
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="name"
                                        placeholder="Name"
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type=""
                                        className="form-control form-control-lg"
                                        name="usn"
                                        placeholder="USN"
                                        required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="dept"
                                        placeholder="Department"
                                        defaultValue={
                                            "Information Science and Engineering"
                                        }
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option>Dept</option>
                                        <option>Biotech Engineering</option>
                                        <option>Chemical Engineering</option>
                                        <option>
                                            Computer Science and Engineering
                                        </option>
                                        <option>Civil Engineering</option>
                                        <option>
                                            Electronics and Communication
                                        </option>
                                        <option>Electrical Engineering</option>
                                        <option>
                                            Electronics and Instrumentation
                                        </option>
                                        <option>
                                            Electronics and Telecommunication
                                        </option>
                                        <option>
                                            Industrial and Instrumentation
                                        </option>
                                        <option>
                                            Information Science and Engineering
                                        </option>
                                        <option>Mechanical Engineering</option>
                                        <option>Medical Electronics</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        name="password"
                                        required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {/* <div className="mb-4">
                                    <div className="form-check">
                                        <label className="form-check-label text-muted">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                            />
                                            <i className="input-helper"></i>I
                                            agree to all Terms & Conditions
                                        </label>
                                    </div>
                                </div> */}
                                <div className="mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className="text-center mt-4 font-weight-light">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-primary">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default Register
