import React, { useEffect, useState } from "react";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";

const APIkey = "47e7d63485bf9cfea6ee22efaa3936ee";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bucharest");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    const input = document.querySelector("input");

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  // console.log(data, "data");
  //loading
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center ">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSnow />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    default:
      break;
  }
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-pink-500 text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md ">
          {`${errorMsg.response.data.message}`}{" "}
        </div>
      )}

      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 `}
      >
        <div className="h-full relative flex items-center justify-between p-2 ">
          <input
            onClick={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full "
            type="text"
            placeholder="Search by city or country"
          />

          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-cyan-500 hover:bg-cyan-300 w-20 h-12 rounded-full flex justify-center items-center transition "
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] px-6 py-12 ">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl" />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-5 ">
              <div className="text-[87px] ">{icon} </div>
              <div className="">
                {" "}
                <div className="text-2xl">
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div className="">
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex items-center justify-center">
                {" "}
                <div className="text-[144px] leading-none font-light ">
                  {(parseInt(data.main.temp) / 33, 8)}
                </div>
                {/* celcius icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather descp */}
              <div className="capitalize text-center">
                {data.weather[0].description}{" "}
              </div>
            </div>
            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6 ">
              <div className="flex justify-between">
                {" "}
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px] ">
                    <BsEye />{" "}
                  </div>{" "}
                  <div className="">
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px] ">
                    <BsThermometer />{" "}
                  </div>{" "}
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {(parseInt(data.main.feels_like) / 33, 8)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="flex justify-between">
                {" "}
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px] ">
                    <BsWind />{" "}
                  </div>{" "}
                  <div className="">
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px] ">
                    <BsWater />{" "}
                  </div>{" "}
                  <div className="flex">
                    Huminity
                    <div className="flex ml-2">
                      {(parseInt(data.main.humunity) / 33, 8)}%
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
