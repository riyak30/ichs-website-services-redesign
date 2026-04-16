import { Outlet } from 'react-router-dom'
import UtilityBar from './UtilityBar.jsx'
import Navbar from './Navbar.jsx'
import AlertBanner from './AlertBanner.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <>
      <UtilityBar />
      <Navbar />
      <AlertBanner />
      <Outlet />
      <Footer />
    </>
  )
}
