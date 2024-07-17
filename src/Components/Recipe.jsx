import { Link } from "react-router-dom";


function Recipe({ recipe }) {

    return (
        <tr>
            <td> <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link></td>
            <td> {recipe.image}</td>
            <td>{recipe.serving}</td>
            <td>{recipe.prepare_time}</td>
            <td>{song.is_favorite ? "⭐️" : " "}</td>

        </tr>
    );
}

export default Song;
