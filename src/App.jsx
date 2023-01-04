import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/App.Routes'
import UserMessage from './components/UserMessage/UserMessage'


function App() {

  return (
    <div>
      <NavBar />
      <AppRoutes />
      <Footer />
      <UserMessage />


    </div>
  );
}

export default App;
