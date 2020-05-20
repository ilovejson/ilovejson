import Link from 'next/link'
import Nav from '../src/components/nav';
import Footer from '../src/components/footer';

const Home = () => (
  <div className="container">
    <Nav />

    <main>
      <h1 className="title">
        Welcome to I ❤️ JSON
      </h1>

      <p className="description">
        One place to find all tool to work with <code>{`{JSONs}`}</code>
      </p>

      <div className="grid">
        {/* JSON-CSV-JSON */}
        <Link href="/upload">
        <a className="card">
          <h3>JSON &rarr; CSV</h3>
          <p>Make JSON files easy to read by converting them to CSV.</p>
        </a>
        </Link>

        <a href="#csv-to-json" className="card">
          <h3>CSV &rarr; JSON</h3>
          <p>Make CSV files easy to read by converting them to JSON.</p>
        </a>

        {/* JSON-YAML-JSON */}
        <a href="#yaml-to-json" className="card">
          <h3>YAML &rarr; JSON</h3>
          <p>Make YAML files easy to read by converting them to JSON.</p>
        </a>

        <a href="#json-to-yaml" className="card">
          <h3>JSON &rarr; YAML</h3>
          <p>Make JSON files easy to read by converting them to YAML.</p>
        </a>

        {/* JSON-XML-JSON */}
        <a href="#xml-to-json" className="card">
          <h3>XML &rarr; JSON</h3>
          <p>Make XML files easy to read by converting them to JSON.</p>
        </a>

        <a href="#json-to-xml" className="card">
          <h3>JSON &rarr; XML</h3>
          <p>Make JSON files easy to read by converting them to XML.</p>
        </a>

        {/* JSON-SQL-JSON */}
        <a href="#sql-to-json" className="card">
          <h3>SQL &rarr; JSON</h3>
          <p>Make SQL files easy to read by converting them to JSON.</p>
        </a>

        <a href="#json-to-sql" className="card">
          <h3>JSON &rarr; SQL</h3>
          <p>Make JSON files easy to read by converting them to SQL.</p>
        </a>

        {/* JSON-TABLE-JSON */}
        <a href="#table-to-json" className="card">
          <h3>HTML &rarr; JSON</h3>
          <p>Make HTML TABLE files easy to read by converting them to JSON.</p>
        </a>

        <a href="#json-to-table" className="card">
          <h3>JSON &rarr; HTML</h3>
          <p>Make JSON files easy to read by converting them to HTML TABLE.</p>
        </a>

        {/* JSON-ARRAY-JSON */}
        <a href="#array-to-json" className="card">
          <h3>ARRAY &rarr; JSON</h3>
          <p>Make ARRAY files easy to read by converting them to JSON.</p>
        </a>

        <a href="#json-to-array" className="card">
          <h3>JSON &rarr; ARRAY</h3>
          <p>Make JSON files easy to read by converting them to ARRAY.</p>
        </a>

      </div>
    </main>

    <Footer />
  </div>
)

export default Home
