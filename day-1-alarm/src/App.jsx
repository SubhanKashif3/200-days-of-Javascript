import React, { useEffect, useState } from 'react'

const App = () => {
  const [time, setTime] = useState("");
  const [currentTime, setCurrentTime] = useState('');
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());

      if (isAlarmActive && time == now.toLocaleTimeString().slice(0, 5)) {
        const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
        audio.play();
        setIsAlarmActive(false)
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time, isAlarmActive]);

  const handleAlarmSet = (e) => {
    e.preventDefault()
    setIsAlarmActive(true)
  }

  return (
    <div className='w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-2xl max-w-md w-full'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Alarm Clock</h1>
        <p className='text-xl text-center mb-6 text-gray-600'>Current Time: <span className='font-semibold'>{currentTime}</span></p>
        <form onSubmit={handleAlarmSet} className='flex flex-col items-center'>
          <input 
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className='mb-4 p-2 w-full border border-gray-300 rounded'
          />
          <button 
            type='submit'
            className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300'
          >
            Set Alarm
          </button>
        </form>
        {isAlarmActive && 
          <p className='mt-4 text-center text-green-600 font-semibold'>
            Alarm set for {time}
          </p>
        }
      </div>
    </div>
  )
}

export default App