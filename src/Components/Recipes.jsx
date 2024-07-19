import { useState, useEffect } from "react";
import Recipe from "./Recipe";

const API = import.meta.env.VITE_BASE_URL;

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [seach, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/recipes`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setRecipes(responseJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === "all") return true;
    if (filter === "true") return recipe.is_favorite;
    if (filter === "false") return !recipe.is_favorite;
    return true;
  });

  const handleChange = (event) => {
    setSearch((prevState) => event.target.value);
  };
  const handleSearch = () => {
    fetch(`${API}/recipes?ingredients=${seach.replaceAll(" ", "+")}`)
      .then((res) => res.json())
      .then((res) => setRecipes(res))
      .catch((err) => console.error(err));
  };

  const sortedRecipes = filteredRecipes.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.prepare_time - b.prepare_time;
    }
  });

  return (
    <div className="Recipes">
      <label>
        Filter:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="true">Favorite</option>
          <option value="false">No Favorite</option>
        </select>
      </label>
      <label>
        Sort By:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="prepare time">Prepare Time</option>
        </select>
      </label>
      <input
        type="text"
        id={seach}
        value={seach}
        onChange={handleChange}
        placeholder="Seach by Ingredients"
      />
      <button onClick={handleSearch}>Search</button>
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Serving</th>
              <th>Prepare Time</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecipes.map((recipe) => {
              return <Recipe key={recipe.id} recipe={recipe} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Recipes;
