
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Layout from '@components/layout';
import SourceEditor from '@components/source';

const Viewer = () => {
  // Note : We need to do dynamic loading of component, issue ref
  // https://github.com/mac-s-g/react-json-view/issues/121#issuecomment-437267883
  const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

  const [sourceJSON, setSourceJSON] = useState('{"store":{"book":[{"category":"reference","author":"Nigel Rees","title":"Sayings of the Century","price":8.95},{"category":"fiction","author":"Evelyn Waugh","title":"Sword of Honour","price":12.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}],"bicycle":{"color":"red","price":19.95}}}');

  const [outputJSON, setOutputJSON] = useState({"store":{"book":[{"category":"reference","author":"Nigel Rees","title":"Sayings of the Century","price":8.95},{"category":"fiction","author":"Evelyn Waugh","title":"Sword of Honour","price":12.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}],"bicycle":{"color":"red","price":19.95}}});

  const handleChange = (e) => {
    setSourceJSON(e.target.value);
    try {
      if (JSON.parse(sourceJSON) && !!sourceJSON) {
        setOutputJSON(JSON.parse(sourceJSON));
      }
    } catch (e) {
      return false
    }
  }

  const updateSource = (evt) => {
    setSourceJSON(JSON.stringify(evt.updated_src, null, 4));
  }

  return (
    <Layout
      title='JSON Viewer'
      description='Make JSON Easy to Read.'
      >

      <div className="app mt-5 w-full h-full p-8 font-sans">
        {/* Row */}
        <div className="row sm:flex">
          {/* Col Left */}
          <SourceEditor>
            <textarea className="resize-none border rounded text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="source" value={sourceJSON} onPaste={handleChange} onInput={handleChange} />
          </SourceEditor>

          {/* Col Right */}
          <div className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white box-height">
              <div className="box__title bg-grey-lighter px-3 py-2 border-b">
                <h3 className="text-sm text-grey-darker font-medium inline-flex">Output</h3>
              </div>
              <DynamicReactJson name='ilovejson' onAdd={updateSource} onEdit={updateSource} onDelete={updateSource} src={outputJSON} theme='shapeshifter:inverted' displayDataTypes />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Viewer;
