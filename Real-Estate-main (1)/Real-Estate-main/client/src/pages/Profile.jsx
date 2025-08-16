import {useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserStart, signOutUserFailure } from '../redux/user/userslice';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'firebase/auth';
import { Link } from 'react-router-dom';
function Profile() {
  const {currentUser,loading,error} = useSelector((state)=> state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] =useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData]= useState({});
  const [showListingsError,setShowListingsError]= useState(false);
  const [userListings,setUserListings] = useState([])
  const [deleteError,setDeleteError] = useState(false);
  const [updateError,setUpdateError] =useState(false);
  const dispatch = useDispatch();
  console.log(filePerc);
  console.log(fileUploadError);
  console.log(formData);
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload =(file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress))
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>
      setFormData({...formData,avatar:downloadURL})
    )
    }
  );
  }
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      setUpdateError(false);
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.sucess === false)
      {
        dispatch(updateUserFailure(data.message));
        setUpdateError(true);
        return;
      }
      setUpdateError(false);
      dispatch(updateUserSuccess(data));
    } catch (error) {
      setUpdateError(true);
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async ()=>{
    try {
      dispatch(deleteUserStart());
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE',
      });
      const data = await res.json();
      if(data.sucess === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut = async()=>{
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.sucess === false){
        dispatch(signOutUserFailure(data.message))
        return ;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  const handleShowListings= async()=>{
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if(data.sucess === false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (ListingId)=>{
    try {
      const res = await fetch(`/api/listing/delete/${ListingId}`,{
        method : 'DELETE',
      });
      const data = await res.json();
      if(data.sucess ===false){
        setDeleteError(true);
        return;
      }
      setUserListings((prev)=> prev.filter((listing)=> listing._id !== ListingId))
    } catch (error) {
      setDeleteError(true);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        {currentUser && (
        <img onClick={()=> fileRef.current.click()} className='h-24 w-24 rounded-full object-cover cursor-pointer self-center my-4' src={formData.avatar || currentUser.avatar} alt="profile"/>
        )}
        <p className='tes=xt-sm self-center'>
          {fileUploadError ?(
          <span className='text-red-700'> Error Image Uploading (image must be less then 2mb)</span>
        ) : 
           filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc===100 ? (
            <span className='text-green-700'>Image Uploaded Sucessfully!!</span>
          ): ('')
          }
        </p>
        {currentUser && (
        <input id='username' className='border rounded-lg p-3' defaultValue={currentUser.username} type='text' placeholder='username' onChange={handleChange}/>)}
        {currentUser && (
        <input id='email' className='border rounded-lg p-3' defaultValue={currentUser.email} type='email' placeholder='email' onChange={handleChange}/>)}
        {currentUser && (
        <input id='password' className='border rounded-lg p-3' type='password' placeholder='password' defaultValue={currentUser.password}/>)}
        <button disabled={loading} className='p-3  text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-50' style={{backgroundColor:'#120B0C'}}>{loading ? 'Loading.....' : 'Update'}</button>
        <Link className=' text-white p-3 rounded-lg text-center hover:opacity-80 uppercase' style={{backgroundColor:'#302825'}} to={"/create-listing"}>
          Create Listing
        </Link>
        </form>
        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
      <p className='text-red-700 mt-5'>{error ? error.message : ' '}</p>
      <button onClick={handleShowListings} className='text-green-700 items-center'> Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
      {userListings && userListings.length > 0 && 
      <div className='flex flex-col gap-4'>
        <h1 className='text-center font-semibold text-2xl mt-7'>Your Listings</h1>
      {userListings.map((listing)=>(
      <div key={listing._id} className='flex items-center justify-between gap-4 border p-3 rounded-lg border-slate-500'>
        <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain'/>
        </Link>
        <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
          <p>{listing.name}</p>
        </Link>
        <div className='flex flex-col items-center'>
          <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase hover:opacity-60'>Delete</button>
          <Link to={`/update-listing/${listing._id}`}>
          <button className='text-green-700 uppercase hover:opacity-60'>Edit</button>
          </Link>
        </div>
      </div>
      ))}
      </div>
      }
      {updateError && <p className='text-red-700'>{error}</p>}
    </div>
  ) 
}

export default Profile
