import React from 'react'
import classes from './NavigationItem.module.css'
import { Link } from 'react-router-dom'

const navigationItem = (props) => (
  <li className={classes.NavigationItem} onClick={props.onClick}>
    <Link 
      to={props.link}
      activeclassname={classes.active}>
      {props.children}
    </Link>
  </li>
);
export default navigationItem;
