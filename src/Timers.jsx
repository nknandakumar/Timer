import { useState, useRef } from "react";

export const Timers = () => {
	const [timer, setTimer] = useState({
		hour: 0,
		minutes: 0,
		seconds: 0,
	});
	const [inputTime, setInputTime] = useState({
		hour: "",
		minutes: "",
		seconds: "",
	});
	const [error, setError] = useState("");
	const intervalRef = useRef();
  const endAudioRef = useRef();
	const maxNum = 59;
  

	const formatetime = (value) => (value < 10 ? `0${value}` : value);
	// Input the Time
	const handleInputTime = (e) => {
		e.preventDefault();
		const { value, name } = e.target;

		const ValidationResult = Validation(value, name);
		setError(ValidationResult);
		if (!ValidationResult) {
			setInputTime((prevInputTime) => ({
				...prevInputTime,
				[name]: value,
			}));
		}
	};

	//Validation
	const Validation = (value, name) => {
	
		if (value < 0) {
			return `Negative values are not allowed`;
		}
		if (value > maxNum) {
			return `${name} must be between 0 and ${maxNum} `;
		}
		return "";
	};

	//set number to timer
	const handleSubmit = (e) => {
		e.preventDefault();
		setTimer(inputTime);
		console.log(inputTime);

		setInputTime({
			hour: "",
			minutes: "",
			seconds: "",
		});
		setError("");
	};

	//timer Functionality
	const start = () => {
		if (intervalRef.current) return;
		intervalRef.current = setInterval(() => {
			setTimer((prevTime) => {
				const { hour, minutes, seconds } = prevTime;
				if ((hour === 0, minutes == 0, seconds === 0)) {
					clearInterval(intervalRef.current);
          //Time Up music
          if(endAudioRef.current){
            endAudioRef.current.play().catch((err) => {
              console.error("Audio playback failed:", err);
            });
        }
        //time up BG
					return { hour: 0, minutes: 0, seconds: 0 };
        
				}
				if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
				if (minutes > 0)
					return { ...prevTime, minutes: minutes - 1, seconds: 59 };
				if (hour > 0) return { ...prevTime, hour: hour - 1, minutes: 59 };
			});
		}, 1000);
	};
	const stop = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = 0;
		}
	};
	const reset = () => {
		stop();
		setTimer({ hour: 0, minutes: 0, seconds: 0 });
	};

	let { hour, minutes, seconds } = timer;
	return (
		<section id="timerContainer" className={` flex flex-col justify-center items-center p-10 `} >
			<h1 className="text-4xl text-center my-10 ">Timer⌛ </h1>
			<div className="px-6 py-4 my-2 font-bold text-5xl">{`${formatetime(hour)}:${formatetime(minutes)}:${formatetime(seconds)}`}</div>
			<div className="flex gap-5 items-center mt-4">
				<button onClick={start} className="funcButtons bg-green-500 text-black">
					Start
				</button>
				<button onClick={stop} className="funcButtons bg-red-500">
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
				<form
					onSubmit={handleSubmit}
					className=" text-white flex gap-5 flex-col "
				>
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
									max="12"
                  placeholder="00"
									onChange={handleInputTime}
									value={inputTime.hour}
								/>
							</td>
							<td className=" inputTd">
								{" "}
								<input
									className="InputNum"
									type="number"
									name="minutes"
									id="minute"
									min="0"
									max="60"
                  placeholder="00"
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
									min="0"
									max="60"
                  placeholder="00"
									value={inputTime.seconds}
									onChange={handleInputTime}
									required
								/>
							</td>
						</tr>
					</table>
					{error && <p className="text-red-500"> {error} </p>}

					<button className=" uppercase  text-2xl  px-4 py-2 border-2 border-gray-300 rounded-md">
						Set the Time
					</button>
				</form>
			</div>
      <audio ref={endAudioRef} src="/assets/timeUp.wav"></audio>
		</section>
	);
};

