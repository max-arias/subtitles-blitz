import _ from "lodash"
import classNames from "classnames"
import { useDropzone } from "react-dropzone"
import ptt from "parse-torrent-title"

import React, { useCallback, useState } from "react"

const SearchBar = ({ searchCallback }) => {
  const [inputValue, setInputValue] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: (files) => handleFileDrop(files),
    accept: "video/*",
  })

  const debouncedSearchCallback = useCallback(
    _.debounce((title) => searchCallback({ title }), 250),
    []
  )

  const handleInput = (e) => {
    setInputValue(e.target.value)

    debouncedSearchCallback(e.target.value)
  }

  const handleFileDrop = (files) => {
    const names = files.map((item) => ptt.parse(item.name))
    console.log({ names })

    // const [file] = files

    // const res =

    // setInputValue(res.title)
    // searchCallback(res)
  }

  return (
    <div
      {...getRootProps({
        className: classNames([
          "w-full",
          "flex",
          "border",
          "border-gray-200",
          "rounded",
          "p-4",
          "shadow-lg",
          "text-xl",
          "bg-white",
          isDragActive && "border-blue-300",
          isDragActive && "border-dashed",
        ]),
      })}
    >
      <input
        type="text"
        className="w-full outline-none px-3"
        placeholder="Enter a name or drop a file to search"
        onChange={handleInput}
        value={inputValue}
      />
    </div>
  )
}

export default SearchBar
