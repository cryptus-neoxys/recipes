import RHead from "./recipe/RHead";
import RIng from "./recipe/RIng";
import RMethod from "./recipe/RMethod";
import Rplayer from "./recipe/Rplayer";

function Recipes({ recipe, sq }) {
  return (
    <div>
      <RHead str={recipe.name} />
      <div className="xl:flex justify-between">
        <Rplayer str={recipe.image} directions={recipe.directions} />
        <RIng recipe={recipe} sq={sq} />
      </div>
    </div>
  );
}

export default Recipes;
