import Header from "./Header";
import Sidebar from "./Sidebar";
import Mainbar from "./Mainbar";
import Welcomebar from "./Welcomebar";
import Signin from "./Signin";
import SideDetailbar from '../Components/SideDetailbar';
import '../Stylesheets/HomePage.css';
import { useState } from "react";

function HomePage(){
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [userState, setUserState] = useState(false);

    const toggleSidebar = () => {
      setActiveSidebar(!activeSidebar);
    };

    const profile = () => {
        setUserState(!userState);
    };

    return (
        userState === true ? <Signin/> : 
        <div className="main-page">
            <div className="header-div">
                <Header toggleSidebar={toggleSidebar} profile={profile}/>
            </div>
            <div className="center-div">
                <div>
                    {activeSidebar === false ? <Sidebar /> : <SideDetailbar />}
                </div>
                <div style={{position: "relative"}}>
                    {userState === false ? <Welcomebar/> : <Mainbar/> }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
