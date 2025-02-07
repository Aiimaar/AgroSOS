import React from 'react';
import HeaderImageOnly from "../../components/header-image-only/header-image-only";
import RegisterFormComp from "../../components/register-form-comp/register-form-comp";

function Register(){
    return (
        <div className="create-account-page">
            <HeaderImageOnly />
            <RegisterFormComp />
        </div>
    )
}

export default Register;