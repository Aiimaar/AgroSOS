import CreateUserComp from "../../components/create-user-component/create-user-component";
import HeaderImageOnly from "../../components/header-image-only/header-image-only";

function CreateUser(){
    return (
        <div className="create-user-page">
            <HeaderImageOnly />
            <CreateUserComp />
        </div>
    )
}

export default CreateUser;