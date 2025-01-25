import Mainbar from "./Mainbar";
import Sidebar from "./sidebar";

function HomePage(){
    return(<div className="main-page">
        <Sidebar/>
        <Mainbar/>
    </div>);
}

export default HomePage;