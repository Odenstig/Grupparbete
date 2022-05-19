import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAuction from '../views/CreateAuction';
import Home from '../views/Home';
import Register from '../views/Register';
import LoginButton from '../LoginButton';

const Main = () => {

    return(<>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/create" element={<CreateAuction/>} />
        <Route path="/register" element ={<Register/>}/>
      </Routes>
      {/* <LoginButton/> */}
    </>);

};

export default Main;