import { useState, useRef } from "react";

export const Timers = () => {
    const [timer, setTimer] = useState({
        hour : 0 ,
        minutes :0 ,
        seconds :0,
    })
    const [inputTime, setInputTime] = useState({
        hour : null ,
        minutes :null,
        seconds :null,
    })
 
    // Input the Time
      const handleInputTime =(e)=>{
          e.preventDefault();
          const {value,name} = e.target ;
          setInputTime((prevInputTime)=>({
            ...prevInputTime,
               [name] : value   ,
          }))
      }
    //set number to timer
    const handleSubmit =(e)=>{
        e.preventDefault();
        setTimer({
            hour : inputTime.hour ,
            minutes : inputTime.minutes ,
            seconds : inputTime.seconds
        })
        setInputTime({
            hour : 0 ,
            minutes :0 ,
            seconds :0,
        })
    }
      //timer Functionality
      const  start =()=>{
          
      }
      const stop =()=>{
        
      }
      const  reset =()=>{
        
      }

	return (
		<section className="flex flex-col justify-center items-center p-10 ">
			<h1 className="text-4xl text-center my-10 ">Timer⌛ </h1>
			<div className="px-6 py-4 my-2 font-bold text-5xl">{`${timer.hour} : ${timer.minutes} : ${timer.seconds}`}</div>
            <div className="flex gap-5 items-center mt-4">
 
 <button
   onClick={start }

   className="funcButtons bg-green-500 text-black"
 >
   Start
 </button>
     <button
     onClick={stop}
    
     className="funcButtons bg-red-500"
   >
     Stop
   </button>
 


 <button
   onClick={reset}
   className="funcButtons bg-yellow-500 text-black"
 >
   Reset
 </button>
</div>
			<div className="my-4 p-4">
				<form className=" text-white flex gap-5 flex-col ">
					<h2 className="text-2xl  font-sans ">Set the Time : </h2>
   
					<table className="  w-full max-w-sm mx-auto p-6 border border-gray-300 rounded-xl shadow-lg ">
						<thead className="">
							<tr className=" my-2">
								<th className="inputTh">Hour</th>
								<th className="inputTh">Minute</th>
								<th className="inputTh">Second</th>
							</tr>
						</thead>
						<tr className=" border-t ">
							<td className=" inputTd">
								{" "}
								<input
									className=" InputNum"
									type="number"
									name="hour"
									id="hour"
                                    max="2"
                                    onChange={handleInputTime}
                                    value={inputTime.hour}
								/>
							</td>
							<td className=" inputTd">
								{" "}
								<input
									className="InputNum"
									type="number"
									name="minute"
									id="minute"
                                    value={inputTime.minutes}
                                    onChange={handleInputTime}
								/>
							</td>
							<td className=" inputTd">
								{" "}
								<input
									className="InputNum"
									type="number"
									name="seconds"
									id="seconds"
                                    value={inputTime.seconds}
                                    onChange={handleInputTime}
								/>
							</td>
						</tr>
					</table>
					<button
						className=" uppercase  text-2xl  px-4 py-2 border-2 border-gray-300 rounded-md"
						type="submit"
                         onClick={handleSubmit}
					>
						Set the Time
					</button>
				</form>
			</div>
		</section>
	);
};

/*
 <div className="flex p-4 gap-6 my-4 ">
        <button className="" onClick={''} ></button>
        <button className="" onClick={''} ></button>
        <button className="" onClick={''} ></button>
     </div>

*/
