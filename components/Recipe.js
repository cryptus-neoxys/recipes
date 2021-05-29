import RHead from "./recipe/RHead";
import RIng from "./recipe/RIng";
import RMethod from "./recipe/RMethod";
import Rplayer from "./recipe/Rplayer";

function Recipes({ recipe, sq }) {
  return (
    <div>
      <RHead str={recipe?.video} />
      <div className="xl:flex justify-between">
        <Rplayer str={recipe.image} />
        <RIng recipe={recipe} sq={sq} />
      </div>
      <RMethod meth={recipe.directions} />
    </div>
  );
}

export default Recipes;
