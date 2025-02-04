import React from "react";
import HeaderImageOnly from "../../components/header-image-only/header-image-only";
import LoginFormComp from "../../components/login-form-comp/login-fom-comp";

function Login(){
    return (
        <div className="login-page">
            <HeaderImageOnly />
            <LoginFormComp />
        </div>
    )
}

export default Login;