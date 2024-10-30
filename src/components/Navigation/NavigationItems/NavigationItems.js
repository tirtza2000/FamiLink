import React, { Component } from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
import Swal from 'sweetalert2'
export default class NavigationItems extends Component{
  constructor(props){
    super(props)

  }

  handleUserOut=()=> {
    this.setState({user: {}, isSignIn: false});
    localStorage.clear();
    window.location.href = '/';
  
  }
  handleClick=()=>{
    Swal.fire({
      title: '?האם הנך רוצה לצאת',
      confirmButtonColor: '#ef9c83',
      confirmButtonText: 'התנתק',
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      reverseButtons: true
  }).then((clicked) => {
    if (clicked.isConfirmed){
        this.handleUserOut();
    }
  })
}

  render(){
    return(
       <span>
        {
          this.props.isSignIn?
            <ul className={classes.NavigationItems}>
              <NavigationItem link='/Photo'>גלריה</NavigationItem>
              <NavigationItem link='/Calendar'>לוח שנה</NavigationItem>
              <NavigationItem link='/Pedigree'>אילן יוחסין</NavigationItem>
              <NavigationItem link={`/group/${this.props.groupId}`}>בית</NavigationItem>
              <NavigationItem onClick={this.handleClick}>התנתק</NavigationItem> 
            </ul>
          
          :
          null
        }
</span>
     

    )
  }
}


