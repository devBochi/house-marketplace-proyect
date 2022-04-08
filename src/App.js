import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Offers from './pages/Offers'
import Category from './pages/Category';
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/>
          <Route path='/category/:categoryName' element={<Category />}/>
          <Route path='/category/:categoryName/:listingId' element={<Listing />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile />}/>
          </Route>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/edit-listing/:listingId' element={<EditListing />}/>
          <Route path='/contact/:landlordId' element={<Contact />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
        </Routes>
      <Navbar />
      </Router>
      <ToastContainer />  
    </>
    );
}

export default App;
