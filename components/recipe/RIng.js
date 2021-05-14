function RIng({recipe, sq}) {
    const items=[]
    for (const [index,value] of recipe.ingredients.entries()) {
        var a = '/wbull.svg'
        for (const [kindex,kvalue] of sq.entries()) {
            if (value.includes(kvalue)) {
                a = '/gbull.svg'
                break
            }
        }
        items.push(
            <div key = {index} className="flex space-x-2">
                <img src={a} className="mr-5"/>
                <p>{value.split(',')[0]}</p>
                <p className='text-[#AC5A2B] opacity-75'>{value.split(',')[1]}</p>
            </div>
        )
      }
    return (
        <div className="px-5 my-10 text-lg font-medium">
            <div className="space-y-10 min-h-lg w-auto max-w-lg bg-white lg:ml-72 rounded-2xl px-14 py-10">
               <div className="flex">
                   <img src="/timer.svg" className="mr-1"/>
                   <Det asd= "Prep" value = {recipe.prepTime}/>
                   <Det asd= "Cook" value = {recipe.cookTime}/>
                   {/* <Det asd= "Total" value = {recipe.total}/> */}
               </div>
               <div className="flex">
                   <img src="/calories.svg" className="mr-1"/>
                   <Det asd= "Calories" value = {recipe.nutrition.split(' ')[0]}/>
               </div>
               <div className="flex">
                   <img src="/serves.svg" className="mr-1"/>
                   <Det asd= "Serves" value = {recipe.serves}/>
               </div>
               <h1 className="font-bold text-gray-600 tracking-widest -ml-7 text-2xl">Ingredients</h1>
               <div className='px-2 space-y-8'>
                    {items}
               </div>
            </div>
        </div>
    )
}

function Det({asd, value}){
    return(
        <div className="min-w-16 mx-4 text-md tracking-wider font-bold text-gray-600">
            <h1>
                {asd}
            </h1>
            <h2>
                {value}
            </h2>
        </div>
    )
}
export default RIng
