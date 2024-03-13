import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';
import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';

export default function ModalContent({ setShowModal, gasInfo }) {
  const [newPrice, setNewPrice] = useState([...gasInfo]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleChangePrice = (e) => {
    //TODO: Validate user input

    setNewPrice(
      newPrice.map((gas) =>
        gas.type == e.target.id ? { ...gas, price: e.target.value } : gas
      )
    );
  };
  const handleSubmit = (e) => {
    //TODO: post the request to database
    e.preventDefault();
    if (newPrice.some((gas) => isNaN(gas.price))) return;
    setShowModal(false);
  };
  return (
    <>
      <div className='flex justify-end w-full text-darkMode-border min-w-36 mb-4 mt-2 th '>
        <button onClick={handleClose}>
          <MdClose className='text-xl' />
        </button>
      </div>
      <form className='grid grid-cols-2 justify-center items-center mt-4 gap-y-12 gap-x-8'>
        {gasInfo.map((gas, index) => {
          const { type, price } = gas;
          return (
            <CustomInput
              key={type + price}
              label={type}
              paddingLeft='24px'
              placeHolder={price}
              handleChange={handleChangePrice}
              errorMessage={isNaN(newPrice[index].price) ? 'Invalid Input' : ''}
            >
              <FaDollarSign className='absolute left-2 tp text-sm bottom-[13.5px]' />
            </CustomInput>
          );
        })}

        <div className='w-[341px]'>
          <CustomButton handleClick={handleSubmit} />
        </div>
      </form>
    </>
  );
}
