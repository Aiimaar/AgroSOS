import HeaderImageOnly from "../../components/header-image-only/header-image-only";
import RegisterForm from "../../components/register-form/register-form";

function Register(){
    return (
        <div className="create-account-page">
            <HeaderImageOnly />
            <RegisterForm />
        </div>
    )
}

export default Register;