import React, { useState } from 'react';
import { stkPush } from './Api';

function RenderComponent() {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await stkPush(amount);
      console.log(response);
      // Handle success response from M-Pesa API
    } catch (error) {
      console.error(error);
      // Handle error response from M-Pesa API
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div className='render-content'>
      <label>Amount</label>
      <input type="number" id="amount" name="amount" placeholder='Enter Amount' value={amount} onChange={handleAmountChange}/> <br />
      <label>Phone Number</label>
      <input type='number' id="phone-number" name="phone-number" placeholder='Enter Phone Number' value={phoneNumber} onChange={handlePhoneChange}/> <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default RenderComponent;