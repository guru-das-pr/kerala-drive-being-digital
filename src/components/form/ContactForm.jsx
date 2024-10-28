import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPinterest, FaWhatsapp, FaYoutube, FaGlobeAmericas, FaAsterisk } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { SiGooglemybusiness } from 'react-icons/si';
import SocialMediaIcons from '../icons/SocialMediaIcons';
import TooltipButton from '../tooltip/ToolTipButton';
import { format  ,startOfToday } from 'date-fns';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid'),

  destination: yup
    .string()
    .required('Destination is required')
    .min(3, 'Destination must be at least 3 characters long')
    .max(100, 'Destination must not exceed 100 characters'),

  numberOfPersons: yup
    .number()
    .required('Number of persons is required')
    .typeError('Number of persons must be a number')
    .positive('Number of persons must be greater than zero')
    .integer('Number of persons must be an integer'),


  fromDate: yup
    .date()
    .nullable() // Allow null values
    .transform((value) => (value === '' ? null : value)) // Transform empty string to null
    .required('From date is required')
    .typeError('From date must be a valid date'),

  toDate: yup
    .date()
    .nullable() // Allow null values
    .transform((value) => (value === '' ? null : value)) // Transform empty string to null
    .required('To date is required')
    .min(yup.ref('fromDate'), "To date can't be before From date")
    .typeError('To date must be a valid date'),

  message: yup.string().optional(),
});
const ContactForm = () => {
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const [phone, setPhone] = useState('');
  const message = watch('message', '');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const dateInputStyle = (dateValue) => `mt-1 block w-full border-stone-400 border outline-none p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 ${dateValue ? 'text-stone-950' : 'text-stone-400'}`;

  const onSubmit = (data) => {
    // Format the dates
    const formattedFromDate = format(new Date(data.fromDate), 'dd MMM yyyy');
    const formattedToDate = format(new Date(data.toDate), 'dd MMM yyyy')

    // Create the WhatsApp message
    const whatsappMessage =
      `*Booking Request*\n\n` +
      `*Name:* ${data.name}\n` +
      `*Phone:* +${phone}\n` +
      `*Destination:* ${data.destination}\n` +
      `*Number of Persons:* ${data.numberOfPersons}\n` +
      `*Travel Dates:* ${formattedFromDate} to ${formattedToDate}\n` +
      `*Message:* ${data.message || 'No additional message'}`

    // Create the WhatsApp URL
    const url = `https://api.whatsapp.com/send?phone=919496462226&text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp in a new window
    window.open(url, '_blank');
  };
  const today = format(startOfToday(), 'yyyy-MM-dd');
  return (
    <div className="custom-scrollbar p-4 w-full h-full backdrop-blur-xl text-xs overflow-y-auto text-black bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-2 space-y-3 max-w-lg mx-auto flex flex-col justify-between h-full w-full">
        <h1 className='text-3xl font-bold space-y-2'>Book Your Trip !</h1>
        <p className='md:text-sm text-[10px] text-black flex items-center'>Please fill out all required fields (<FaAsterisk className='text-red-500 text-[7px]' />) to ensure a smooth process.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 text-xs flex items-center font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Name
              <TooltipButton content={<p>Enter your full name as it appears on official documents.</p>} />
            </label>
            <input
              {...register('name')}
              placeholder='Enter your full name'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className='text-red-500 ps-4 text-[10px]'>{errors.name.message}</p>}
          </div>
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Phone Number
              <TooltipButton content={<p>Provide your contact number including country code.</p>} />
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone);
                    field.onChange(phone);
                  }}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                  }}
                  containerStyle={{ width: '100%', marginTop: '4px' }}
                  inputStyle={{ width: '100%', borderRadius: '9999px', fontFamily: '"Outfit", sans-serif', fontSize: "12px" }}
                />
              )}
            />
            {errors.phoneNumber && <p className='text-red-500 ps-4 text-[10px]'>{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Destination
              <TooltipButton content={<p>Enter your desired travel destination.</p>} />
            </label>
            <input
              {...register('destination')}
              placeholder='Enter destination'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.destination && <p className='text-red-500 ps-4 text-[10px]'>{errors.destination.message}</p>}
          </div>
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Number of Persons
              <TooltipButton content={<p>Enter the number of people traveling.</p>} />
            </label>
            <input
              type="number"
              min={1}
              {...register('numberOfPersons')}
              placeholder='Enter number of persons'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.numberOfPersons && <p className='text-red-500 ps-4 text-[10px]'>{errors.numberOfPersons.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />From Date
              <TooltipButton content={<p>Select the start date of your trip.</p>} />
            </label>
            <input
              type="date"
              min={today}
              {...register('fromDate')}
              className={dateInputStyle(fromDate)}
            />
            {errors.fromDate && <p className='text-red-500 ps-4 text-[10px]'>{errors.fromDate.message}</p>}
          </div>
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />To Date
              <TooltipButton content={<p>Select the end date of your trip.</p>} />
            </label>
            <input
              type="date"
              {...register('toDate')}
              min={fromDate}
              className={dateInputStyle(toDate)}
            />
            {errors.toDate && <p className='text-red-500 ps-4 text-[10px]'>{errors.toDate.message}</p>}
          </div>
        </div>

        <div>
          <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
            Message (Optional)
            <TooltipButton content={<p>Let us know if you have any special requests or additional details regarding your booking.</p>} />
            <span className="text-blue-500 px-4 font-normal">
              {message.length}/100 letters left
            </span>
          </label>
          <textarea
            {...register('message')}
            placeholder="Feel free to let us know about any special requests or questions (optional)..."
            maxLength={100}
            className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className='w-full flex justify-center'>
          <button
            type="submit"
            className="text-xl py-1 px-4 w-[170px] bg-[red] hover:px-2 transition-all duration-300 ease-in-out text-white font-semibold rounded-full outline-yellow-400 outline-1 border-2 border-black shadow-sm hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            Contact Us
          </button>
        </div>

        <div className="flex justify-evenly items-center w-full flex-wrap text-black  ">
          <span>follow us</span>
          <SocialMediaIcons
            icon={
              <FaWhatsapp className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-green-500" />
            }
            link={"https://api.whatsapp.com/send/?phone=%2B919061432814&text=Hello%2C+I+am+interested+to+know+more+about+PRODUCTS+%26+SERVICES&type=phone_number&app_absent=0"}
          />
          <SocialMediaIcons
            icon={
              <FaGlobeAmericas
                className=" md:text-2xl text-lg hover:text-black transition-all duration-300 ease-in-out text-stone-600" />
            }
            link={"https://keraladrives.com/"}
          />
          <SocialMediaIcons
            icon={
              <SiGooglemybusiness
                className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-600" />
            }
            link={"https://g.co/kgs/Rhuop1m"}
          />
          <SocialMediaIcons
            icon={
              <FaLocationDot
                className=" md:text-2xl text-lg hover:text-black transition-all duration-300 ease-in-out text-blue-600" />
            }
            link={"https://maps.app.goo.gl/YitZroxLtcdPE4y67"}
          />
          <SocialMediaIcons
            icon={
              <FaFacebookF className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-500" />
            }
            link={"https://www.facebook.com/keraladrivestourstravel/"}
          />
          <SocialMediaIcons
            icon={
              <FaInstagram className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-pink-500" />
            }
            link={"https://www.instagram.com/kerala_drives/"}
          />
          <SocialMediaIcons
            icon={
              <FaYoutube className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-red-500" />
            }
            link={"https://www.youtube.com/channel/UC3tmfmBZf5Ufqo2JSEwj6BA?sub_confirmation=1"}
          />
          <SocialMediaIcons
            icon={
              <FaPinterest className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-red-600" />
            }
            link={"https://www.pinterest.com/keraladrives195/"}
          />
          <SocialMediaIcons
            icon={
              <FaLinkedin className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-600" />
            }
            link={"https://www.linkedin.com/company/kerala-drives/"}
          />



        </div>
      </form>
    </div>

  );
};

export default ContactForm;
