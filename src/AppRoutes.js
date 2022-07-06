import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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

const StudentTable = lazy(() => import("./app/tables/StudentTable"));

const Mdi = lazy(() => import("./app/icons/Mdi"));

const ChartJs = lazy(() => import("./app/charts/ChartJs"));

const Error404 = lazy(() => import("./app/error-pages/Error404"));
const Error500 = lazy(() => import("./app/error-pages/Error500"));

const Login = lazy(() => import("./app/user-pages/Login"));
const Register = lazy(() => import("./app/user-pages/Register"));

export function AppRoutes () {
        return (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />

                    <Route path="/basic-ui/buttons" component={Buttons} />
                    <Route path="/basic-ui/dropdowns" component={Dropdowns} />
                    <Route path="/basic-ui/typography" component={Typography} />

                    <Route
                        path="/form-Elements/basic-elements"
                        component={BasicElements}
                    />

                    <Route path="/icons/mdi" component={Mdi} />

                    <Route path="/charts/chart-js" component={ChartJs} />

                    <Route path="/login" component={Login} />
                    <Route
                        path="/register"
                        component={Register}
                    />

                    <Route path="/error-pages/error-404" component={Error404} />
                    <Route path="/error-pages/error-500" component={Error500} />

                    {/* student */}
                    <Route path="/jobs/job-openings" component={BasicTable} />
                    <Route path="/jobs/pending-applications" component={BasicTable} />
                    <Route path="/offers" component={BasicTable} />
                    <Route path="/student/feedback" component={BasicElements} />
                    <Route path="/profile" component={Dashboard} />


                    {/* student */}

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
                        path="/stats"
                        component={() => {
                            return (
                                <>
                                    <BasicTable />
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

                    <Redirect to="/dashboard" />
                </Switch>
            </Suspense>
        );
    }

export default AppRoutes;
