import { Component } from 'react'
import Layout from '../../src/components/layout';

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
      }, 2000);
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
      <Layout isHomePage>
        <h1 className="text-4xl font-semibold uppercase">
          Beautify JSON
        </h1>

        <p>
          Make JSON Easy to Read.
        </p>

        <div className="app mt-5 w-full h-full p-8 font-sans">
          {/* Row */}
          <div className="row sm:flex">
            {/* Col Left */}
            <div className="col sm:w-1/2">
              <div className="box border rounded flex flex-col shadow bg-white box-height">
                <div className="box__title bg-grey-lighter px-3 py-2 border-b">
                  <h3 className="text-sm text-grey-darker font-medium">Source</h3>
                </div>
                <textarea className="resize-none border rounded text-grey-darkest flex-1 p-2 m-1 bg-transparent" name="source" value={this.state.source} onChange={this.handleChange} />
              </div>
            </div>
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
          <div className={`${this.state.showError ? 'sm:flex' : 'hidden'} row mt-3`}>
            <div className="col sm:w-1/2 mx-auto">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Holy smokes! </strong>
                <span className="block sm:inline">You've entered invalid JSON.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
              </div>
            </div>
          </div>

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
