import React, { useEffect, useState } from "react"

import SearchBar from "./SearchBar"
import SearchResult from "./SearchResults"

import IndeterminateLoader from "app/components/Loader/Indeterminate"

const Search = ({ suggestionData = null }) => {
  const [searchStr, setSearchStr] = useState(suggestionData)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchCallback = (search) => {
    setSearchStr(search)
  }

  useEffect(() => {
    const fetchSuggestions = async (keyword) => {
      const result = await fetch(`/api/suggestions/${keyword}`)
      const data = await result.json()
      console.log(data)
      setSearchResults(data)
      setLoading(false)
    }

    if (searchStr) {
      setLoading(true)
      fetchSuggestions(searchStr)
    } else {
      setLoading(false)
      setSearchResults([])
    }
  }, [searchStr])

  return (
    <div className="grid grid-cols-1 mt-20">
      <SearchBar searchCallback={searchCallback} />
      {loading ? (
        <div className="w-full mt-3">
          <IndeterminateLoader />
        </div>
      ) : (
        <SearchResult data={searchResults} searchStr={searchStr} />
      )}
    </div>
  )
}

export default Search
