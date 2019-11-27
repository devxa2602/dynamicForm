React Developer Assignment

1)Automatically Register input fields:
•	Created  a custom Input component which renders input/textarea/dropdown on the basis of props.elementType , so that we can handle different types of input types.
•	Converted the userForm to an array called formElementArray by using push method so that we can use map method and render input element for each value in the array
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

•	We render different input element based on data in state different values in state are passed on as props for validation and other purposes.

 2) On form submit we should get all values of input fields

•	The submission is handled by userHandler method. We first prevent default behavior of page refresh on submission of form.we create formData object and copy the state value to it and then console.log the values.
userHandler=(event)=>{
    event.preventDefault();
    const formData={};
    for (let formElementIdentifier in this.state.userForm){
        formData[formElementIdentifier]=this.state.userForm[formElementIdentifier].value
        //email=test@test.com
    }
    console.log(formData)
}

•	We also pass onChangeHandler to form which handles the changes to form inputs and updates the state accordingly.
•	We first create updatedUserElement using the state and validated data from form and then we create updatedUserForm after that we update the formIsValid property of state and then we finally set the state userForm to updatedUserForm and formIsValid to formIsValid

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

3) Validation
I have created utility.js for updating the objects by spread operators and checkValidity in which different rules are specified which can be passed on to inputs for different validation logics.
export const checkValidity = ( value, rules ) =>{
        let isValid = true;
        if ( !rules ) {
            return true;
        }
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }
        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }
        return isValid;
    }


4) Dynamic rendering of element:
The submit button is dynamically rendered only if both inputs(email and mobile) are valid.
 <button  btnType="Success"
                    disabled={!this.state.formIsValid}>SUBMIT</button>

