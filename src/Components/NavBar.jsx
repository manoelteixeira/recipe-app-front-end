import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav >
            <h1 className="Recipe">
                <Link to="/recipes">Recipes</Link>
            </h1>
            <button className="New-recipe">
                <Link to="/recipes/new">New Recipe</Link>
            </button>
        </nav>
    );
}
