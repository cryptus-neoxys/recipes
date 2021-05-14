import RHead from "./recipe/RHead";
import RIng from "./recipe/RIng";
import RMethod from "./recipe/RMethod";
import Rplayer from "./recipe/Rplayer";

function Recipe({recipe, sq}) {
    return (
        <div>
            <RHead str = {recipe.video}/>
            <div className="xl:flex">
                <Rplayer/>
                <RIng recipe = {recipe} sq={sq}/>
            </div>
            <RMethod meth = {recipe.directions}/>
        </div>
    )
}

export default Recipe
