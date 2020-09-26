--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-09-26 16:58:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16520)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    address_id integer NOT NULL,
    street character varying(30),
    town character varying(30),
    postcode character varying(30)
);


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16565)
-- Name: address_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.address ALTER COLUMN address_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.address_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16540)
-- Name: customer_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_orders (
    user_id integer NOT NULL,
    order_id integer NOT NULL,
    "Date" date
);


ALTER TABLE public.customer_orders OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24780)
-- Name: customer_orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.customer_orders ALTER COLUMN order_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customer_orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16535)
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    order_id integer NOT NULL,
    quantity integer,
    product_id integer,
    item_id integer NOT NULL
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24778)
-- Name: order_item_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.order_item ALTER COLUMN item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_item_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16530)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name character varying(20),
    product_price numeric(4,2),
    product_type character varying(15),
    description text,
    url character varying
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16555)
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.product ALTER COLUMN product_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 202 (class 1259 OID 16515)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    user_fname character varying(20),
    user_lname character varying(20),
    user_phone character varying(20),
    user_email character varying(50),
    address_id integer,
    user_password character varying(256) NOT NULL,
    token character varying(256)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16563)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2718 (class 2606 OID 16524)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- TOC entry 2714 (class 2606 OID 16519)
-- Name: user customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT customer_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2724 (class 2606 OID 24762)
-- Name: customer_orders order_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_orders
    ADD CONSTRAINT order_id PRIMARY KEY (order_id);


--
-- TOC entry 2722 (class 2606 OID 24769)
-- Name: order_item pk_item_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT pk_item_id PRIMARY KEY (item_id);


--
-- TOC entry 2720 (class 2606 OID 16534)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- TOC entry 2716 (class 2606 OID 16562)
-- Name: user user_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email UNIQUE (user_email);


--
-- TOC entry 2725 (class 2606 OID 16525)
-- Name: user address_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT address_id FOREIGN KEY (address_id) REFERENCES public.address(address_id);


--
-- TOC entry 2726 (class 2606 OID 24770)
-- Name: order_item fk_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES public.customer_orders(order_id);


--
-- TOC entry 2727 (class 2606 OID 24763)
-- Name: customer_orders fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_orders
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


-- Completed on 2020-09-26 16:58:25

--
-- PostgreSQL database dump complete
--

