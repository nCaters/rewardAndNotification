-- Cuisine
Insert into cuisine values(1,'Chinese');
Insert into cuisine values(2,'Western');
Insert into cuisine values(3,'Indian');
Insert into cuisine values(4,'Muslim');
Insert into cuisine values(5,'Vegetarian');

-- Meal
Insert into meal values(1,'Breakfast');
Insert into meal values(2,'Lunch');
Insert into meal values(3,'Dinner');

-- Food
Insert into food values(1, 2, 2, 'Pork Chop', '5', CURRENT_DATE);
Insert into food values(2, 1, 2, 'Wonton Noodle', '3', CURRENT_DATE);
Insert into food values(3, 3, 2, 'Prata', '2', CURRENT_DATE);
Insert into food values(4, 4, 2, 'Nasi Kandar', '6', CURRENT_DATE);
Insert into food values(5, 5, 2, 'Sweet Potato', '2', CURRENT_DATE);

Insert into food values(6, 1, 1, 'Kway Tiao', '2', CURRENT_DATE);
Insert into food values(7, 2, 1, 'Pancake', '2', CURRENT_DATE);
Insert into food values(8, 3, 1, 'Roti', '1', CURRENT_DATE);
Insert into food values(9, 4, 1, 'Mee siam', '3', CURRENT_DATE);
Insert into food values(10, 5, 1, 'Porridge', '2', CURRENT_DATE);

Insert into food values(11, 1, 3, 'Xiao Long Bao', '4', CURRENT_DATE);
Insert into food values(12, 2, 3, 'Fried Chicken', '5', CURRENT_DATE);
Insert into food values(13, 3, 3, 'Masala Dosa', '4', CURRENT_DATE);
Insert into food values(14, 4, 3, 'Mee Bakso', '3', CURRENT_DATE);
Insert into food values(15, 5, 3, 'ABC soup', '2', CURRENT_DATE);


select * from food

-- preference;
Insert into preference values('2', 2, CURRENT_DATE, 2);
Insert into preference values('3', 2, CURRENT_DATE, 3);
Insert into preference values('4', 2, CURRENT_DATE, 3);
Insert into preference values('5', 2, CURRENT_DATE, 1);

select * from preference p where meal_id  = 2;


