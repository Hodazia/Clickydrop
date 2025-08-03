
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { ProfileDashboard } from './pages/Profile'
import { useState,useEffect } from 'react'
import { BACKEND_URL } from './utils/schema'
import { PrivateRoute } from './components/User/RoutePrivate'
import { Navigate } from 'react-router-dom'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/check-auth`);
        const data = await response.json();
        
        if (response.ok && data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Authentication check is complete
      }
    };
    checkUserAuth();
  }, []);

  if (isLoading) {
    // You can render a loading spinner or a blank page while checking auth
    return <div>Loading...</div>; 
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/*public routes  */}
      <Route path='/' element={<Landing />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin setIsAuthenticated={setIsAuthenticated} />}/>

      {/*Protected routes  */}
      <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <ProfileDashboard />
                        </PrivateRoute>
                    }
                />
                {/* <Route
                    path="/dashboard/profile"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/links"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Links />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/themes"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Themes />
                        </PrivateRoute>
                    }
                /> */}
                
                {/* Catch-all route to redirect the user to the correct landing page */}
                <Route path="/*" 
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
