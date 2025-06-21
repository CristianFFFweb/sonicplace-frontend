
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import './App.css'
import Login from './components/Login.jsx'
import ProductoDetalle from './components/Detalles.jsx'
import Carrito from './components/Carrito.jsx'
import OfertasCarousel from './components/OfertasCarrusel.jsx'
import Catalogo from './components/Catalogo.jsx'
import TodosLosProductos from './components/TodosLosProductos.jsx'
import Perfil from './components/Perfil.jsx'
import AgregarProducto from './components/AgregarProducto.jsx'
import AdminForm from './components/AdminForm.jsx'
import RutaAdmin from './components/ProtegeAdmin.jsx'
import ResultadosBusqueda from './pages/ResultadosBusqueda.jsx'
import AdminPanel from './components/AdminPanel.jsx'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="producto/:categoria/:id" element={<ProductoDetalle />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="ofertas" element={<OfertasCarousel />} />
            <Route path="todos" element={<TodosLosProductos />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="agregar" element={<AgregarProducto />} />
            <Route path="admin" element={<RutaAdmin>
              <AdminForm />
            </RutaAdmin>

            } />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="busqueda" element={<ResultadosBusqueda />} />
          </Route>

        </Routes>
      </Router>


    </>
  )
}

export default App
