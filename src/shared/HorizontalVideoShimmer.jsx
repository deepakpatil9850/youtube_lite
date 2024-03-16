const HorizontalVideoShimmer = () => {
  return (
    <div className="flex">
      <div className="dark:bg-stone-800 bg-gray-200 animate-pulse rounded-lg m-2 w-2/5 aspect-video"></div>
      <div className="flex p-2 justify-between items-center w-3/5">
        <div className="w-full">
          <div className="grid grid-cols-4">
            <div className="col-span-4 p-2 m-1 dark:bg-stone-800  bg-gray-200 animate-pulse rounded-md"></div>
            <div className="col-span-2 p-2 m-1 dark:bg-stone-800  bg-gray-200 animate-pulse rounded-md"></div>
            <div className="col-span-3 p-2 m-1 dark:bg-stone-800  bg-gray-200 nimate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalVideoShimmer;
