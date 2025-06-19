import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Layout() {  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Outlet />  
      </main>
      <Footer />
    </>
  );
}

export default Layout;