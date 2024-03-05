import { createContext, useEffect, useState } from "react";
import { getDataFromAPI } from "../utils/api";

export const Context = createContext();
export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    getCategoriesData(selectCategories);
  }, [selectCategories]);

  const getCategoriesData = (query) => {
    setLoading(true);
    getDataFromAPI("search/?q=" + query)
      .then(({ contents }) => {
        console.log(contents);
        setSearchResults(contents);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        mobileMenu,
        searchResults,
        setSearchResults,
        setMobileMenu,
        selectCategories,
        setSelectCategories,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
