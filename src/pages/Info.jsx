import React from "react";
import { Link } from "react-router-dom";

function Info() {
  return (
    <div className="h-[100vh]">
      <div
        className="h-screen overflow-y-auto justify-center items-center p-8 flex flex-col space-y-3"
        id="parentContainer"
      >
        <div className="">
          <a
            href="https://www.drishtiias.com/to-the-points/paper3/cropping-patterns-and-major-crops-of-india-part-one#:~:text=India%20is%20geographically%20a%20vast,are%20rabi%2C%20kharif%20and%20zaid.&text=Food%20crops%2D%20Rice%2C%20Wheat%2C,%2C%20Rubber%2C%20Cotton%20and%20Jute."
            target="_blank"
            className="p-4 rounded-md bg-green-700 text-ellipsis text-white inline-block"
          >
            Cropping Patterns in India
          </a>
        </div>

        <div className="">
          <a
            href="https://byjus.com/free-ias-prep/major-cropping-seasons-in-india/"
            target="_blank"
            className="p-4 rounded-md bg-purple-900 text-ellipsis text-white inline-block"
          >
            Season wise Crops in India
          </a>
        </div>

        <div className="">
          <a
            href="https://byjus.com/biology/agriculture-agricultural-practices/"
            target="_blank"
            className="p-4 rounded-md bg-orange-900 text-ellipsis text-white inline-block w-56"
          >
            Farming Practices in India
          </a>
        </div>

        <div className="">
          <a
            href="https://en.wikipedia.org/wiki/Fish_farming#:~:text=Fish%20farming%20or%20pisciculture%20involves,enclosures%20such%20as%20fish%20ponds."
            target="_blank"
            className="p-4 rounded-md bg-blue-900 text-ellipsis text-white inline-block w-56"
          >
            Fish Farming
          </a>
        </div>

        <div className="">
          <a
            href="https://vikaspedia.in/agriculture/livestock/model-bankable-projects/dairy-farming#:~:text=Loan%20Repayment%20Schedule-,Scope%20for%20dairy%20farming,production%20through%20profitable%20dairy%20farming."
            target="_blank"
            className="p-4 rounded-md bg-yellow-500 text-ellipsis text-white inline-block w-56"
          >
            Dairy Farming
          </a>
        </div>

        <div className="">
          <a
            href="https://en.wikipedia.org/wiki/Agricultural_safety_and_health#:~:text=Agricultural%20safety%20and%20health%20is,farm%20workers%2C%20and%20their%20families."
            target="_blank"
            className="p-4 rounded-md bg-slate-500 text-ellipsis text-white inline-block w-56"
          >
            Agricultural Health
          </a>
        </div>
      </div>
    </div>
  );
}

export default Info;
