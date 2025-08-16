import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

function ListingItems({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg sm:w-[330px] w-full transition-shadow overflow-hidden rounded-lg'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt=" listing cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
          <div className='flex items-center gap-2'>
            <MdLocationOn className='text-green-700 h-4 w-4' />
            <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
          </div>
          <div >
            <p className='line-clamp-2 text-sm text-gray-600'>{listing.description}</p>
            <p className='text-slate-500 font-semibold'>
          {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')} <sup>rs</sup>
          {listing.type ==='rent' && '/month'}
            </p>
            <div className='flex gap-3 text-xs font-semibold'>
                <div>{listing.bedrooms >1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</div>
                <div>{listing.bathrooms >1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItems;
