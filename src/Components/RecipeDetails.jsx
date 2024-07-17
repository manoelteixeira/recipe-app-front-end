import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function RecipeDetails() {
    const [recipe, setRecipe] = useState({ name: "" });

    let navigate = useNavigate();
    let { id } = useParams();

    // On page load, load color details
    useEffect(() => {
        fetch(`${API}/recipes/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setRecipe(res)
            })
            .catch(err => console.log(err))
    }, [])
    // Be able to delete a color. Return to index view.
    const handleDelete = () => {
        fetch(`${API}/songs/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(res => {
                navigate("/songs")
            })
            .catch(err => console.log(err))
    };

    return (
        <article className="show-page">
            <p>Name: {recipe.name}</p>
            <p>Image: {recipe.image}</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Instructions:{recipe.instructions}</p>
            <p>Serving: {recipe.serving}</p>
            <p>Prepare_time: {recipe.prepare_time}</p>
            <p>Favorite: {recipe.is_favorite ? "⭐️" : null}</p>


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

export default RecipeDetails;
