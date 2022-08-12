import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'

import Spinner from "./components/shared/Spinner.js";

const Dashboard = lazy(() => import("./app/dashboard/Dashboard"));

const Buttons = lazy(() => import("./app/basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./app/basic-ui/Dropdowns"));
const Typography = lazy(() => import("./app/basic-ui/Typography"));

const BasicElements = lazy(() => import("./app/form-elements/BasicElements"));

const CompanyRegistrationForm = lazy(() =>
    import("./app/form-elements/CompanyRegistrationForm")
);

const BasicTable = lazy(() => import("./app/tables/BasicTable"));
const JobApplicationsTable = lazy(() => import("./app/tables/JobApplicationsTable"));

const StudentTable = lazy(() => import("./app/tables/StudentTable"));

const Mdi = lazy(() => import("./app/icons/Mdi"));

const ChartJs = lazy(() => import("./app/charts/ChartJs"));

const Error404 = lazy(() => import("./app/error-pages/Error404"));
const Error500 = lazy(() => import("./app/error-pages/Error500"));

const Login = lazy(() => import("./components/user-pages/Login"));
const Register = lazy(() => import("./components/user-pages/Register"));

const JobPost = lazy(()=> import("./app/form-elements/JobPosting"));

const StudentRegister = lazy(() => import("./app/form-elements/StudentRegistrationForm"));

// const Student = lazy(() => import ("./components/StudentMain"));

// const Admin = lazy(() => import("./components/AdminMain"));
// const Company = lazy(() => import("./components/CompanyMain"));

export function AppRoutes () {
        const userType = useSelector((state) => state.user.usertype)
        return (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    
                    {/* <Route exact path="/company" component={Company} /> */}
                    
                    {/* <Route exact path="/student" component={BasicTable} /> */}

                    <Route path="/basic-ui/buttons" component={Buttons} />
                    <Route path="/basic-ui/dropdowns" component={Dropdowns} />
                    <Route path="/basic-ui/typography" component={Typography} />

                    <Route
                        path="/form-Elements/basic-elements"
                        component={BasicElements}
                    />

                    <Route path="/icons/mdi" component={Mdi} />

                    <Route path="/charts/chart-js" component={Dashboard} />

                    <Route path="/login" component={Login} />
                    <Route
                        path="/register"
                        component={Register}
                    />

                    <Route path="/error-pages/error-404" component={Error404} />
                    <Route path="/error-pages/error-500" component={Error500} />

                    {/* student */}
                    <Route path="/student/jobs/job-openings" component={JobApplicationsTable} /> 
                    <Route path="/student/jobs/pending-applications" component={BasicTable} /> 
                    <Route path="/student/offers" component={BasicTable} /> 
                    <Route path="/student/feedback" component={BasicElements} /> 
                    <Route path="/student/profile" component={Dashboard} /> 
                    <Route path="/student-register" component={StudentRegister} />
                    <Route
                        exact
                        path="/student/stats"
                        component={() => {
                            return (
                                <>
                                    <BasicTable />
                                    <ChartJs />
                                </>
                            );
                        }}
                    />
                    {/* student */}

                    {/* company */}
                    <Route exact path="/company/home" component={Dashboard} /> 
                    <Route exact path="/company/applications" component={BasicTable} /> 
                    <Route exact path="/company/feedback" component={BasicElements} /> 
                    {/* company */}

                    {/* admin */}
                    <Route exact path="/admin-home" component={Dashboard} /> 

                    <Route
                        exact
                        path="/admin-roles/student-verification"
                        component={StudentTable}
                    /> 

                    <Route
                        exact
                        path="/admin-roles/register-company"
                        component={CompanyRegistrationForm}
                    /> 

                    <Route
                        exact
                        path="/admin-roles/job-post"
                        component={JobPost}
                    /> 

                    <Route
                        exact
                        path="/stats"
                        component={() => {
                            return (
                                <>
                                    <ChartJs />
                                </>
                            );
                        }}
                    /> 

                    <Route
                        path="/tables/student-table"
                        component={BasicTable}
                    /> 

                    <Route
                        path="/tables/company-table"
                        component={BasicTable}
                    />
                    {/* admin */}

                    <Redirect to="/" />
                </Switch>
            </Suspense>
        );
    }

export default AppRoutes;
