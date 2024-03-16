import { useEffect, useState } from "react";
import { getDataFromAPI } from "../utils/api";
import SuggestionVideoCard from "./SuggestionVideoCard";
import HorizontalVideoShimmer from "../shared/HorizontalVideoShimmer";

const SuggestionPlayList = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchRelatedVideos();
  }, []);

  const fetchRelatedVideos = () => {
    setLoading(true);
    getDataFromAPI(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[400px] xl:w-[450px]">
      {loading && (
        <>
          <HorizontalVideoShimmer />
          <HorizontalVideoShimmer />
          <HorizontalVideoShimmer />
          <HorizontalVideoShimmer />
          <HorizontalVideoShimmer />
          <HorizontalVideoShimmer />
          <HorizontalVideoShimmer />
        </>
      )}
      {relatedVideos?.map((item, index) => {
        if (item?.type !== "video") return false;
        return <SuggestionVideoCard key={index} video={item?.video} />;
      })}
    </div>
  );
};

export default SuggestionPlayList;
