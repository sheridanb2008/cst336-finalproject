# cst336-finalproject
For the shopping cart I was thinking that these need to be added to the sql table


CREATE TABLE shopping_cart (
`orderID` int(11),
`product_id` int(11),
`year` int(4) NOT NULL,
`manufacturer` varchar(255) NOT NULL,
`model` varchar(255) NOT NULL,
`serialNumber` varchar(100) NOT NULL,
`imageURL` varchar(255) NOT NULL,
`price` int(11) NOT NULL,
CONSTRAINT shopping_cart_fk_order_status
		FOREIGN KEY (orderID)
        REFERENCES order_status (id),
CONSTRAINT shopping_cart_fk_aircraft
		FOREIGN KEY (product_id)
        REFERENCES aircraft (id)
);

With this section of code that adds a year, make, model, serialNumber, and price to the table. 

The insert statement that should work is: 
INSERT `year`, `manufacturer`, `model`, `serialNumber`, `imageURL`, `price` INTO `shopping_cart` WHERE `serialNumber` = ?;

I feel as though the only different piece of info between all of the planes is the serial number. Using it we should be
able to insert the right plane into the cart without any hassel. 


Then when displaying the cart for the person to review the select statement should be: 
SELECT `year`,`manufacturer`,`model`,`serialNumber`, `imageURL`, `price` FROM `shopping_cart`;

On the shoppingCart page the url should be layed out similar to the adminList. 


This should display all of the necessary information...
SIDE: 

I am not quite sure if we should add the total to this table or not. 