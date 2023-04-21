-- set extensions 
CREATE extension if not exists "uuid-ossp";

-- create tables
CREATE TABLE meal (
    meal_id INTEGER PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE cuisine (
    cuisine_id INTEGER PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER PRIMARY KEY,
	description VARCHAR ( 50 ) NOT NULL
);


CREATE TABLE reward (
	reward_id INTEGER PRIMARY KEY,
	reward_type VARCHAR ( 50 ),
	point_needed INTEGER

);

CREATE TABLE notification (
	notification_id INTEGER PRIMARY KEY,
	message VARCHAR (100) NOT NULL,
	date DATE NOT NULL
);


CREATE TABLE "user" (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id INTEGER,
	name VARCHAR ( 255 ) NOT NULL,
	username VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
	FOREIGN KEY(role_id)
		REFERENCES role(role_id)
);

CREATE TABLE point (
	points_earned INTEGER ,
	user_id uuid ,
	FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);


CREATE TABLE food (
    food_id INTEGER PRIMARY KEY,
    cuisine_id INTEGER,
	meal_id INTEGER,
	name VARCHAR ( 50 ),
	cost INTEGER,
	date_added DATE,
	FOREIGN KEY(cuisine_id)
		REFERENCES cuisine(cuisine_id),
	FOREIGN KEY(meal_id)
		REFERENCES meal(meal_id)
);

CREATE TABLE wastage (
	wastage_id INTEGER PRIMARY KEY,
	date DATE,
	food_waste_amount DECIMAL(5,2),
 	food_id INTEGER,
	FOREIGN KEY (food_id) REFERENCES food(food_id)
);


CREATE TABLE rating (
	food_rating DECIMAL(3,2) NOT null,
	food_id INTEGER,
	user_id uuid,
	FOREIGN KEY(food_id)
	REFERENCES food(food_id),
	FOREIGN KEY(user_id)
	REFERENCES "user"(user_id)
);


CREATE TABLE preference (
    user_id uuid,
    meal_id INTEGER,
    date DATE,
	food_id INTEGER,
    PRIMARY KEY(user_id, meal_id, date),
	FOREIGN KEY(user_id)
		REFERENCES "user"(user_id),
	FOREIGN KEY(meal_id)
		REFERENCES meal(meal_id),
	FOREIGN KEY(food_id)
		REFERENCES food(food_id)
);


CREATE TABLE food_of_the_day(
	date DATE,
	food_id INTEGER,
	meal_id INTEGER,
	PRIMARY KEY(date,food_id, meal_id),
	FOREIGN KEY(food_id)
		REFERENCES food(food_id),
	FOREIGN KEY(meal_id)
		REFERENCES meal(meal_id)
);



