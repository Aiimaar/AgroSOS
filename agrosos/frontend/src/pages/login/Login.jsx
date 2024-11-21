import HeaderImageOnly from "../../components/header-image-only/header-image-only";
import LoginForm from "../../components/login-form/login-fom";

function Login(){
    return (
        <div className="login-page">
            <HeaderImageOnly />
            <LoginForm />
        </div>
    )
}

export default Login;