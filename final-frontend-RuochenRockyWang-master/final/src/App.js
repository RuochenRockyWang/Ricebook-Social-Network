import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Landing from './components/landing/Landing';
import Main from './components/main/Main';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

const App = () => {
    return(
        <Router>
        <div className="App">
        <Routes>
          <Route path="/" element={<Landing />}
          />
          <Route path="/Main"  element={<Main />} />
          <Route path="/Profile"  element={<Profile />} />
        </Routes>
      </div>
    </Router>
    );
}
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => {
//       if ((localStorage.getItem("userValid") || "false") === "true") {
//         return <Component {...props} />;
//       } else {
//         return (
//           <Navigate
//             to={{
//               pathname: "/"
//             }}
//           />
//         );
//       }
//     }}
//   />
// );
export default App;