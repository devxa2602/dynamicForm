import React, { Component } from 'react'
import Input from './Input'
import {updateObject,checkValidity} from './utility'
export class UserForm extends Component {
    state={
		userForm:{
			mobile:{ 
			elementType:'input',
			elementConfig:{
			type:'text',
			placeholder:'Mobile Number'
	         },value:'',
				validation:{
					required:true,
					minLength:10,
					maxLength:10
				},valid:false,
				touched:false
           },
			email:{ 
			elementType:'input',
			elementConfig:{
			type:'text',
			placeholder:'Your E-Mail'
	         },value:'',
				validation:{
                    required:true,
                    isEmail:true
				},valid:false,
				touched:false
           },
	},
		
		formIsValid:false
	}


userHandler=(event)=>{
	event.preventDefault();
	const formData={};
	for (let formElementIdentifier in this.state.userForm){
		formData[formElementIdentifier]=this.state.userForm[formElementIdentifier].value
		//email=test@test.com
	}
    console.log(formData)
    alert(`The email is :${formData.email}. The mobile no is :${formData.mobile}`)
}

formChangeHandler=(event,inputIdentifier)=>{
	
    let updatedUserElement=updateObject(this.state.userForm[inputIdentifier],
        {
		value:event.target.value,
        valid:checkValidity(event.target.value,this.state.userForm[inputIdentifier].validation),
		touched:true
			})
	let updateduserForm=updateObject(this.state.userForm,{[inputIdentifier]:updatedUserElement})
	

	let formIsValid=true;
	for(let inputIdentifier in updateduserForm){
		formIsValid=updateduserForm[inputIdentifier].valid && formIsValid
	}
	this.setState({userForm:updateduserForm,formIsValid:formIsValid})
}


render(){
	const formElementsArray=[]
	for(let key in this.state.userForm){
		formElementsArray.push({
			id:key,
			config:this.state.userForm[key]
		})
	}
	let form=(<form onSubmit={this.userHandler}>
					
					{formElementsArray.map(formElement=>(
			<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event)=>this.formChangeHandler(event,formElement.id)}
				
				/>))}
				<button  disabled={!this.state.formIsValid}>SUBMIT</button>
			</form>);
	return (
	<div >
		<h4>Enter your Contact Data</h4>
			{form}
		</div>)}
}

export default UserForm
