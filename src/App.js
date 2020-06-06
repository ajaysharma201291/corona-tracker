import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import WorldComponent from './components/worldComponent';
import Header from './components/header';
import Footer from './components/footer';
import Contibutor from './components/contibutor';
import NavbarComponent from './components/navbarComponent';
import CountryComponent from './components/countryComponent';
import DistrictComponent from './components/districtComponent';
import Notification from './components/notification';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavbarComponent />
      <Contibutor />
      <Notification />
      <Switch>
        <Route exact path="/" component={WorldComponent}></Route>
        <Route path="/country/:name" component={CountryComponent}></Route>
        <Route path="/state/:name" component={DistrictComponent}></Route>
        <Route path="**" component={WorldComponent}></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
