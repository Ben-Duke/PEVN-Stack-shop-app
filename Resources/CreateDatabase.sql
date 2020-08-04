CREATE TABLE public.customer(
    customer_id INT NOT NULL,
    customer_fname VARCHAR(20),
    customer_lname VARCHAR(20),
    customer_gender CHAR(1),
    customer_tel VARCHAR(20),
    customer_email VARCHAR(30),
    customer_dateJoined DATE,
    address_id INT,
    PRIMARY KEY(customer_id));

CREATE TABLE public.address(
    address_id INT NOT NULL,
    customer_street VARCHAR(30),
    customer_town VARCHAR(30),
    customer_postcode CHAR(7),
    PRIMARY KEY(address_id));
ALTER TABLE public.address
    OWNER to postgres;

ALTER TABLE public.customer
	ADD CONSTRAINT address_id FOREIGN KEY(address_id)  REFERENCES public.address(address_id),
    OWNER to postgres;

CREATE TABLE public.product(
    product_id INT NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_name VARCHAR(20),
    product_season VARCHAR(15),
    product_price NUMERIC(4,2), 
    product_origin VARCHAR(15),
    product_type VARCHAR(15),
    product_inStock BOOLEAN,

    PRIMARY KEY(product_id));
ALTER TABLE public.product
    OWNER to postgres;

CREATE TABLE public.orders(
    order_id INT NOT NULL,
    customer_id INT,
    employee_id INT,
    product_name VARCHAR(20),
    quantity INT,
    order_date TIMESTAMP,
    PRIMARY KEY(order_id));
ALTER TABLE public.orders
    OWNER to postgres;
	
CREATE TABLE customer_orders(
customer_id INT,
order_id INT,
PRIMARY KEY(customer_id,order_id));
ALTER TABLE public.orders
	ADD CONSTRAINT customer_id FOREIGN KEY(customer_id)  REFERENCES customer(customer_id),
	ADD CONSTRAINT order_id FOREIGN KEY(order_id)  REFERENCES orders(order_id),
    OWNER to postgres;

