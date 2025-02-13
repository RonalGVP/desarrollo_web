const ProfileInfo = ({ user, setEditMode }) => {
    return (
      <div className="profile-info">
        <h3>Username: {user.username}</h3>
        <p>Email: {user.email}</p>
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      </div>
    );
  };
  
  export default ProfileInfo;
  