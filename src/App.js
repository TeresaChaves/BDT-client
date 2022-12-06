import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/App.Routes'


function App() {
  return (
    <div className="App pb-5"> <NavBar />
      <AppRoutes />
      <Footer />

    </div>
  );
}

export default App;
