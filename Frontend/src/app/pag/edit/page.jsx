'use client';
import Navbar from "../../components/Navbar";
import EditProfile from "../../components/users/EditUser";

const EditProfilePage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 space-y-6 bg-gradient-to-b from-sky-50 to-blue-50 rounded-lg shadow-lg">
        <EditProfile />
      </div>
    </div>
  );
};

export default EditProfilePage;
