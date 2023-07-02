import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { loginActions } from "../../store/login-slice";

export default function Login() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        userType: "student",
        ID: "",
        password: "",
    });
    const [id, setid] = useState("USN");

    // const [cookies] = useCookies([]);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/");
        }
    }, [isLoggedIn]);

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
            const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/login`,
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
            if (data) {
                if (data.errors) {
                    console.log(data.errors);
                    const { error } = data.errors;
                    if (error) generateError(error);
                } else {
                    dispatch(
                        userActions.setUserObj({
                            user: data.user,
                            userType: values.userType,
                        })
                    );
                    dispatch(loginActions.login());
                    toast.success("Logged in successfully", {
                        position: "bottom-right",
                        theme: "dark",
                        autoClose: 1500,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="card text-left py-5 px-4 px-sm-5 mt-5">
                            <h4>Login</h4>
                            <h6 className="font-weight-light">
                                Sign in to continue.
                            </h6>

                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-sm font-weight-medium  mx-1 btn-inverse-primary"
                                    name="student"
                                    value="student"
                                    onClick={(e) => {
                                        setValues({
                                            ...values,
                                            userType: e.target.name,
                                        });

                                        setid("USN");
                                    }}
                                >
                                    Student
                                </button>
                                <button
                                    className="btn btn-md font-weight-medium mx-1 btn-inverse-danger"
                                    name="admin"
                                    value="admin"
                                    onClick={(e) => {
                                        setValues({
                                            ...values,
                                            userType: e.target.name,
                                        });

                                        setid("Admin ID");
                                    }}
                                >
                                    Admin
                                </button>
                                <button
                                    className="btn btn-md font-weight-medium  mx-1 btn-inverse-info"
                                    name="company"
                                    value="company"
                                    onClick={(e) => {
                                        setValues({
                                            ...values,
                                            userType: e.target.name,
                                        });
                                        setid("Company ID");
                                    }}
                                >
                                    Company
                                </button>
                            </div>

                            <Form
                                className="pt-3"
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <Form.Group className="d-flex search-field">
                                    <Form.Control
                                        type="text"
                                        name="ID"
                                        placeholder={id}
                                        size="lg"
                                        className="h-auto"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="d-flex search-field">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        size="lg"
                                        className="h-auto"
                                        name="password"
                                        required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Form.Group>
                                <div className="mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-block btn-primary btn-lg font-weight-medium "
                                    >
                                        SIGN IN
                                    </button>
                                </div>
                                {/* <div className="my-2 d-flex justify-content-between align-items-center">
                                    <div className="form-check">
                                        <label className="form-check-label text-muted">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                            />
                                            <i className="input-helper"></i>
                                            Keep me signed in
                                        </label>
                                    </div>
                                    <a
                                        href="!#"
                                        onClick={(event) =>
                                            event.preventDefault()
                                        }
                                        className="auth-link text-muted"
                                    >
                                        Forgot password?
                                    </a>
                                </div> */}
                                {/* <div className="mb-2">
                                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                                </div> */}
                                <div className="text-center mt-4 font-weight-light">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-primary"
                                    >
                                        Create
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default Login
