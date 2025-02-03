import Header from "./Header";
import Sidebar from "./Sidebar";
import Mainbar from "./Mainbar";
import Welcomebar from "./Welcomebar";
import Signin from "../Signin-components/Signin.jsx";
import SideDetailbar from './SideDetailbar';
import '../../Stylesheets/HomePage.css';
import { useState } from "react";

function HomePage(){
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [userState, setUserState] = useState(false);
    const [activeMainbar, setActiveMainbar] = useState(false);

    const handleSidebar = () => {
      setActiveSidebar(!activeSidebar);
    };

    const handleUserState = () => {
        setUserState(!userState);
    };

    const handleMainbar = () =>{
        setActiveMainbar(!activeMainbar)
    }

    return (
        userState === true ? <Signin handleUserState={handleUserState} handleMainbar={handleMainbar}/> : 
        <div className="main-page">
            <div className="header-div">
                <Header handleSidebar={handleSidebar} handleUserState={handleUserState}/>
            </div>
            <div className="center-div">
                <div>
                    {activeSidebar === false ? <Sidebar /> : <SideDetailbar />}
                </div>
                <div style={{position: "relative"}}>
                    {activeMainbar === false ? <Welcomebar/> : <Mainbar/> }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
