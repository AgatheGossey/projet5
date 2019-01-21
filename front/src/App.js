import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
import TopBar from './components/menu/top-bar/TopBar';
import LeftBar from './components/menu/left-bar/LeftBar';
import BudgetTable from './components/budget/budget-table/BudgetTable';

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
      <React.Fragment>
        <CssBaseline />
        <TopBar toggleSideBar={this.toggleSideBar} />
        <LeftBar open={this.state.isSideBarOpen} toggleSideBar={this.toggleSideBar}  />
        <BudgetTable />
      </React.Fragment>
    );
  }
}

export default App;
