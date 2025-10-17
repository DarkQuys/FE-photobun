
import { routes } from './routes/pages';
import { BrowserRouter as Router ,Routes ,Route  } from 'react-router-dom'
import { Fragment } from 'react';
function App() {
  return (
       <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            // const isChechAuth = !route.isPrivate || user?.isAdmin
            const isChechAuth = !route.isPrivate
            // const Layout = route.isShowHeader ? HeaderAnd : Fragment
            const Layout = route.isShowHeader ? Fragment : Fragment
            return (
              <Route key={route.path} path={isChechAuth && route.path} 
                element={<Layout>
              <Page />
            </Layout>}  
              />
            )  
          })}
        </Routes>
      </Router>
   </div>
  );
}

export default App;
