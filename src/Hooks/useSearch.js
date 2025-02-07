import React from "react";

const Search = React.createContext({});

export { Search };

const useSearch = () => React.useContext(Search);
export default useSearch;
