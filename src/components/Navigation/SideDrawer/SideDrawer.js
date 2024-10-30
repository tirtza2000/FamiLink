import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) attachedClasses = [classes.SideDrawer, classes.Open];
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <nav>
          <NavigationItems isSignIn={props.isSignIn} groupId={props.groupId}/>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
