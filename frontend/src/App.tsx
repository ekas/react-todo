import { ToastContainer } from "react-toastify";
import Board from "./components/Board";

import "react-toastify/dist/ReactToastify.css";
import "./App.less";

function App() {
  return (
    <div className="App">
      <Board />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
