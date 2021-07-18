"use strict"

// const rp = require('request-promise');
// const cheerio = require('cheerio');

// const CountryUtils = require('../Utils/CountryUtils');

const SUBSCENE_URL = "https://subscene.com"

class SubSceneService {
  static async getSubs(term, imdb_id) {
    if (!term) {
      return false
    }

    const urlTerm = encodeURIComponent(term)
    const url = `${SUBSCENE_URL}/subtitles/title?q=${urlTerm}&l=`

    const siteHtml = await rp(url)
    const $ = cheerio.load(siteHtml)

    // // We're only going to go for the first match.
    // // We might leave out some results, but the first one should be the most likely
    const titleMatch = $("#left > div > div > ul:nth-child(2) > li:nth-child(1) > div.title > a")

    if (titleMatch.length) {
      const titleText = titleMatch.text()
      const titleHref = titleMatch.attr("href")

      const subsListUrl = `${SUBSCENE_URL}${titleHref}`
      const siteMatchSubtitleListHtml = await rp(subsListUrl)

      const $ = cheerio.load(siteMatchSubtitleListHtml)

      const subtitleTds = $(
        "#content > div.subtitles.byFilm > div.content.clearfix > table:nth-child(3) > tbody > tr > td.a1"
      )

      const formatted_subs = []
      subtitleTds.each((i, el) => {
        const tdHref = $(el).find("a").attr("href")
        const tdLang = $(el).find("a span.l").text().trim()

        formatted_subs.push({
          language: CountryUtils.getCodeFromName(tdLang),
          url: `${SUBSCENE_URL}${tdHref}`,
          imdb_id: imdb_id,
          site: "subscene",
        })
      })

      return formatted_subs
    }

    return false
  }
}

module.exports = SubSceneService
