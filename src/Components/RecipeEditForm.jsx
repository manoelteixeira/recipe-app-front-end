import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function RecipeEditForm() {
  let { id } = useParams();
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

  const handleTextChange = (event) => {
    setRecipe({ ...recipe, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setRecipe({ ...recipe, is_favorite: !recipe.is_favorite });
  };

  const updateRecipe = () => {
    const ingredients =
      typeof recipe.ingredients == "string"
        ? recipe.ingredients.split(",")
        : recipe.ingredients;
    const instructions =
      typeof recipe.instructions == "string"
        ? recipe.instructions.split("\n")
        : recipe.instructions;
    fetch(`${API}/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...recipe,
        ingredients: ingredients,
        instructions: instructions,
        serving: Number(recipe.serving),
        prepare_time: Number(recipe.prepare_time),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigate(`/recipes/${id}`);
      })
      .catch((err) => console.log(err));
  };

  // On page load, fill in the form with the color data.
  useEffect(() => {
    fetch(`${API}/recipes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setRecipe(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe();
  };

  return (
    <div className="Edit-page">
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
        <textarea
          id="ingredients"
          value={recipe.ingredients}
          type="text"
          onChange={handleTextChange}
          placeholder="ingredients"
          required
        ></textarea>{" "}
        <br />
        <label htmlFor="instructions">Instructions:</label> <br />
        <textarea
          id="instructions"
          value={recipe.instructions}
          type="text"
          onChange={handleTextChange}
          placeholder="instructions"
          required
        ></textarea>{" "}
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
      <Link to={`/recipes/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default RecipeEditForm;
