import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn'
import Photo from './pages/Photo/Photo'
import Register from './pages/Register/register'
import Layout from './components/Layout/Layout'
import FamilyTree from './pages/FamilyTree/FamilyTree'
import Calendar from './pages/Calendar/Calendar'
import Home from './pages/Home/home'
import HomeGroup from './pages/GroupHome/groupHome'
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';

class App extends Component {
  constructor() {
    super();
    this.state = {
      groupId: null,
      isSignIn: false,
      displaySpinner: false,
      user:{}
    }
    this.toggleSpinner = this.toggleSpinner.bind(this);
    this.setSignIn = this.setSignIn.bind(this);
    this.setGroupId = this.setGroupId.bind(this);
  }

  

  setSignIn() {
    this.setState({isSignIn: true});
  } 

  setGroupId(id) {
    this.setState({groupId: id})
  }
  toggleSpinner() {
    this.setState({displaySpinner: !this.state.displaySpinner})
  }

  
  render() {
    return (
      <div> 
        <NavigationItems handleUserOut={this.handleUserOut}/>
        <BrowserRouter>
          <Layout isSignIn={this.state.isSignIn} groupId={this.state.groupId}>
              <Switch>
                <Route path='/LogIn' exact>
                  <LogIn 
                    setSignIn={this.setSignIn}
                    setGroupId={this.setGroupId}
                    displaySpinner={this.state.displaySpinner}
                    toggleSpinner={this.toggleSpinner}
                  />
                </Route>
              
                <Route path='/Register' exact>
                  <Register 
                    setSignIn={this.setSignIn}
                    setGroupId={this.setGroupId}
                    displaySpinner={this.state.displaySpinner}
                    toggleSpinner={this.toggleSpinner}
                  />
                </Route>
                <Route path='/Pedigree' exact>
                  <FamilyTree 
                    groupId={this.state.groupId} 
                    displaySpinner={this.state.displaySpinner}
                    toggleSpinner={this.toggleSpinner}
                  />
                </Route>
                <Route path='/Calendar' exact >
                  <Calendar
                   displaySpinner={this.state.displaySpinner}
                   groupId={this.state.groupId} 
                   displaySpinner={this.state.displaySpinner}
                   toggleSpinner={this.toggleSpinner} />
                </Route>
                <Route path='/Photo' exact >
                  <Photo 
                    displaySpinner={this.state.displaySpinner}
                    groupId={this.state.groupId}
                    displaySpinner={this.state.displaySpinner}
                    toggleSpinner={this.toggleSpinner} />
                </Route>
                <Route path='/group/:id'>
                  <HomeGroup 
                  groupId={this.state.groupId}
                  handleUserOut={this.handleUserOut}
                  />
                </Route>
                <Route path='/' exact component={Home}/>
              </Switch>
            </Layout>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;