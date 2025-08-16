import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import {FaSpinner,FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
function Listing() {
    const params = useParams()
    const {currentUser} = useSelector((state) => state.user);
    const [contact, setContact] = useState(false);
    SwiperCore.use([Navigation]);
    const [listing,setListing]=useState(null);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    useEffect(()=>{
        const fetchListing = async ()=>{
            try {
                setLoading(true);
                const res= await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.sucess === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data); 
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    },[params.listingId]);
  return (
    <main className='flex-wrap'>
      {loading && <FaSpinner className=' text-center text-6xl mx-auto'/>}
      {error && <p className='text-center my-7 text-2xl text-blue-600'> Error loading the page........ </p>}
      {listing && !loading && !error && (<div>
      <Swiper navigation>
        {listing.imageUrls.map((url)=>( <SwiperSlide key={url}>
            <div className='h-[300px] sm:h-[550px] 'style={{ background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>
            </div>
        </SwiperSlide>))}
      </Swiper>
      <div className='m-4 max-w-4xl mx-auto '>
        <div className='flex font-semibold text-2xl p-4 gap-3'>
        <h1>{listing.name}</h1>
        {listing.offer ? listing.discountedPrice.toLocaleString('en-us') : listing.regularPrice.toLocaleString('en-us')}
        {listing.type === 'rent' && '/month'}
        </div>
        <p className='flex items-center  gap-2  text-slate-700 my-2 text-sm p-4'> <FaMapMarkerAlt className='text-green-700'/> {listing.address}</p>
        <div className='flex gap-4 p-4'>
          <p className='text-center bg-red-900 rounded-md p-1 text-white w-[90px] sm:w-[200px]'>{listing.type==='rent' ? 'For rent' : 'For Sale'}</p>
          {
            listing.offer && (
              <p className='text-center bg-green-900 rounded-md p-1 text-white w-[100px] sm:w-[200px] '>{+listing.regularPrice - +listing.discountedPrice}/ discount</p>
            )
          }
        </div>
      
      <div className='p-3'>
        <p className='text-slate-800 text-justify'>
          <span className=' font-semibold text-black'>Description - {' '}</span>
          {listing.description}
        </p>
        <ul className='mt-4 flex gap-3 sm:gap-6  text-green-900 font-semibold text-sm flex-wrap'>
          <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
            <FaBed className='text-lg'/>
            {listing.bedrooms > 1 ? `${listing.bedrooms} beds `: `${listing.bedrooms}'bed'`}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
            <FaBath className='text-lg'/>
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths `: `${listing.bathrooms}bath'`}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
            <FaParking className='text-lg'/>
            {listing.parking ? 'Parking' : 'No Parking'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
            <FaChair className='text-lg'/>
            {listing.furnished ? 'Furnished' : 'Not Furnished'}
          </li>
        </ul>
        {currentUser && listing.useRef !== currentUser._id && !contact && (
        <button onClick={()=>setContact(true)} className='bg-slate-700 text-white p-3 rounded-lg w-[300px] sm:w-[900px] ml-6 sm:ml-0 hover:opacity-95 uppercase mt-4'>Contact LandLoard</button>
        )}
        {contact && <Contact listing={listing}/>}
      </div>
      </div>
      </div>
      )}
    </main>
  )
}

export default Listing
