import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Form from './componets/Form';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home  from './componets/home'
import OneGame from './componets/oneGame';
import EditForm from './componets/edit';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path = '/' exact component={Home}/>
            <Route path = '/new' exact component={Form}/>
            <Route path = '/game/:id' exact component = {OneGame}/>
            <Route path = '/edit/:id' exact component = {EditForm}/>
            <Redirect to="/"/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
