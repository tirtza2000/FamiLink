import React, { Component } from 'react';
import classes from './ForgetPassword.module.css';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
class ForgetPassword extends Component {
  state = {
      control:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'אימייל'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        }
    }
        checkValidity(value, rules) {
            let isValid = true;
            if (!rules) {
                return true;
            }
            
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
    
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
    
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
    
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
    
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
    
            return isValid;
        }

          inputChangedHandler = (event, controlName) => {
            const updated = {
                ...this.state.control,
                [controlName]: {
                    ...this.state.control[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.control[controlName].validation),
                    touched: true
                }
            };
            this.setState({control: updated});
        }
    
        render () {
            const formElementsArray = [];
            for ( let key in this.state.control ) {
                formElementsArray.push( {
                    id: key,
                    config: this.state.control[key]
                } );
            }
             
          
            const form = formElementsArray.map( formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                   
            ) );
    
            return (
                <div className={classes.ForgetPassword}>
                    <form onSubmit={this.submitHandler}>
                        <label> הזן את המייל ואנו נשלח לך קישור לאיפוס סיסמא</label>
                        {form}
                        <Button btnType="Success">שלח</Button>
                    </form>
                </div>
            );
        }
      }
   
export default ForgetPassword;
