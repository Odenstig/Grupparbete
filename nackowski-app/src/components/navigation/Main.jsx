import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAuction from '../views/CreateAuction';
import Home from '../views/Home';
// import Navigation from './Navigation';

//import {Home,Contact,About} from '../views';


const Main = () => {

    //Exact path är samma som == dvs måste vara exakt lika med
    //Bara path är som en contains dvs att routen inneåller något
    return(<>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/create" element={<CreateAuction/>} />
      </Routes>
    </>);

};

export default Main;