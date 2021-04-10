import React, { lazy, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import Portlet from "../../components/portlet/Portlet";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../../components/Loading";

const PatientsPage = lazy(() => import("../patients/Patients"));
const PatientsNewPage = lazy(() => import("../patients/NewPatient"));
const SignUpPage = lazy(() => import("../SignUp"));
const SignInPage = lazy(() => import("../SignIn"));
const Routes = () => (
  <Portlet className="position-relative">
    <Suspense fallback={Loading}>
      <Switch>
        <PrivateRoute path="/" component={PatientsPage} exact />
        <PrivateRoute path="/create" component={PatientsNewPage} exact />
        <PrivateRoute path="/edit/:id" component={PatientsNewPage} exact />
        <AuthRoute path="/signUp" component={SignUpPage} exact />
        <AuthRoute path="/signIn" component={SignInPage} exact />

        <Redirect to="/" />
      </Switch>
    </Suspense>
  </Portlet>
);

export default Routes;
