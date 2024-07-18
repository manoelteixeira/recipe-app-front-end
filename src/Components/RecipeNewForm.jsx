import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function RecipeNewForm() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    ingredients: "",
    instructions: "",
    serving: 0,
    prepare_time: 0,
    is_favorite: false,
  });

  // Add a color. Redirect to the index view.
  const addRecipe = () => {
    fetch(`${API}/recipes`, {
      method: "POST",
      body: JSON.stringify({
        ...recipe,
        ingredients: Array(recipe.ingredients.split(",")),
        instructions: Array(recipe.instructions.split(",")),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/recipes");
      })
      .catch((err) => console.log(err));
  };

  const handleTextChange = (event) => {
    setRecipe({ ...recipe, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setRecipe({ ...recipe, is_favorite: !recipe.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRecipe();
  };

  return (
    <div className="New-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          id="name"
          value={recipe.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name"
          required
        />{" "}
        <br />
        <label htmlFor="image">Image:</label> <br />
        <input
          id="image"
          value={recipe.image}
          type="text"
          onChange={handleTextChange}
          placeholder="Image url"
          required
        />{" "}
        <br />
        <label htmlFor="ingredients">Ingredients:</label> <br />
        <input
          id="ingredients"
          value={recipe.ingredients}
          type="text"
          onChange={handleTextChange}
          placeholder="ingredients"
          required
        />{" "}
        <br />
        <label htmlFor="instructions">Instructions:</label> <br />
        <input
          id="instructions"
          value={recipe.instructions}
          type="text"
          onChange={handleTextChange}
          placeholder="instructions"
          required
        />{" "}
        <br />
        <label htmlFor="serving">serving:</label> <br />
        <input
          id="serving"
          value={recipe.serving}
          type="number"
          onChange={handleTextChange}
          placeholder="serving"
          required
        />{" "}
        <br />
        <label htmlFor="prepare_time">prepare_time:</label> <br />
        <input
          id="prepare_time"
          value={recipe.prepare_time}
          type="number"
          onChange={handleTextChange}
          placeholder="prepare_time"
          required
        />{" "}
        <br />
        <label htmlFor="is_favorite">Favorite:</label> <br />
        <input
          id="is-favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={recipe.is_favorite}
        />{" "}
        <br />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={`/recipes`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default RecipeNewForm;
