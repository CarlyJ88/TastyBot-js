# README

<!-- add a shopping list which will add item to current stock when ticked off -->
<!-- when item it used from current stock ask if I want to add it to shopping list and if yes add it if not put it in the waiting pile of shopping list -->
<!-- add best buy/use buy date to the ingredient so I know how fast I should use it up -->
<!-- add a how much product is left state and also need to figure out a way to add an item to the shopping list when there is still some left so it needs to appear in current stock and shopping list if I want to buy it again immediately -->
<!-- order list of ingredients into categories and I can add ingredient to that category like fruit, veg, grains, pulses, condiments... -->

### How to migrate the database

First created an environmental variable for your username (`DB_USER`) and password (`DB_PASSWORD`).

## How to migrate the database

Run `npm i`.

Edit `database.json` file and `db.ts` to refer to your user name (and add password if necessary).

Run `db-migrate create ` + filename + ` --sql-file` to create a migration.

Run `db-migrate up` to initialize the database.

Run `db-migrate down` to drop the table.

<!-- {"ENV":"DB_USER"} -->
<!-- "password": {"ENV":"DB_PWD"}, -->

# To run docker

Type `docker compose up` followed by `psql -h localhost -U postgres` with password as `password`.
Type `lsof -i tcp:5432` to check what is running on the port.
If there is already something running on the port, run `kill -9` + `process name` to kill what is running on the port.
