import React from 'react'

const App = () => {
  return (
    <div className='h-screen bg-black text-white'>
      <form className='flex justify-between items-start flex-col '>
        <div className='flex w-1/2 items-start flex-col gap-4 p-10'>
          <input
        type="text" 
        placeholder='Enter Notes Heading'
        className='px-5 w-full py-2 border-2 outline-none rounded'
        />
        <input type="text" 
        className='px-5 w-full py-2 border-2 outline-none rounded'
        placeholder='Enter Details'
        />
        <button className='bg-white text-black px-5 py-2 border-2 outline-none rounded'>Add Note</button>
        </div>
      </form>
    </div>
  )
}

export default App
