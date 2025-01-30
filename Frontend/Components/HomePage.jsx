import Header from "./Header";
import Sidebar from "./sidebar";
import Mainbar from "./Mainbar";

function HomePage(){
    return(<div className="main-page">
        <Header/>
        <Sidebar/>
    </div>);
}

export default HomePage;