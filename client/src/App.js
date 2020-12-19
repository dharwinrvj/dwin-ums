import "./App.css";
import CreateUser from "./components/CreateUser";
import ListUser from "./components/ListUser";
function App() {
  return (
    <div className="App">
      <div class="container mt-4">
        <h1>DWin User Managment System</h1>
        <CreateUser />
        <ListUser />
      </div>
    </div>
  );
}

export default App;
