import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import classNames from "classnames"
import { Translate } from "phosphor-react"
import Tooltip from "rc-tooltip"
import { PROVIDERS } from "../../utils/constants"

import LanguageFilter from "./LanguageFilter"

import "rc-tooltip/assets/bootstrap_white.css"

const filterList = (data, filterValues) => {
  let output = data

  if (filterValues?.length) {
    output = data.filter((item) => filterValues.includes(item.language))
  }

  return _.orderBy(output, ["language", "data.score"], ["asc", "desc"])
}

const buildUrl = (data) => {
  if (data.provider === "opensubtitles") {
    return data.data.url
  }

  const host = PROVIDERS[data.provider]
  return `${host}${data.data.url}`
}

const SubsTable = ({ data }) => {
  const [clickedRows, setClickedRows] = useState([])
  const [showLanguageFilter, setShowLanguageFilter] = useState(false)

  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [subtitleList, setSubtitleList] = useState([])

  const originalData = useMemo(() => data, [])

  const languageFilterOptions = useMemo(() => {
    return [...new Set(originalData.map((item) => item.language))].map((item) => ({
      value: item,
      label: item,
    }))
  }, [])

  const handleLanguageFilter = (values) => {
    setSelectedLanguages(values?.map((item) => item.value))
  }

  const handleLinkClick = (row) => {
    setClickedRows((clickedRows) => [...new Set([...clickedRows, row.id])])
  }

  useEffect(() => {
    setSubtitleList(filterList(originalData, selectedLanguages))
  }, [selectedLanguages])

  return (
    <div className="rounded">
      <table className="w-full flex flex-row flex-no-wrap overflow-hidden">
        <thead className="border-collapse">
          {subtitleList.map((row) => (
            <tr
              className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 border border-gray-200"
              key={row.id + "thead"}
            >
              <th className="p-3 text-left border-b">
                <span>Name</span>
              </th>
              <th className="p-3 text-left border-b">
                <span>Provider</span>
              </th>
              <th className="p-3 text-left border-b">
                <span>Language</span>
              </th>
              <th className="p-3 text-left border-b">Score</th>
            </tr>
          ))}
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {subtitleList.map((row) => {
            return (
              <tr
                className={classNames(
                  clickedRows.includes(row.id) && "bg-gray-200 text-gray-400",
                  "flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border border-gray-200"
                )}
                key={row.id}
              >
                <td className="hover:bg-gray-100 p-3 border-b">
                  <a
                    href={buildUrl(row)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(row)}
                  >
                    {row.data.filename}
                  </a>
                </td>
                <td className="hover:bg-gray-100 p-3 border-b">{row.provider}</td>
                <td className="hover:bg-gray-100 p-3 border-b">{row.language}</td>
                <td className="hover:bg-gray-100 p-3 border-b">{row.data.score}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default SubsTable
