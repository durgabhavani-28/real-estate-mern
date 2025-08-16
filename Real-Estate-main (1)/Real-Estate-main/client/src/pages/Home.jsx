import { Link } from 'react-router-dom';
import {FaAddressCard, FaFacebook, FaHashtag, FaHome, FaInstagram, FaLink, FaLinkedinIn, FaList, FaPhone, FaTwitterSquare, FaYoutube} from 'react-icons/fa';
function Home() {
  return (
    <div className=''>
      <div className='p-3'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col max-w-[400px] md:max-w-[700px]'>
          <div>
            <h2 className='text-3xl font-bold mx-4 md:mx-8 md:max-w-[500px] mt-12 sm:mt-28 md:text-6xl flex flex-wrap max-w-[300px] my-6 text-gray-700'>
              Illuminating Your Path to Luxury Living
            </h2>
            <h4 className='text-xl sm:text-2xl m-4  text-justify md:mx-8'>
              Where sellers meet seekers in the world of real estate. Explore
              our curated collection of homes, where every listing is a story
              waiting to unfold. Whether you're selling your cherished property
              or searching for your next dream home, our platform bridges the
              gap between aspirations and achievements
            </h4>
          </div>
        </div>
        <img
          className='max-w-72 mx-auto md:max-w-[700px] md:ml-6 md:mt-12 md:mr-3 shadow-2xl rounded-xl'
          src='https://png.pngtree.com/background/20231030/original/pngtree-contemporary-3d-illustration-of-a-tropical-house-with-modern-architecture-picture-image_5807805.jpg'
          alt='home_image'
        />
      </div>
      <div className='mt-7 md:mt-12 max-w-[400px] hover:opacity-80'>
        <Link
          to={'/search'}
          className='mx-4 md:mx-24 text-lg  border-red-700 font-semibold p-2 md:p-3 rounded-md bg-gray-700 text-yellow-400 flex items-center justify-center'
        >
          Choose your Life <FaHome className='text-white ml-2 text-2xl' />
        </Link>
      </div>
      </div>
      <div className='bg-gray-500 '>
      <h2 className='mt-8 ml-6 text-md font-semibold p-3'>Prime Property Hub</h2>
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
          <div className='text-white sm:mt-10 flex flex-col gap-2 mx-10 sm:mx-0 mt-5 hidden md:flex lg:flex'>
            <h3 className='font-semibold flex gap-2 items-center'>Social media <FaHashtag className='text-black'/></h3>
            <p className='flex items-center gap-2'><FaInstagram/>@PrimePropertyHub</p>
            <p className='flex items-center gap-2'><FaYoutube/>Youtube PrimePropertyHub</p>
            <p className='flex items-center gap-2'><FaFacebook/>Prime_Property_Hub</p>
            <p className='flex items-center gap-2'><FaTwitterSquare/>PrimePropertyHub</p>
            <p className='flex items-center gap-2'><FaLinkedinIn/>PrimePropertyHub</p>
          </div>

          <div className='sm:mt-40 text-xs text-white mt-5'>
            <footer>© 2024 Prime Property Hub. All rights reserved</footer>
          </div>
        </div>
        </div>
    </div>
  );
}

export default Home;
