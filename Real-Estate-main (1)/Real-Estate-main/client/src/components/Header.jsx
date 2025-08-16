import {FaSearch} from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
function Header() {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm,setSearchTerm]= useState('');
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery =  urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    useEffect(()=>{
        const urlParams =new URLSearchParams(location.search);
        const searchTermFormUrl = urlParams.get('searchTerm');
        if(searchTermFormUrl){
            setSearchTerm(searchTermFormUrl);
        }
    },[location.search]);
  return (
    <header  style={{ backgroundColor: '#120B0C' }} className='shadow-md '>
        <div className='flex justify-between mx-auto p-3  max-w-4xl items-center '>
            <Link to='/'>
            <h1 className='font-bold text-[6px] sm:text-xl flex flex-wrap'>
                <span className='flex flex-wrap' style={{color:'#FFFEFE'}}>PrimeProperty</span>
                <span style={{color:'#FFFEFE'}}>Hub</span>
                <span className='text-slate-500'>Estate</span>
            </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 flex rounded-lg items-center'> 
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w:24 sm:w-64' 
                value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <button>
                <FaSearch className='text-slate-600'/>
                </button>
            </form>
            <ul className=' flex gap-4'>
                <Link to='/'>
                <li style={{color:"#FFFEFE"}} className='hidden sm:inline hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li style={{color:"#FFFEFE"}} className='hidden sm:inline hover:underline'>About</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? (
                        <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
                    ):(
                        <li style={{color:"#FFFEFE"}} className=' hover:underline'>Sign in</li>
                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header
