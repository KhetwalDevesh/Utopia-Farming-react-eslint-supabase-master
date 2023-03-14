import imageB from "../images/b.png";
import imageA from "../images/a.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="overflow-hidden">
      {/*  className="bg-[#fffaf1]" */}
      <div className=" mx-auto h-[100vh] pl-5 flex flex-col justify-around">
        <div className="flex items-center justify-between mt-16">
          <h2 className="text-[4.5rem] text-[#003B54] font-bold">
            Utopia Farming
          </h2>
          <img src={imageB} alt="" className=" rounded-b-xl w-[44rem]" />
        </div>
        <div className="flex justify-between space-x-20 py-8 mr-32 w-1300:mr-20">
          <img src={imageA} alt="" className="bottom-0 w-[600px]  left-0" />
          <div className="card leading-9 w-1100:text-base w-1300:text-md w-1300:p-10 bg-[#dcfce7] h-fit w-[30rem] rounded-xl p-12  text-[#185454] text-lg right-10">
            Move over to{"  "}
            <Link
              to="/community"
              className="community-btn bg-[#185454] text-[#dcfce7] p-2 rounded-lg"
            >
              Community
            </Link>
            {"  "}
            to join the Chat section. There you can interact with other farmers
            like you. You can discuss your ideas and resolve your queries by
            raising it. You can also upload images related to your queries there
            , in case you want to clear the query statement.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
