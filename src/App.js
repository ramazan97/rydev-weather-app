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
  const [location, setLocation] = useState("bolu");
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

    if (inputValue === "") {
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

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
      <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center ">
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
      icon = <IoMdRainy className="text-cyan-500" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-300" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-cyan-500" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-cyan-500" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;

    default:
      break;
  }
  const date = new Date();

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <div className="h-16 fixed top-0 left-0  flex items-center justify-start pl-14 w-full mb-8 ">
        <a href={"https://ry-portfolio-v2.vercel.app/"}>
          <h1 className="text-white text-4xl font-bold font-sofia ">
            ry<span className="text-red-500  ">.dev</span>{" "}
          </h1>
        </a>
      </div>
      {/* <div className="text-6xl">{icon} </div> */}

      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-pink-500 text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md ">
          {`${errorMsg.response.data.message}`}{" "}
        </div>
      )}

      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mt-4 mb-8 `}
      >
        <div className="h-full  relative flex items-center justify-between p-2 ">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full "
            type="text"
            placeholder="Şehir ara..."
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
          <div className="w-full max-w-[450px] min-h-[584px]  h-full flex justify-center items-center">
            <ImSpinner8 className="text-5xl animate-spin text-white" />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-5 ">
              {/* icon */}
              <div className="text-[87px] ">{icon} </div>
              <div className="">
                {/* country name */}
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
              <div className="flex items-start justify-center">
                {" "}
                <div className="text-[144px] leading-none font-light ">
                  {parseInt(data.main.temp)}
                </div>
                {/* celcius icon */}
                <div className="text-4xl  mt-4">
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
                      {parseInt(data.main.feels_like)}
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
                    Humidity
                    <div className="flex ml-2">{data.main.humidity}%</div>
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
