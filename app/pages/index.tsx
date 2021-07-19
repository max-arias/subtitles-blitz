import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Search from "app/components/Search"

const Home: BlitzPage = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 font-sans ">
      <Search />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
