import React from 'react'
import { FaAddressCard, FaFacebook, FaHashtag, FaHome, FaInstagram, FaLink, FaLinkedinIn, FaList, FaPhone, FaTwitterSquare, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className=' flex flex-col gap-7'>
      <div className='p-5'>
      <h2 className='text-4xl font-semibold text-slate-700 text-center my-7 underline'>About Prime Property Hub</h2>
      <p className='text-2xl max-w-[900px] text-justify sm:text-center mx-auto font-serif'>Welcome to Prime Property Hub, your premier destination for connecting property seekers with motivated sellers. We're dedicated to revolutionizing the real estate experience by providing a seamless platform that facilitates communication between buyers and property owners</p>
      </div>
      <div className='p-5'>
        <h2 className='text-4xl font-semibold text-slate-700 text-center underline my-7'>Our Mission</h2>
        <p className='text-2xl max-w-[1000px] text-justify sm:text-center mx-auto font-serif'>At Prime Property Hub, our mission is to simplify the process of buying and selling real estate by offering a transparent and efficient platform for property listings. We believe in empowering individuals to connect directly with property owners, fostering genuine interactions and relationships.</p>
      </div>
      <div className='p-5'>
        <h2 className='text-4xl font-semibold text-slate-700 text-center underline my-7'>Why Choose Prime Property Hub?</h2>
        <div className='sm:mx-32'>
          <h3 className='text-2xl font-semibold text-justify sm:text-center'>Effortless Communication: <span className='font-normal font-serif text-wrap'>Our platform allows property seekers to easily reach out to property owners via email to express their interest, ask questions, and arrange viewings.</span> </h3>
        </div>
      </div>
      <div className='p-5'>
        <h3 className='text-4xl font-semibold text-slate-700 text-center underline my-7'>How It Works</h3>
        <div className='sm:mx-32'>
          <h3 className='text-2xl font-semibold text-justify sm:text-left mb-3'>Browse Listings: <span className='font-normal font-serif text-wrap'>Property seekers can explore our platform to discover a wide range of properties available for sale or rent</span> </h3>
        </div>
        <div className='sm:mx-32'>
          <h3 className='text-2xl font-semibold text-justify sm:text-left mb-3'>Contact Property Owners: <span className='font-normal font-serif text-wrap'>When users find a property they're interested in, they can easily contact the property owner by clicking on the "Contact Owner" button, which will open an email template with the property details pre-filled. Users can then send their inquiries directly to the property owner's email address</span> </h3>
        </div>
        <div className='sm:mx-32'>
          <h3 className='text-2xl font-semibold text-justify sm:text-left mb-3'>Arrange Viewings: <span className='font-normal font-serif text-wrap'>Property owners can respond to inquiries and arrange viewings with interested parties via email to showcase their property and discuss potential transactions offline</span> </h3>
        </div>
      </div>
      <div className='bg-gray-500 '>
      <h2 className='mt-8 ml-6 text-md font-semibold p-0 '>Prime Property Hub</h2>
        <div className='flex flex-col sm:flex-row sm:gap-10 sm:ml-20'>
          <div className=' p-10 flex flex-col gap-4'>
                <h2 className='text-lg text-white font-semibold flex items-center gap-3'>  Contact Us <FaPhone className='text-black'/> </h2>
          <p className='text-white max-w-[300px] text-sm'>Have questions or need assistance? Our dedicated team is here to help! Feel free to reach out to us via email at <span className='text-blue-700'>sf6074779@gmail.com</span>. We're committed to providing exceptional service and support to our users.</p>
          </div>
          <div className='flex gap-4   sm:mx-0 mx-10 text-white flex-col sm:mt-14 '>
            <h3 className='font-semibold flex gap-2 items-center'>Usefull Links <FaLink className='text-black'/></h3>
            <Link to={'/'} className='flex items-center gap-2 hover:underline'><FaHome/> Home </Link>
            <Link to={'/about'} className='flex items-center gap-2 hover:underline'><FaAddressCard/> About </Link>
            <Link to={'/search'} className='flex items-center gap-2 hover:underline'><FaList/> Choose Your dream home </Link>
          </div>
          <div className='text-white sm:mt-10  flex-col gap-2 mx-10 sm:mx-0 mt-5 hidden md:flex lg:flex'>
            <h3 className='font-semibold flex gap-2 items-center'>Social media <FaHashtag className='text-black'/></h3>
            <p className='flex items-center gap-2'><FaInstagram/>@PrimePropertyHub</p>
            <p className='flex items-center gap-2'><FaYoutube/>Youtube PrimePropertyHub</p>
            <p className='flex items-center gap-2'><FaFacebook/>Prime_Property_Hub</p>
            <p className='flex items-center gap-2'><FaTwitterSquare/>PrimePropertyHub</p>
            <p className='flex items-center gap-2'><FaLinkedinIn/>PrimePropertyHub</p>
          </div>

          <div className='sm:mt-40 text-xs text-white'>
            <footer>© 2024 Prime Property Hub. All rights reserved</footer>
          </div>
        </div>
      <div>
      </div>
      </div>
    </div>
  )
}

export default About
