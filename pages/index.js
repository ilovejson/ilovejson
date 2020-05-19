import Nav from '../src/components/nav'

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
        <a href="#json-to-csv" className="card">
          <h3>JSON &rarr; CSV</h3>
          <p>Make JSON files easy to read by converting them to CSV.</p>
        </a>

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

    <footer>
      Made with ❤️in India🇮🇳
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      main {
        padding: 1.5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      footer {
        width: 100%;
        height: 50px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      footer img {
        margin-left: 0.5rem;
      }
      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      .title a {
        color: #0070f3;
        text-decoration: none;
      }
      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }
      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }
      .title,
      .description {
        text-align: center;
      }
      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }
      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }
      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 100%;
        margin-top: 3rem;
      }
      .card {
        margin: 0.5rem;
        flex-basis: 20%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }
      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }
      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }
      .card p {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.5;
        color: #636161;
      }
      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }
      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
