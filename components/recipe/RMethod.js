function RMethod({meth}) {
    var count = 1 
    const items =[]
    for (const [index,value] of meth.entries()) {
        items.push(
            <div className="flex mt-6 min-h-16 -ml-4">
                <div className="mt-3 h-5 transform -rotate-90 w-auto text-[#DAA61F]">
                    <div>
                        <h2 className="w-16 text-base">Step {count}</h2>
                    </div>
                </div>
                <p className="ml-4 max-w-3xl">{value}</p>
            </div>
        )
        count = count +1
      }
    return (
        <div className="mx-5 text-lg xl:-mt-96">
            <div className="w-auto max-w-3xl bg-white lg:ml-28 lg:max-w-4xl rounded-2xl pt-1 pb-10">
                <h1 className="m-7 text-2xl font-bold text-gray-600 tracking-widest">Method</h1>
                {items}
            </div>
        </div>
    )
}

export default RMethod
