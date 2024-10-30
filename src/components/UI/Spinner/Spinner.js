import React from 'react'
import people from '../../../assets/images/circle.png'
import classes from './Spinner.module.css'
export default function Spinner () {
    return(
      <div className={classes.page}>
        <div className={classes.loader}>
          <article className={classes.people}></article>
        </div>
      </div>
    )
 }
