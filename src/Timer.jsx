import { useState, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState({seconds:0,minutes:0,hours:0})
  const [toggleBtn, setToggleBtn] = useState(true)
  const intervalRef = useRef();

  const startTiming =()=>{
    if(!intervalRef.current){
   
      intervalRef.current = setInterval(() => {
        setTime((prevTime)=>{
          let {seconds,minutes,hours} = prevTime ;
          seconds++ 
          if(seconds == 60){
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes =0;
                hours++
            }
          
          }
          return {seconds,minutes,hours}
        })
      }, 1000);
         
    }
  }

  const stopTiming =()=>{
      clearInterval(intervalRef.current);
      intervalRef.current = null
  }
   
  const resetTiming =()=>{
    stopTiming();
       setTime({
         seconds : 0,
         minutes : 0,
         hours : 0,
       })
  }

  const formateNum =(num)=>{
    return String(num).padStart(2,'0');
  }

  return (
    <section className="flex flex-col justify-center items-center m-10 p-5">
    <h1 className="text-center text-3xl my-4 font-bold">Timer</h1>
    <div className="py-4 px-6 text-4xl border-2 border-gray-400 rounded-md">
     {`${formateNum(time.hours)}:${formateNum(time.minutes)}:${formateNum(time.seconds)}`}
    </div>
    <div className="flex gap-5 items-center mt-4">
 
      <button
        onClick={startTiming }

        className="funcButtons bg-green-500 text-black"
      >
        Start
      </button>
          <button
          onClick={stopTiming}
         
          className="funcButtons bg-red-500"
        >
          Stop
        </button>
      
   
    
      <button
        onClick={resetTiming}
        className="funcButtons bg-yellow-500 text-black"
      >
        Reset
      </button>
    </div>
  </section>
  )
}

export default Timer