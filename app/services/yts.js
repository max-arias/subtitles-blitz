const { crawl } = require("../../../crawlers/yts")

const getSubs = async (imdbId) => {
  return await crawl(imdbId)
}

module.exports = {
  getSubs,
}
