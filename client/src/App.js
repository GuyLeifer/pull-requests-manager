import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/general/header/Header';
import Footer from './components/general/footer/Footer';
import Navbar from './components/general/navbar/Navbar';

import PullRequests from './components/pullRequests/PullRequests';
import Labels from './components/labels/Labels';
import Users from './components/users/Users';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
        <Switch>
          <Route path="/" exact component={PullRequests} />
          <Route path="/Labels" exact component={Labels} />
          <Route path="/Users" exact component={Users} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
