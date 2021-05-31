function RMethod({ meth }) {
  var count = 1;
  const items = [];
  for (const [index, value] of meth.entries()) {
    items.push(
      <div key={index} className="min-h-16 flex mt-6 -ml-4">
        <div className="mt-3 h-5 transform -rotate-90 w-auto text-[#DAA61F]">
          <div>
            <h2 className="w-16 text-base">Step {count}</h2>
          </div>
        </div>
        <p className="max-w-3xl ml-4">{value}</p>
      </div>
    );
    count = count + 1;
  }
  return (
    <div className="mx-5 text-lg">
      <div className="lg:ml-28 lg:max-w-4xl rounded-2xl w-auto max-w-3xl pt-1 pb-10 bg-white">
        <h1 className="m-7 text-2xl font-bold tracking-widest text-gray-600">
          Method
        </h1>
        {items}
      </div>
    </div>
  );
}

export default RMethod;
