import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import HorizontalVideoShimmer from "../shared/HorizontalVideoShimmer";
import { getDataFromAPI } from "../utils/api";
import { Context } from "../context/ContextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    setIsLoading(true);
    getDataFromAPI(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents);
      setLoading(false);
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {isLoading && (
            <>
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
              <HorizontalVideoShimmer />
            </>
          )}
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item?.video;
            return <SearchResultVideoCard key={video?.videoId} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
