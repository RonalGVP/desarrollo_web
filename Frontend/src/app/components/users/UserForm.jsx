import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData }) => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Si se proporciona initialData (para editar), actualiza el estado
  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username,
        password: '', // No prellenamos la contraseña por seguridad
      });
    }
  }, [initialData]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función onSubmit pasada como prop
  };

  return (
    <div>
      <h1>{initialData ? 'Edit User' : 'Create User'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{initialData ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;