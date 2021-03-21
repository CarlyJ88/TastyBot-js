CREATE TABLE cuisine(
  id SERIAL PRIMARY KEY, 
  cuisine_name CITEXT
);

CREATE TABLE recipe(
  id SERIAL PRIMARY KEY, 
  author_id INT, 
  recipe_name CITEXT, 
  picture TEXT, 
  recipe_description TEXT, 
  method TEXT, 
  cuisine_id INT, 
  CONSTRAINT fk_cuisine_id 
  FOREIGN KEY(cuisine_id) 
  REFERENCES cuisine(id), 
  CONSTRAINT fk_author_id 
  FOREIGN KEY(author_id) 
  REFERENCES users(id)
);

CREATE TABLE recipe_ingredients(
  id SERIAL PRIMARY KEY, 
  ingredient_name CITEXT, 
  quantity INT, 
  unit TEXT, 
  recipe_id INT, 
  CONSTRAINT fk_recipe_id 
  FOREIGN KEY(recipe_id) 
  REFERENCES recipe(id)
);
