import Link from 'next/link'
import Layout from '@components/layout';
import { tools } from '@constants/tools';

const Home = () => (
  <Layout
    title='Welcome to I ❤️ JSON'
    description='One place to find all tool to work with {JSONs}'
    >
    <div className="grid">
      {tools.map(({ from, to, description, slug }) => (
        <div className="card bg-white shadow rounded" key={slug}>
          <Link href={`/${slug}`} as={slug}>
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
