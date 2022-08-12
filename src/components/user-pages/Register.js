import React, { useState, useEffect,  } from 'react';
import { useCookies } from 'react-cookie';
import { Link,Redirect,Route,Switch, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


export default function Register() {  
  const history = useHistory();

  const [cookies] = useCookies(["cookie-name"]);
  // const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
     history.push('/student')
    }
  }, [cookies, history]);

  // const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", USN: "", email: "", password: "", dept: "" });
  // const [pwd, setpwd] = useState("");    
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const regex = new RegExp('^\d[a-zA-Z]\w{1}\d{2}[a-zA-Z]\w{1}\d{3}$');
      // if(!regex.test(values.USN)){
      //     console.log("wtf");
      //     const str = "Invalid USN";
      //     throw str;
      // }
      // if (values.password !== pwd) {
      //   const str = "Password does not match"
      //   throw str;
      // }
      try {
        const { data } = await axios.post(
          "http://localhost:4000/register",
          {
            ...values,
          }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (data) {
          if (data.errors) {
            const { name, USN, email, password, dept } = data.errors;
            if (USN) generateError(USN);
            else if (name) generateError(name);
            else if (email) generateError(email);
            else if (password) generateError(password);
          } else {
            console.log("Logging in");
            history.push('/student/profile');
          }
        }
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      document.getElementById('msg').innerHTML = err;
    }
  };
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div>
                  <h2> Register</h2>
                </div>
                <h4>New here?</h4>
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                <form className="pt-3" onSubmit={(e)=>handleSubmit(e)}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" name="name"
                      placeholder="Name"
                      onChange={(e) => handleChange(e)}
                      required />
                  </div>
                  <div className="form-group">
                    <input type="" className="form-control form-control-lg" name="USN"
                      placeholder="USN"
                      required
                      onChange={(e) => handleChange(e)}
                       />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" name="email"
                      placeholder="Email"
                      required
                      onChange={(e) => handleChange(e)}
                       />
                  </div>
                  <div className="form-group">
                    <select className="form-control form-control-lg" name="dept" placeholder="Department" onChange={(e) => handleChange(e)}>
                      <option>Dept</option>
                      <option>Computer Science</option>
                      <option>Information Science</option>
                      <option>Electronics and Communication</option>
                      <option>Electrical and Electronics</option>
                      <option>Mechanical</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" 
                      placeholder="Password"
                      name="password"
                      required
                      onChange={(e) => handleChange(e)} 

                        />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >Sign Up</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


// export default Register
