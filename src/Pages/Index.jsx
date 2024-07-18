import Recipes from "../Components/Recipes";
import { Link } from "react-router-dom";

function Index() {
    return (
        <div className="Index">
            <Recipes />
            <Link to={`/`}>
                <button>Back</button>
            </Link>
        </div>
    );
}

export default Index;
