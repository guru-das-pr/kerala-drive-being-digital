// LoadingSpinner.js
import React from 'react';
import logo from  '../../img/Kd-logo.png';
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white z-50">
      <div className="w-20 h-20  animate-pulse rounded-full ">
        <img src={logo} alt="logo kd" className='h-14 w-auto ' />
      </div>
      <h1 className='text-[red] text-sm'>KERALA DRIVES</h1>
    </div>
  );
};
export default LoadingSpinner;