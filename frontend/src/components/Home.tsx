import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SpotifyHome from './sub/music/SpotifyHome';
import TaskTracker from './sub/tasks-app/TaskTracker';
import TaskBar from './sub/common/TaskBar';
import HomeWidgets from './sub/common/HomeWidgets';


const Home = () => {


  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
        <div className='bg-[#4cb1b3] w-full'>
            <TaskBar/>
        </div>
        <div className="flex bg-[#004A4E] w-full h-full">
        <Router>
            <nav className="bg-[#4cb1b3]">
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/music">Music</Link></li>
                <li><Link to="/tasktracker">TaskTracker</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomeWidgets />} />
                <Route path="/music" element={<SpotifyHome />} />
                <Route path="/tasktracker" element={<TaskTracker />} />
            </Routes>
        </Router>
    </div>
    </div>
  );
};

export default Home;