import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// COMPONENTS
import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import BudgetTable from './components/budget/budget-table/BudgetTable';

const AppRoute = ({ component : Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout >
      <Component  {...props} />
    </Layout>
  )} />
)

class App extends Component {
  state = {
    isSideBarOpen: false,
  }

  toggleSideBar = () => {
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen,
    })
  }

  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <AppRoute exact path="/budget" layout={ Menu } component={ BudgetTable }  />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
