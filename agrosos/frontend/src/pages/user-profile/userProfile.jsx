import React from 'react';
import UserProfileContentComponent from '../../components/user-profile-content/user-profile-content-component';
import Header from '../../components/header/header';

function UserProfile() {
  return (
    <div>
        <Header />
        <UserProfileContentComponent />
    </div>
  );
}

export default UserProfile;
