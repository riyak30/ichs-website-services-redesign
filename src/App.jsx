import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ServiceDetailPage from './pages/ServiceDetailPage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import LocationDetailPage from './pages/LocationDetailPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProvidersPage from './pages/ProvidersPage.jsx'
import ProviderDetailPage from './pages/ProviderDetailPage.jsx'
import CareersPage from './pages/CareersPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/location/:locationId" element={<LocationDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/providers/:providerId" element={<ProviderDetailPage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Route>
    </Routes>
  )
}
