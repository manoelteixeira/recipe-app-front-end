import { useState, useEffect } from "react";
import Recipe from "./Recipe";

const API = import.meta.env.VITE_BASE_URL;
function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`${API}/recipes`)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                setRecipes(responseJSON);
            })
            .catch((error) => console.error(error));
    }, []);


    return (
        <div className="Recipes">
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Name </th>
                            <th>Image</th>
                            <th>Serving </th>
                            <th>prepare Time</th>
                            <th>Favorite</th>

                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => {
                            return <Recipe key={recipe.id} recipe={recipe} />;
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Recipes;
