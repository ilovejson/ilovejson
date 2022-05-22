import Link from 'next/link'
import Layout from '@components/layout';
import { tools } from '@constants/tools';

const Home = () => (
  <Layout
    title='Welcome to I ❤️ JSON'
    description='One place to find all tool to work with {JSONs}'
  >
    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 my-4 mx-4 shadow-md w-6/12" role="alert">
      <div className="flex">
        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
        <div>
          <p className="font-bold">Data Retention Policy</p>
          <p className="text-sm">Your files will be deleted from server every 2 minutes.</p>
        </div>
      </div>
    </div>
    <div className="grid">
      {tools.map(({ from, to, description, slug }) => (
        <div className="card bg-white shadow rounded" key={slug}>
          <Link href='/[slug]' as={`/${slug}`}>
            <a>
              <h3 className="font-medium">{from} &rarr; {to}</h3>
              <p>{description}</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
)

export default Home
