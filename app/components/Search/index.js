import React, { useState } from "react"

import SearchBar from "./SearchBar"
import SearchResult from "./SearchResults"

import Spinner from "../../assets/svg/spinner.svg"

const Search = ({ suggestionData = null, loading = false }) => {
  const [searchData, setSearchData] = useState(suggestionData)

  const searchCallback = (search) => {
    console.log({ search })
    setSearchData(search)
  }

  return (
    <div className="grid grid-cols-1 mt-20">
      <SearchBar searchCallback={searchCallback} />
      {loading ? (
        <div className="w-full flex justify-center mt-4">
          <Spinner className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-700" />
        </div>
      ) : (
        <SearchResult searchData={searchData} />
      )}
    </div>
  )
}

export default Search
