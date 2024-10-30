import React from 'react'
import Logo from '../../assets/images/LOGO.png'
import classes from './Logo.module.css'
const logo=(props)=>(
 <div className={classes.Logo}>
     <img src={Logo} alt="MyPic"/>
 </div>
);
export default logo;