import Home from './Components/Pages/Home'
import Vacancy from './Components/Pages/Vacancies'
import Enroll from './Components/Pages/Enroll'
import Interview from './Components/Pages/Interview'
import About from './Components/Pages/AboutUs'
import Contact from './Components/Pages/ContactUs'
import Job from './Components/Pages/Job'
import Sector from './Components/Pages/Sectors'
import Offshire from './Components/Pages/Offshire'
import Post from './Components/Pages/Post'
import Apply from './Components/Pages/Apply'
import Tutor from './Components/Pages/Tutors'
import Discipline from './Components/Pages/Disciplines'
import Consultant from './Components/Pages/Consultants'
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/vacancies' element={<Vacancy/>}/>
            <Route path='/enrol-job' element={<Enroll/>}/>
            <Route path='/interview-techniques' element={<Interview/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/apply/:jobId' element={<Apply/>}/>
            <Route path='/consultants' element={<Consultant/>}/>
            <Route path='/sectors' element={<Sector/>}/>
            <Route path='/disciplines' element={<Discipline/>}/>
            <Route path='/tutors' element={<Tutor/>}/>
            <Route path='/offshire-it-partners' element={<Offshire/>}/>
            <Route path='/job/:jobId' element={<Job/>}/>
          </Routes>
        </Router>       
      </header>
    </div>
    </>
  );
}

export default App;
