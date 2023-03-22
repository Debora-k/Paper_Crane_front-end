import React, { useEffect } from 'react';
import { useState } from 'react';

// const PasswordErrorMessage = () => {
//   return <p className='FieldError'>Password should be at least 6 characters</p>;
// };

function EditClientAccount(props: any) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [companyName, setCompanyName] = useState(props.companyName);
  const [email, setEmail] = useState(props.email);
  //   const [password, setPassword] = useState({
  //     value: '',
  //     isTouched: false,
  //   });

  useEffect(() => {
    setFirstName(props.firstName);
    setCompanyName(props.companyName);
    // setPassword({ value: '', isTouched: false });
    setEmail(props.email);
  }, [props.email, props.firstName, props.companyName]);

  const getIsFormValid = () => {
    if (firstName.length > 0 && email.length > 0 /* && password.value.length >= 6 */) {
      return true;
    } else {
      return false;
    }
  };

  const clearForm = () => {
    setFirstName(props.firstName);
    setCompanyName(props.companyName);
    // setPassword({ value: '', isTouched: false });
    setEmail(props.email);
  };

  // handleSubmit should make a request to back-end later on to create client account
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account edited!');
    clearForm();
  };

  return (
    <div className='EditClientAccount'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Edit Client Account</h3>
          <div className='Field'>
            <label>
              Name <sup>*</sup>
            </label>
            <input
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>
              Company<sup>*</sup>
            </label>
            <input
              placeholder='Company name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div className='Field'>
            <label>
              Password <sup>*</sup>
            </label>
            <input
              placeholder='Password'
              type='password'
              value={password.value}
              onChange={(e) => setPassword({ ...password, value: e.target.value })}
            />
            {password.value.length < 6 && password.isTouched === true && <PasswordErrorMessage />}
          </div> */}
          <br></br>
          <button type='submit' disabled={!getIsFormValid()}>
            Edit account
          </button>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default EditClientAccount;
