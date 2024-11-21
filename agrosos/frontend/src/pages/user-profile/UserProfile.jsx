import Header from "../../components/header/header";
import UserProfileComp from "../../components/user-profile-comp/user-profile-comp";

function UserProfile(){
    return (
        <div className="user-profile">
            <Header />
            <UserProfileComp />
        </div>
    )
}

export default UserProfile;