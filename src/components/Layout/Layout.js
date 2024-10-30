import React, {Component} from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Logo from '../Logo/Logo'
class Layout extends Component{
    
  state = {
    showSideDrawer: false,
  };
    
  sideDrawerClosedhandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return( 
      <React.Fragment>
        <Logo/>
          <Toolbar 
            drawerToggleClicked={this.sideDrawerToggleHandler} 
            isSignIn={this.props.isSignIn}
            groupId={this.props.groupId}
          />
          <SideDrawer
            closed={this.sideDrawerClosedhandler}
            show={this.state.showSideDrawer}
            isSignIn={this.props.isSignIn}
            groupId={this.props.groupId}
          />
          <main className={classes.Content}>
              {this.props.children}
          </main>
      </React.Fragment>
    )
  } 
}

export default Layout;