import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VehiclePage from '../src/pages/VehiclePage';
import SimulationPage from './pages/SimulationPage';
import LoginPage from './pages/LoginPage'
import HomeManagerPage from './pages/HomeManagerPage'
import HomeUserPage from './pages/HomeUserPage'
import VehicleView from './components/VehicleView';
import PageWrapperUser from './components/PageWrappers/PageWrapperUser';
import PageWrapperManager from './components/PageWrappers/PageWrapperManager';
import SimulationView from './components/SimulationView';


const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Box textAlign='center'>
              <LoginPage/>
            </Box>
          </Route> 
          <Route path="/vehicle">
          <PageWrapperManager><VehiclePage /></PageWrapperManager>
          </Route>
          <Route path="/vehicleView">
          <PageWrapperUser><VehicleView /></PageWrapperUser>
          </Route>
          <Route path="/homeManager">
            <PageWrapperManager><HomeManagerPage/></PageWrapperManager>
          </Route>
          <Route path="/homeUser">
          <PageWrapperUser><HomeUserPage/></PageWrapperUser>
          </Route>
          <Route path="/simulation">
           <PageWrapperUser><SimulationPage /></PageWrapperUser>
          </Route>
          <Route path="/simulationView">
           <PageWrapperManager><SimulationView /></PageWrapperManager>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
