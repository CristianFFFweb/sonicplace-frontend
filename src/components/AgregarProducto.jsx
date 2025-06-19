import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function AgregarProducto() {
    const { usuario } = useAuth();

    // Estado inicial con valores por defecto
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: 1,
        estado: 'Nuevo',
        categoria: 'Guitarras'
    });

    const [imagen, setImagen] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categorias = [
        'Guitarras', 'Microfonos', 'Amplificadores', 
        'Percusion', 'Controlador', 'Auriculares',
        'Instrumentos de Viento', 'Piano Teclados', 
        'Bajos', 'Ritmos', 'Parlantes'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImagen = (e) => {
        const archivo = e.target.files[0];
        setImagen(archivo);

        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => {
                setVistaPrevia(lector.result);
            };
            lector.readAsDataURL(archivo);
        } else {
            setVistaPrevia(null);
        }
    };

    const validarFormulario = () => {
        const { nombre, descripcion, precio, stock, categoria } = formData;
        
        if (!nombre.trim()) return 'El nombre es obligatorio';
        if (!descripcion.trim()) return 'La descripción es obligatoria';
        if (!precio || isNaN(precio) || Number(precio) <= 0) return 'Precio inválido';
        if (!stock || isNaN(stock) || Number(stock) <= 0) return 'Stock inválido';
        if (!categoria || !categorias.includes(categoria)) return 'Categoría inválida';
        if (!imagen) return 'La imagen es requerida';
        
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const error = validarFormulario();
        if (error) {
            setMensaje(error);
            setIsSubmitting(false);
            return;
        }

        try {
            const form = new FormData();
            // Agregar todos los campos al FormData
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });
            form.append('vendedor', usuario?.email || '');
            form.append('imagen', imagen);

            const token = localStorage.getItem('token');
            const response = await axios.post( `${API_BASE_URL}/api/products`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setMensaje('Producto agregado correctamente');
            resetForm();
        } catch (error) {
            console.error('Error al crear producto:', {
                message: error.message,
                response: error.response?.data
            });
            setMensaje(error.response?.data?.message || 'Error al guardar el producto');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: 1,
            estado: 'Nuevo',
            categoria: 'Guitarras'
        });
        setImagen(null);
        setVistaPrevia(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Agregar Producto</h2>
            
            {mensaje && (
                <div className={`alert ${mensaje.includes('correctamente') ? 'alert-success' : 'alert-danger'}`}>
                    {mensaje}
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-75 mx-auto">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Nombre*</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descripción*</label>
                            <textarea
                                name="descripcion"
                                className="form-control"
                                rows="3"
                                value={formData.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Precio*</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    name="precio"
                                    className="form-control"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    min="1"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stock*</label>
                            <input
                                type="number"
                                name="stock"
                                className="form-control"
                                value={formData.stock}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Imagen*</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={handleImagen}
                                required
                            />
                            {vistaPrevia && (
                                <div className="mt-3">
                                    <img 
                                        src={vistaPrevia} 
                                        alt="Vista previa" 
                                        className="img-thumbnail" 
                                        style={{ maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Estado*</label>
                            <select
                                name="estado"
                                className="form-select"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <option value="Nuevo">Nuevo</option>
                                <option value="Usado">Usado</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Categoría*</label>
                            <select
                                name="categoria"
                                className="form-select"
                                value={formData.categoria}
                                onChange={handleChange}
                                required
                            >
                                {categorias.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AgregarProducto;