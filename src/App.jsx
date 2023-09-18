import { Route, Routes } from 'react-router-dom'
import './App.css'
import PublicRoutes from './pages/Public/PublicRoutes'
import AuthGuard from './_helpers/AuthGuard'
import AdminRoute from './pages/Admin/AdminRoute'
import AuthRoute from './pages/Auth/AuthRoute'

function App() {

  return (
    <>
        <Routes>

          <Route path="/*" element={<PublicRoutes/> }/>

          <Route path='/admin/*'
            element={
              <AuthGuard>
                <AdminRoute />
              </AuthGuard>
              
            } 
          />

          <Route path='/auth/*' element={<AuthRoute/>} />
          
        </Routes>
    </>
  )
}

export default App
