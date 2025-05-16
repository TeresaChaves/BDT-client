import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("/api/users", { name });
      setSuccess(true);
      setName("");
      // Aquí necesitarías volver a hacer un fetch de la lista de usuarios manualmente
    } catch (err) {
      setError("Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit" disabled={loading}>
        Agregar
      </button>
      {error && <div>{error}</div>}
      {success && <div>Usuario creado con éxito</div>}
    </form>
  );
}
