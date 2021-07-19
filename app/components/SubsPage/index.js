import { minutesToHours } from "app/utils/dates"
import Image from "next/image"

import IndeterminateLoader from "app/components/Loader/Indeterminate"
import SubsTable from "../SubsTable"

const SubsPage = ({ mediaData, subtitles, loading }) => {
  const renderGenres = () => {
    if (!mediaData.data.genres) {
      return null
    }

    return <p>{mediaData.data.genres.map((g) => g.name).join(" | ")}</p>
  }

  const renderImage = () => {
    let url = "http://image.tmdb.org/t/p/w154/"

    if (mediaData.data.poster_path) {
      url += mediaData.data.poster_path
    }

    if (mediaData.data.still_path) {
      url += mediaData.data.still_path
    }

    return (
      <div style={{ position: "relative", width: 154, height: 231 }}>
        <Image layout="fill" className="rounded" src={url} alt={mediaData.title} />
      </div>
    )
  }

  return (
    <div className="w-full h-screen font-sans">
      {loading ? (
        <div className="w-full flex justify-center">
          <IndeterminateLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 px-4 md:px-20 lg:px-40">
          <div className="grid grid-flow-row md:grid-flow-col auto-rols-max p-4 mb-3 md:mb-8">
            {renderImage()}
            <div className="lg:pl-8">
              <h1 className="font-bold text-4xl mb-2">{mediaData.title}</h1>
              <p>{mediaData.data.genres.map((g) => g.name).join(" | ")}</p>
              <p>{minutesToHours(mediaData.data.runtime)}</p>
              <p className="mt-2 pr-6">{mediaData.data.overview}</p>
            </div>
          </div>

          <div className="grid grid-flow-row auto-rols-max shadow-lg p-4 rounded">
            <SubsTable data={subtitles} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SubsPage
