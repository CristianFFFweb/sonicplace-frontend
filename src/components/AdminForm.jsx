import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL} from '../assets/config/apiConfig.js';

const AdminForm = () => {
  const [formulario, setFormulario] = useState({
    tipo: 'ofertas',
    nombre: '',
    descripcion: '',
    precio: '',
    precio_anterior: '',
    stock: '',
    estado: '',
    categoria: 'Guitarras',
    imagen: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormulario({ ...formulario, imagen: e.target.files[0] });
  };

  const validarFormulario = () => {
    const { tipo, nombre, descripcion, precio, precio_anterior, stock, estado, categoria, imagen } = formulario;

    if (!nombre.trim()) return 'El nombre es obligatorio.';
    if (!descripcion.trim()) return 'La descripción es obligatoria.';
    if (!precio || Number(precio) < 0) return 'El precio debe ser mayor o igual a 0.';
    if (tipo === 'ofertas' && (precio_anterior === '' || Number(precio_anterior) < 0)) {
      return 'El precio anterior debe ser mayor o igual a 0.';
    }
    if (!stock || Number(stock) < 0) return 'El stock debe ser mayor o igual a 0.';
    if (!estado) return 'Debes seleccionar un estado (nuevo o usado).';
    if (!imagen) return 'Debes seleccionar una imagen.';
    if (!categoria) return 'Debes seleccionar una categoría.';
    

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validarFormulario();
    if (error) {
      alert(error);
      return;
    }

    const formData = new FormData();
    formData.append('nombre', formulario.nombre);
    formData.append('descripcion', formulario.descripcion);
    formData.append('precio', formulario.precio);
    if (formulario.tipo === 'ofertas') {
      formData.append('precio_anterior', formulario.precio_anterior);
    }
    formData.append('stock', formulario.stock);
    formData.append('estado', formulario.estado);
    formData.append('imagen', formulario.imagen);
    formData.append('categoria', formulario.categoria);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/api/${formulario.tipo}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Publicación creada correctamente');
      // Reiniciar formulario
      setFormulario({
        tipo: 'ofertas',
        nombre: '',
        descripcion: '',
        precio: '',
        precio_anterior: '',
        stock: '',
        estado: '',
        categoria: 'Guitarras',
        imagen: null
      });
    } catch (err) {
      console.error(err);
      alert('Error al crear publicación');
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="p-4 border rounded shadow w-100 mx-auto bg-white"
  style={{ maxWidth: '600px' }}
>
  <h2 className="mb-4">Publicar en Ofertas o Destacados</h2>

  <div className="mb-3">
    <label className="form-label">Tipo:</label>
    <select
      name="tipo"
      value={formulario.tipo}
      onChange={handleChange}
      className="form-select"
    >
      <option value="ofertas">Oferta</option>
      <option value="destacados">Destacado</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="form-label">Nombre:</label>
    <input
      name="nombre"
      value={formulario.nombre}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Descripción:</label>
    <textarea
      name="descripcion"
      value={formulario.descripcion}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Precio:</label>
    <input
      type="number"
      name="precio"
      value={formulario.precio}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {formulario.tipo === 'ofertas' && (
    <div className="mb-3">
      <label className="form-label">Precio anterior:</label>
      <input
        type="number"
        name="precio_anterior"
        min="1"
        step="1"
        value={formulario.precio_anterior}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  )}

  <div className="mb-3">
    <label className="form-label">Stock:</label>
    <input
      type="number"
      name="stock"
      min="1"
      step="1"
      value={formulario.stock}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Estado:</label>
    <select
      name="estado"
      value={formulario.estado}
      onChange={handleChange}
      className="form-select"
    >
      <option value="">Seleccionar</option>
      <option value="nuevo">Nuevo</option>
      <option value="usado">Usado</option>
    </select>
  </div>
  <div className="mb-3">
                    <label>Categoria</label>
                    <select
                        name="categoria"
                        className="form-select"
                        value={formulario.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una Categoria</option>
                        <option value="Guitarras">Guitarras</option>
                        <option value="Microfonos">Microfonos</option>
                        <option value="Amplificadores">Amplificadores</option>
                        <option value="Percusion">Percusion</option>
                        <option value="Controlador">Controlador</option>
                        <option value="Auriculares">Auriculares</option>
                        <option value="Instrumentos de Viento">Instrumentos de Viento</option>
                        <option value="Piano Teclados">Piano Teclados</option>
                        <option value="Bajos">Bajos</option>
                        <option value="Ritmos">Ritmos</option>
                        <option value="Parlantes">Parlantes</option>

                    </select>
                </div>

  <div className="mb-4">
    <label className="form-label">Imagen:</label>
    <input
      type="file"
      name="imagen"
      onChange={handleFileChange}
      className="form-control"
    />
  </div>

  <button type="submit" className="btn btn-primary w-100">
    Publicar
  </button>
</form>

  );
};

export default AdminForm;
