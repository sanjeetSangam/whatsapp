import { useSelector } from "react-redux";
import Main from "./components/mainChat/mainChat";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/trials/Login";

function App() {
  let user = useSelector((store) => store.user.user);
  // console.log(user);
  //
  return (
    <div className="App">
      <div className="top__body"></div>

      {user.name == undefined ? (
        <Login />
      ) : (
        <div className="main__div">
          <Sidebar />
          <Main />
        </div>
      )}
    </div>
  );
}

export default App;
