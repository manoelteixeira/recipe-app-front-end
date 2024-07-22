import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function RecipeDetails() {
  const [recipe, setRecipe] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/recipes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setRecipe(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    fetch(`${API}/recipes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/recipes");
      })
      .catch((err) => console.log(err));
  };
  if (loading) {
    <article className="show-page">
      <p className="show-page__title">Loading</p>
    </article>;
  } else {
    return (
      <article className="show-page">
        <p className="show-page__title">{recipe.name}</p>
        <img src={recipe.image} width={"200px"} />
        <div className="show-page__ingredients">
          <p>Ingredients:</p>
          <ul>
            {recipe.ingredients.map((item) => (
              <li key={crypto.randomUUID()}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="show-page__instructions">
          <p>Instructions:</p>
          <ul>
            {recipe.instructions.map((item) => (
              <li key={crypto.randomUUID()}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="show-page__subtitle">
          Serving: <span>{recipe.serving}</span>
        </p>
        <p className="show-page__subtitle">
          Prepare Time: <span>{recipe.prepare_time}</span>
        </p>
        <p className="show-page__subtitle">
          Favorite: <span>{recipe.is_favorite ? "🌟" : "🚫"}</span>
        </p>

        <div className="showNavigation">
          <div>
            <Link to={`/recipes`}>
              <button>Back</button>
            </Link>
          </div>
          <div>
            <Link to={`/recipes/${id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </article>
    );
  }
}

export default RecipeDetails;
