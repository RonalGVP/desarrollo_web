import { useState } from "react";
import { updateUser } from "../../services/UserServices"; // Servicio de actualización del perfil

const ProfileEditForm = ({ user, setEditMode }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUser(user.id, formData);
    setEditMode(false); // Regresar al modo vista después de la actualización
    // Aquí podrías actualizar el contexto si es necesario, con el nuevo user
  };

  return (
    <form onSubmit={handleSubmit} className="profile-edit-form">
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setEditMode(false)}>
        Cancel
      </button>
    </form>
  );
};

export default ProfileEditForm;
