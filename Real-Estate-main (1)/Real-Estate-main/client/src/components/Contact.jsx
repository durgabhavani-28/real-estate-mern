import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Contact({listing}) {
  const [landloard,setLandloard] = useState(null);
  const [message,setMessage] = useState('');
  const onChange = (e)=>{
    setMessage(e.target.value);
  }
  useEffect(()=>{
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        if (!res.ok) {
          throw new Error('Failed to fetch landlord');
        }
        const data = await res.json();
        console.log(data); // Parse the response
        setLandloard(data);
      } catch (error) {
        console.log(error); // Log the error properly
      }
    };
    fetchLandlord();
  },[listing.userRef])
  return (
    <>
    {landloard && (
      <div className='mt-3 flex flex-col gap-2'>
        <p>Contact <span className='font-semibold'>{landloard.username}</span> for <span>{listing.name.toLowerCase()}</span>
        </p>
        <textarea name="message" id="message"  rows="2" value={message} onChange={onChange} placeholder='Enter Your message here......' className='w-full border rounded-lg p-3 bg-gray-200'></textarea>
        <Link to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`} className='text-white text-center bg-slate-700 rounded-lg p-3 w-[300px] sm:w-[900px] mt-2 uppercase'>
        send a message
        </Link>
      </div>
    )}
    </>
  )
}

export default Contact
