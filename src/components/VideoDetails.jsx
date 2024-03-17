import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { getDataFromAPI } from "../utils/api";
import { Context } from "../context/ContextApi";
import SuggestionPlayList from "./SuggestionPlayList";
import ReactPlayer from "react-player";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchComments();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    setIsLoading(true);
    getDataFromAPI(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
      setIsLoading(false);
    });
  };

  const fetchComments = () => {
    getDataFromAPI(`video/comments/?id=${id}&hl=en&gl=US`).then((res) => {
      setComments(res?.comments);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row md:px-10">
        <div className="flex flex-col lg:w-[calc(100%-400px)] xl:w-[calc(100%-450px)] px-5 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          {isLoading && (
            <div className="flex p-2 justify-around items-center">
              <div className="dark:bg-stone-800  bg-gray-200 animate-pulse rounded-full p-5 w-9"></div>
              <div className="w-3/4">
                <div className="grid grid-cols-4">
                  <div className="col-span-4 p-2 m-1 bg-gray-200  dark:bg-stone-800 animate-pulse rounded-md"></div>
                  <div className="col-span-2 p-2 m-1 bg-gray-200  dark:bg-stone-800 animate-pulse rounded-md"></div>
                </div>
              </div>
              <div className="dark:bg-stone-800  bg-gray-200 animate-pulse rounded-3xl p-5 w-28"></div>
            </div>
          )}
          {!isLoading && (
            <>
              <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {video?.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row mt-4">
                <div className="flex">
                  <div className="flex items-start">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={video?.author?.avatar[0]?.url}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-3">
                    <div className="text-white text-md font-semibold flex items-center">
                      {video?.author?.title}
                      {video?.author?.badges[0]?.type ===
                        "VERIFIED_CHANNEL" && (
                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                      )}
                    </div>
                    <div className="text-white/[0.7] text-sm">
                      {video?.author?.stats?.subscribersText}
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white text-black ml-4">
                    <span>Subscribe</span>
                  </div>
                </div>
                <div className="flex text-white mt-4 md:mt-0">
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                    <AiOutlineLike className="text-xl text-white mr-2" />
                    {`${abbreviateNumber(video?.stats?.views, 2)} Likes`}
                  </div>
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                    share
                  </div>
                </div>
              </div>
              <div className="w-full bg-stone-900 text-white p-3 rounded-md my-3">
                <div>{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</div>
                <div className="text-sm line-clamp-6 text-white/[0.7]">
                  {video?.description}
                </div>
              </div>
            </>
          )}
          {/* comment section */}
          <div className="">
            <div className="text-white font-bold text-xl">
              {video?.stats?.comments &&
                `${abbreviateNumber(video?.stats?.comments, 2)} Comments`}
            </div>
            <div className="text-white">
              {comments?.length !== 0 &&
                comments?.map((item) => (
                  <div key={item?.commentId} className=" flex p-3">
                    <div className=" h-16 w-16">
                      <img
                        src={item?.author?.avatar?.[1]?.url}
                        alt=""
                        className="rounded-full max-w-none p-2  h-14 w-14"
                      />
                    </div>
                    <div className="p-2">
                      <h1 className="text-sm font-bold">
                        {item?.author?.title}
                      </h1>
                      <p className="tracking-tight line-clamp-5">
                        {item?.content}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <SuggestionPlayList id={id} />
      </div>
    </div>
  );
};

export default VideoDetails;
