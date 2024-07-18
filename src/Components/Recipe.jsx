import { Link } from "react-router-dom";


function Recipe({ recipe }) {

    return (
        <tr>
            <td> <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link></td>
            <td> <img src={recipe.image} width={'200px'} /></td>
            <td>{recipe.serving}</td>
            <td>{recipe.prepare_time}</td>
            <td>{recipe.is_favorite ? "⭐️" : " "}</td>

        </tr>
    );
}

export default Recipe;
