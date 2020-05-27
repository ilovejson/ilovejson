const SourceEditor = ({
  children
}) => (
  <div className="col sm:w-1/2">
    <div className="box border rounded flex flex-col shadow bg-white box-height">
      <div className="box__title bg-grey-lighter px-3 py-2 border-b">
        <h3 className="text-sm text-grey-darker font-medium">Source</h3>
      </div>
      {children}
    </div>
  </div>
)

export default SourceEditor
