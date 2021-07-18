// import { crawl } from '../../../crawlers/yifysubtitles';

//TODO: Get these from the DB, not from crawling directly
const getSubs = async (imdb) => {
  const results = await crawl(imdb)
  return results.subs
}

module.exports = {
  getSubs,
}
