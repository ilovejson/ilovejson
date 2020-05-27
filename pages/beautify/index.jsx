import { Component } from 'react'
import Layout from '@components/layout';
import AlertError from '@components/error';
import SourceEditor from '@components/source';

class Beautify extends Component {
  constructor (props) {
    super(props);
    this.state = {
      source: '',
      output: '',
      showError: false,
      copied: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ source: event.target.value });
  }

  // Sample JSON: {"foo": "bar", "lorem": true, "numb": 1}
  handleSubmit(event) {
    event.preventDefault();
    const str = this.state.source;
    try {
      if (JSON.parse(str) && !!str) {
        const outputx = JSON.stringify(JSON.parse(str), undefined, 4);
        this.setState({ output: outputx, showError: false });
      }
    } catch (e) {
      this.setState({ showError: true });
      setTimeout(() => {
        this.setState({
          showError: false
        });
      }, 5000);
      return false;
    }
  }

  copyCodeToClipboard = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({
        copied: false
      });
    }, 2000);
  }

  render() {
    return (
      <Layout
        title='Beautify JSON'
        description='Make JSON Easy to Read.'
        >

        <div className="app mt-5 w-full h-full p-8 font-sans">
          {/* Row */}
          <div className="row sm:flex">
            {/* Col Left */}
            <SourceEditor>
              <textarea className="resize-none border rounded text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="source" value={this.state.source} onChange={this.handleChange} />
            </SourceEditor>

            {/* Col Right */}
            <div className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
              <div className="box border rounded flex flex-col shadow bg-white box-height">
                <div className="box__title bg-grey-lighter px-3 py-2 border-b">
                  <h3 className="text-sm text-grey-darker font-medium inline-flex">Output</h3>
                  <button className="py-1 px-4 shadow no-underline rounded-sm bg-green-400 text-white font-sans font-semibold text-xs border-green-600 btn-primary hover:text-white hover:bg-green-600 focus:outline-none active:shadow-none float-right" onClick={this.copyCodeToClipboard} disabled={!this.state.output}>Copy</button>
                  <span className={`mr-2 text-xs text-green-400 float-right align-middle ${this.state.copied ? 'visible' : 'invisible'}`}>Copied to Clipboard!</span>
                </div>
                <textarea className="resize text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="output" value={this.state.output} ref={(textarea) => this.textArea = textarea}/>
              </div>
            </div>
          </div>

          {/* Row */}
          <AlertError message="You've entered invalid JSON." showError={this.state.showError} />

          {/* Row */}
          <div className="row sm:flex mt-5">
            <button className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto ${(!this.state.source) ? 'disabled:opacity-75' : ''}`} onClick={this.handleSubmit} disabled={!this.state.source}>
              <span>Beautify</span>
            </button>
          </div>

        </div>
      </Layout>
    )
  }
}

export default Beautify
