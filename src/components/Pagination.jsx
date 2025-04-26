import React from 'react'

function Pagination({pageNext, pagePrev, pageNo}) {
  return (
    <div className='flex justify-center items-center space-x-4'>
      <button 
        onClick={pagePrev}
        className='px-4 py-2 bg-[#f5c518] text-black rounded hover:bg-[#f5c518]/80 disabled:opacity-50'
        disabled={pageNo === 1}
      >
        Previous
      </button>
      <span className='text-white text-lg font-medium'>Page {pageNo}</span>
      <button 
        onClick={pageNext}
        className='px-4 py-2 bg-[#f5c518] text-black rounded hover:bg-[#f5c518]/80'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination