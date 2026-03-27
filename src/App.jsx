import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout  from './layouts/MainLayout.jsx'
import Login       from './pages/Login.jsx'
import Welcome     from './pages/Welcome.jsx'
import Home        from './pages/Home.jsx'
import Goals       from './pages/Goals.jsx'
import Dashboard   from './pages/Dashboard.jsx'
import Schedule    from './pages/Schedule.jsx'
import Feedback    from './pages/Feedback.jsx'
import NotFound    from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* No navbar */}
      <Route path="/login" element={<Login />} />

      {/* Pages with navbar */}
      <Route element={<MainLayout />}>
        <Route path="/"          element={<Navigate to="/login" replace />} />
        <Route path="/welcome"   element={<Welcome />} />
        <Route path="/home" element={<Navigate to="/welcome" replace />} />
        <Route path="/goals"     element={<Goals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule"  element={<Schedule />} />
        <Route path="/feedback"  element={<Feedback />} />
        <Route path="*"          element={<NotFound />} />
      </Route>
    </Routes>
  )
}