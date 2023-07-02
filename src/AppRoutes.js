import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const Dashboard = lazy(() => import("./app/dashboard/Dashboard"));

const Buttons = lazy(() => import("./app/basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./app/basic-ui/Dropdowns"));
const Typography = lazy(() => import("./app/basic-ui/Typography"));

const BasicElements = lazy(() => import("./app/form-elements/BasicElements"));

const CompanyRegistrationForm = lazy(() =>
    import("./app/form-elements/CompanyRegistrationForm")
);

const BasicTable = lazy(() => import("./app/tables/BasicTable"));
const JobApplicationsTable = lazy(() =>
    import("./app/tables/JobApplicationsTable")
);

const StudentTable = lazy(() => import("./app/tables/StudentTable"));

const Mdi = lazy(() => import("./app/icons/Mdi"));

const ChartJs = lazy(() => import("./app/charts/ChartJs"));

const Error404 = lazy(() => import("./app/error-pages/Error404"));
const Error500 = lazy(() => import("./app/error-pages/Error500"));

const Login = lazy(() => import("./components/user-pages/Login"));
const Register = lazy(() => import("./components/user-pages/Register"));

const JobPost = lazy(() => import("./app/form-elements/JobPosting"));

const StudentRegister = lazy(() =>
    import("./app/form-elements/StudentRegistrationForm")
);

const StudentNotRegistered = lazy(() =>
    import("./app/error-pages/StudentNotRegistered")
);

// const Student = lazy(() => import ("./components/StudentMain"));

// const Admin = lazy(() => import("./components/AdminMain"));
// const Company = lazy(() => import("./components/CompanyMain"));

export function AppRoutes() {
    const userType = useSelector((state) => state.user.userType);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const studentLoggedIn = isLoggedIn && userType === "student";
    const adminLoggedIn = isLoggedIn && userType === "admin";
    const companyLoggedIn = isLoggedIn && userType === "company";
    return (
        <Suspense fallback={<Spinner animation="border" variant="light" />}>
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

                <Route
                    path="/login"
                    component={isLoggedIn ? Error404 : Login}
                />
                <Route
                    path="/register"
                    component={isLoggedIn ? Error404 : Register}
                />

                <Route path="/error-pages/error-404" component={Error404} />
                <Route path="/error-pages/error-500" component={Error500} />
                {/* student */}
                <Route
                    path="/student"
                    exact
                    component={studentLoggedIn ? Error404 : Error404}
                />
                <Route
                    path="/student/jobs/job-openings"
                    component={
                        studentLoggedIn ? JobApplicationsTable : Error404
                    }
                />
                <Route
                    path="/student/jobs/pending-applications"
                    component={studentLoggedIn ? BasicTable : Error404}
                />
                <Route
                    path="/student/offers"
                    component={studentLoggedIn ? BasicTable : Error404}
                />
                <Route
                    path="/student/feedback"
                    component={studentLoggedIn ? BasicElements : Error404}
                />
                <Route
                    path="/student/profile"
                    component={studentLoggedIn ? Dashboard : Error404}
                />
                <Route
                    path="/student-register"
                    component={studentLoggedIn ? StudentRegister : Error404}
                />
                <Route
                    path="/student-not-verified"
                    component={
                        studentLoggedIn ? StudentNotRegistered : Error404
                    }
                />
                <Route
                    exact
                    path="/student/stats"
                    component={() => {
                        return studentLoggedIn ? (
                            <>
                                <BasicTable />
                                <ChartJs />
                            </>
                        ) : (
                            Error404
                        );
                    }}
                />
                {/* student */}

                {/* company */}
                <Route
                    exact
                    path="/company/home"
                    component={companyLoggedIn ? Dashboard : Error404}
                />
                <Route
                    exact
                    path="/company/applications"
                    component={companyLoggedIn ? BasicTable : Error404}
                />
                <Route
                    exact
                    path="/company/feedback"
                    component={companyLoggedIn ? BasicElements : Error404}
                />
                {/* company */}

                {/* admin */}
                <Route
                    exact
                    path="/admin-home"
                    component={adminLoggedIn ? Dashboard : Error404}
                />
                <Route
                    exact
                    path="/admin-roles/student-verification"
                    component={adminLoggedIn ? StudentTable : Error404}
                />
                <Route
                    exact
                    path="/admin-roles/register-company"
                    component={
                        adminLoggedIn ? CompanyRegistrationForm : Error404
                    }
                />
                <Route
                    exact
                    path="/admin-roles/job-post"
                    component={adminLoggedIn ? JobPost : Error404}
                />
                <Route
                    exact
                    path="/stats"
                    component={adminLoggedIn ? ChartJs : Error404}
                />
                <Route
                    path="/tables/student-table"
                    component={adminLoggedIn ? BasicTable : Error404}
                />
                <Route
                    path="/tables/company-table"
                    component={adminLoggedIn ? BasicTable : Error404}
                />
                {/* admin */}

                <Redirect to="/" />
            </Switch>
        </Suspense>
    );
}

export default AppRoutes;
