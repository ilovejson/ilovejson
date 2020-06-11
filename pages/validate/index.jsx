import { useState, useRef } from 'react'
import Layout from '@components/layout';
import SourceEditor from '@components/source';
import { parse } from '@prantlf/jsonlint';

const Validator = () => {
  const [sourceJSON, setSourceJSON] = useState('');
  const [outputJSON, setOutputJSON] = useState('');
  const [copied, setCopied] = useState(false);
  const textArea = useRef('');

  const handleChange = (event) => {
    setSourceJSON(event.target.value);
  };

  const handleValidate = (event) => {
    event.preventDefault();
    try {
      parse(sourceJSON);
    } catch (e) {
      const { message } = e;
      setOutputJSON(message);
    }
  }

  const copyCodeToClipboard = (event) => {
    textArea.current.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Layout
      title='JSON Validator'
      description='Validate your JSON right away.'
    >

      <div className="app mt-5 w-full h-full p-8 font-sans">
        {/* Row */}
        <div className="row sm:flex">
          {/* Col Left */}
          <SourceEditor>
            <textarea className="resize-none border rounded text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="source" value={sourceJSON} onChange={handleChange} />
          </SourceEditor>

          {/* Col Right */}
          <div className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white box-height">
              <div className="box__title bg-grey-lighter px-3 py-2 border-b">
                <h3 className="text-sm text-grey-darker font-medium inline-flex">Output</h3>
                <button className="py-1 px-4 shadow no-underline rounded-sm bg-green-400 text-white font-sans font-semibold text-xs border-green-600 btn-primary hover:text-white hover:bg-green-600 focus:outline-none active:shadow-none float-right" onClick={copyCodeToClipboard} disabled={!outputJSON}>Copy</button>
                <span className={`mr-2 text-xs text-green-400 float-right align-middle ${copied ? 'visible' : 'invisible'}`}>Copied to Clipboard!</span>
              </div>
              <textarea className="resize text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="output" value={outputJSON} ref={textArea} onChange={() => {}} />
            </div>
          </div>
        </div>

        {/* Row */}
        <div className="row sm:flex mt-5">
          <button className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto ${(!sourceJSON) ? 'disabled:opacity-75' : ''}`} onClick={handleValidate} disabled={!sourceJSON}>
            <span>Validate</span>
          </button>
        </div>

      </div>
    </Layout>
  )
}

export default Validator
