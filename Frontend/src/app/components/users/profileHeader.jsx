const ProfileHeader = ({ user }) => {
    return (
      <div className="profile-header">
        <h1>{user.username}'s Profile</h1>
        <p>{user.email}</p>
      </div>
    );
  };
  
  export default ProfileHeader;
  