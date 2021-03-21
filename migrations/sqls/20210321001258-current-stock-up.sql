CREATE TABLE current_stock(
  id SERIAL PRIMARY KEY, 
  ingredient_name CITEXT, 
  quantity INT, 
  unit TEXT
);