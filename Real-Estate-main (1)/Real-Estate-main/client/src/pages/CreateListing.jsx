import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { app } from '../firebase.js';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
function CreateListing() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    imageUrls : [],
    name : '',
    description : '',
    address : '',
    type : 'rent',
    bedrooms:1,
    bathrooms:2,
    regularPrice: 5000,
    discountedPrice:0,
    offer:false,
    parking:false,
    furnished: false,
  })
  const [imageUploadError,setImageUploadError] = useState(false);
  const [uploading,setUploading] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e)=>{
    if(files.length>0 && files.length+ formData.imageUrls.length <7){
      setUploading(true);
      setImageUploadError(false);
      const promises =[];
      for(let i =0 ; i<files.length;i++)
      {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, ...urls]});
          setImageUploadError(false);
          setUploading(false);
      }).catch((err)=>{
        setImageUploadError('Image upload failed (2mb max)');
        setUploading(false);
      });
    }else{
      setImageUploadError('You cannot upload images more then 6');
      setUploading(false);
    }
  }
  const storeImage= async (file) =>{
    return new Promise((resolve,reject)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
          });
        }
      )
    })
  }
  const handleRemoveImage = (index)=>{
    setFormData({
      ...formData,
      imageUrls : formData.imageUrls.filter((_,i) => i!==index),
    })
  }
  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id
      });
    }
    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      });
    }
    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    }
  };
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
      if(formData.imageUrls.length < 1) return setError('!!!You must upload atleast one image');
      if(+formData.regularPrice < +formData.discountedPrice) return setError('!!!Discount price should be lower then the regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef : currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if(data.sucess === false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  // Rest of your component code...
  return (
    <main className='p-3 w-full mt-16 mx-auto max-h-full rounded-lg shadow-lg' style={{backgroundColor:'#EAEAEA'}}>
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col gap-4 flex-1'>
        <input className='border p-3 rounded-lg' type="text" placeholder='Name' minLength='8' required id="name" onChange={handleChange} value={formData.name} />
        <textarea className='border p-3 rounded-lg' type="text" placeholder='Description' required id="description" onChange={handleChange} value={formData.description} />
        <input className='border p-3 rounded-lg' type="text" placeholder='Address' required id="address" onChange={handleChange} value={formData.address}/>
    <div className=' flex gap-7 flex-wrap mt-4'>
        <div className='flex gap-2'>
          <input type="checkbox" id='sale' className='w-7' onChange={handleChange} checked={formData.type==='sale'}/>
          <span className='font-semibold ' >Sell</span>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id='rent' className='w-7' onChange={handleChange} checked={formData.type==='rent'}/>
          <span className='font-semibold '>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id='parking' className='w-7' onChange={handleChange} checked={formData.parking}/>
          <span className='font-semibold ' >Parking Spot</span>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id='furnished' className='w-7' onChange={handleChange} checked={formData.furnished}/>
          <span className='font-semibold '>Furnished</span>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id='offer' className='w-7'onChange={handleChange} checked={formData.offer} />
          <span className='font-semibold '>Offer</span>
        </div>
      </div>
      <div className=' flex flex-wrap gap-6'>
          <div className= 'flex items-center gap-2'>
            <input type="number" id="bedrooms" min='1' max='10' required className='p-3 mt-4 border rounded-lg border-gray-300'onChange={handleChange} value={formData.bedrooms} />
            <span className=' font-semibold'>Bedrooms</span>
          </div>
          <div className= 'flex items-center gap-2'>
            <input type="number" id="bathrooms" min='1' max='10' required className='p-3  mt-4 border rounded-lg border-gray-300'onChange={handleChange} value={formData.bathrooms} />
            <span className=' font-semibold'>Bathrooms</span>
          </div>
          <div className= 'flex items-center gap-2'>
            <input type="number" id="regularPrice" min='5000' max='20000000' required className='p-3 mt-4 border rounded-lg border-gray-300' onChange={handleChange} value={formData.regularPrice}/>
            <div className='flex flex-col items-center  font-semibold'>
            <span>Regular Price</span>
            <span>(rs /month)</span>
            </div>
          </div>
          {formData.offer && (
          <div className= 'flex items-center gap-2'>
            <input type="number" id="discountedPrice" min='0' max='200000' required className='p-3  mt-4 border rounded-lg border-gray-300' onChange={handleChange} value={formData.discountedPrice}/>
            <div className='flex flex-col items-center  font-semibold'>
            <span>Discounted Price</span>
            <span>(rs /month)</span>
            </div>
          </div>
          )}
        </div>
        </div>
        <div className='font-semibold flex flex-col flex-1 gap-4'>
          <p className='text-red-600'>Images :
          <span className='font-normal ml-2 text-red-500'>The first image will be the cover (max 6)</span>
          </p>
        <div className='flex gap-4 p-3 '>
          <input onChange={(e)=> setFiles(e.target.files)} className=' border rounded w-full border-slate-500 p-5' type="file" id='images' accept='image/*' multiple />
          <button type='button' disabled={uploading} onClick={handleImageSubmit} className='border p-3 border-blue-700 text-blue-700 rounded uppercase hover: shadow-lg disabled : opacity-80'>{uploading ? 'Uploading....': 'Upload'}</button>
        </div>
        <p className='text-red-600 font-normal'>{imageUploadError && imageUploadError}</p>
        {
          formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
            <div key={url} className='flex justify-between p-3 border items-center border-gray-300'>
            <img src={url} alt='listing image' className='w-40 h-20 object-contain rounded-lg'/>
            <button type='button' onClick={()=>handleRemoveImage(index)} className='text-red-700 p-3 border rounded-lg hover:opacity-75'>Delete</button>
            </div>
          ))
        }
        <button disabled={loading||uploading} className='border-none uppercase font-normal disabled:opacity-70 rounded-lg hover:opacity-95 p-3 text-white' style={{backgroundColor:'#302825'}}>{loading ? 'Creating.....':'Create Listing'}</button>
        {error && <p className='text-red-700 text-sm'>{error}</p> }
        </div>
    </form>
  </main>
  );
}

export default CreateListing;
