import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import classes from './LogIn.module.css'
import { Link } from 'react-router-dom'
import { checkValidity } from '../../validation/validate'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert2'
import Spinner from '../../components/UI/Spinner/Spinner'
class LogIn extends Component {
  constructor(props){
    super(props)
    this.state={
        user: {
          email: '',
          password: '',
        },
        userValidationRules: {
          email: {
            required: true,
            regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
          password: { required: true, minLength: 8, maxLength: 15 },
        },
        userValid: {
          email: { valid: false, touched: false, errmessage: '' },
          password: { valid: false, touched: false, errmessage: '' },
        },
        isValidForm: false,

    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (input) => (e) => {
    e.preventDefault();
    let updatedUser = this.state.user;
    let validUser = this.state.userValid;
    updatedUser[input] = e.target.value;
    validUser[input].touched = true;
    validUser[input].errmessage = checkValidity(
      updatedUser[input],
      this.state.userValidationRules[input]
    );
    validUser[input].valid = validUser[input].errmessage === '';
    let validForm = true;
    for (let field in validUser) {
      validForm = validUser[field].valid && validForm;
    }
    this.setState({
      user: updatedUser,
      userValid: validUser,
      isValidForm: validForm,
    });
  };
   

   
  handleClick = (event) => {
    console.log('handle click');
    if (this.state.isValidForm){
      this.props.toggleSpinner();
      fetch('http://localhost:3003/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: this.state.user.email,
              password: this.state.user.password
          })
      })
      .then(response => response.json())
      .then(data => {
         this.props.toggleSpinner();
        if (data.GroupId) {
          this.props.setGroupId(data.GroupId);
          this.props.setSignIn(true);
          this.props.history.push(`/group/${data.GroupId}`);
        } 
        else {
          swal.fire({
          icon: 'error',
          title: 'כתובת המייל או הסיסמה שגויים',
          confirmButtonText: 'בסדר',
          confirmButtonColor: '#EF9C83'
        })
      } 
      
      })
    }
    else{
      swal.fire({
      icon: 'info',
      title: 'יש לוודא שכל השדות מלאים',
      confirmButtonText: 'בסדר',
      confirmButtonColor: '#EF9C83'
      })
  }
}

    


  render () {
    let error = null;
    if (this.props.error) error = <p style={{ color: 'red' }}>{this.props.error}</p>;
    return (
      <div className={classes.LogIn}>
        <div>
          <Input
            type='email'
            name='email'
            inputtype='input'
            label='מייל'
            onChange={this.handleChange('email')}
            invalid={(!this.state.userValid.email.valid).toString()}
            touched={this.state.userValid.email.touched.toString()}
            errmessage={this.state.userValid.email.errmessage}
          />
          <Input
            type='password'
            name='password'
            inputtype='input'
            label='סיסמה'
            onChange={this.handleChange('password')}
            invalid={(!this.state.userValid.password.valid).toString()}
            touched={this.state.userValid.password.touched.toString()}
            errmessage={this.state.userValid.password.errmessage}
          />
          <button onClick={this.handleClick} className={classes.button} style={{ position:'absolute',right:"650px"}}>התחבר</button>
          <Link to='/Register'>
            <button className={classes.button} style={{ position:'absolute',right:"790px"}}>הירשם</button>
          </Link>
          <br/><br/><br/>
          <Link to='/ForgetPassword'>
            <p>?שכחת סיסמה</p>
          </Link>
        </div>
        <div >{this.props.displaySpinner ? <Spinner/> : null}</div>
      </div>
    );
  }
}

export default withRouter(LogIn);