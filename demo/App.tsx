import { Routes, Route } from 'react-router-dom'
import { Layout } from './docs/Layout'
import { Home } from './pages/Home'
import { FormsPage } from './pages/FormsPage'
import { ButtonsPage } from './pages/ButtonsPage'
import { DataPage } from './pages/DataPage'
import { PanelsPage } from './pages/PanelsPage'
import { OverlayPage } from './pages/OverlayPage'
import { NavigationPage } from './pages/NavigationPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { MediaPage } from './pages/MediaPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="buttons" element={<ButtonsPage />} />
        <Route path="data" element={<DataPage />} />
        <Route path="panels" element={<PanelsPage />} />
        <Route path="overlay" element={<OverlayPage />} />
        <Route path="navigation" element={<NavigationPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="media" element={<MediaPage />} />
      </Route>
    </Routes>
  )
}
