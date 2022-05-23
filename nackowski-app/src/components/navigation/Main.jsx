import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from '../LoginButton';
import CreateAuction from '../views/CreateAuction';
import Home from '../views/Home';
import Register from '../views/Register';

const Main = () => {

    return(<>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/create" element={<CreateAuction/>} />
        <Route path="/register" element ={<Register/>}/>
        <Route path="/login" element ={<LoginButton/>}/>
      </Routes>
      {/* <LoginButton/> */}
    </>);

};

export default Main;