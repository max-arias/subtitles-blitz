import React from "react"
import Link from "next/link"
import Image from "next/image"

const SearchResults = ({ data = [], searchStr = "" }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {data.map((s) => {
        const poster = s.Poster === "N/A" ? "https://via.placeholder.com/94x128?text=No+Image" : s.Poster

        const url = s.Type === "series" ? `series/${s.imdbID}` : s.imdbID

        return (
          <Link href={`/subs/${url}`} key={s.imdbID}>
            <div className="w-full flex mb-4 cursor-pointer lg:h-32">
              <Image
                width="85"
                height="128"
                className="h-48 lg:h-32 w-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden"
                src={poster}
                alt={s.Title}
              />
              <div className="md:w-32 border-r border-b border-gray-400 border-t bg-white rounded rounded-tl-none rounded-bl-none p-2 flex flex-col justify-between leading-normal flex-grow">
                <div className="text-gray-900 font-bold text-xl mb-1 truncate">{s.Title}</div>
                <p className="text-gray-700 truncate" style={{ lineClamp: 1 }}>
                  {s.imdbRating}/10
                </p>
                <p className="text-gray-700 truncate" style={{ lineClamp: 1 }}>
                  {s.Genre} ({s.Rated})
                </p>
                <p className="text-gray-700 truncate" style={{ lineClamp: 1 }}>
                  {s.Year}
                </p>
              </div>
            </div>
          </Link>
        )
      })}

      {!data.length && searchStr ? <span>No results</span> : null}
    </div>
  )
}

export default SearchResults
