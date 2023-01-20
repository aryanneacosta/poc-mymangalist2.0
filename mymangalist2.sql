--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 14.4

-- Started on 2023-01-20 00:30:57

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

--
-- TOC entry 539 (class 1247 OID 163842)
-- Name: genre_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.genre_type AS ENUM (
    'shounen',
    'shoujo',
    'seinen',
    'josei'
);


ALTER TYPE public.genre_type OWNER TO postgres;

--
-- TOC entry 630 (class 1247 OID 163860)
-- Name: rating_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rating_type AS ENUM (
    'empty',
    '0.0',
    '1.0',
    '2.0',
    '3.0',
    '4.0',
    '5.0'
);


ALTER TYPE public.rating_type OWNER TO postgres;

--
-- TOC entry 542 (class 1247 OID 163852)
-- Name: status_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_type AS ENUM (
    'unread',
    'reading',
    'read'
);


ALTER TYPE public.status_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 163877)
-- Name: series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    author character varying(50) NOT NULL,
    genre public.genre_type NOT NULL,
    image character varying(500)
);


ALTER TABLE public.series OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 163875)
-- Name: series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_id_seq OWNER TO postgres;

--
-- TOC entry 2959 (class 0 OID 0)
-- Dependencies: 202
-- Name: series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.series_id_seq OWNED BY public.series.id;


--
-- TOC entry 205 (class 1259 OID 163888)
-- Name: volumes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.volumes (
    id integer NOT NULL,
    serie_id integer NOT NULL,
    status public.status_type DEFAULT 'unread'::public.status_type NOT NULL,
    image character varying(500),
    read_chapters integer DEFAULT 0,
    total_chapters integer NOT NULL,
    rating public.rating_type DEFAULT 'empty'::public.rating_type NOT NULL,
    description character varying(500) DEFAULT 'empty'::character varying NOT NULL,
    number integer NOT NULL
);


ALTER TABLE public.volumes OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 163886)
-- Name: volumes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.volumes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.volumes_id_seq OWNER TO postgres;

--
-- TOC entry 2960 (class 0 OID 0)
-- Dependencies: 204
-- Name: volumes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.volumes_id_seq OWNED BY public.volumes.id;


--
-- TOC entry 2813 (class 2604 OID 163880)
-- Name: series id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN id SET DEFAULT nextval('public.series_id_seq'::regclass);


--
-- TOC entry 2814 (class 2604 OID 163891)
-- Name: volumes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volumes ALTER COLUMN id SET DEFAULT nextval('public.volumes_id_seq'::regclass);


--
-- TOC entry 2951 (class 0 OID 163877)
-- Dependencies: 203
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (id, name, author, genre, image) FROM stdin;
1	SPYxFAMILY	Tatsuya Endo	shounen	https://m.media-amazon.com/images/I/71RPJe1eVCL.jpg
2	Attack on Titan	Eren Yeager	seinen	https://m.media-amazon.com/images/I/71RPJe1eVCL.jpg
\.


--
-- TOC entry 2953 (class 0 OID 163888)
-- Dependencies: 205
-- Data for Name: volumes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.volumes (id, serie_id, status, image, read_chapters, total_chapters, rating, description, number) FROM stdin;
2	2	unread	https://m.media-amazon.com/images/I/71RPJe1eVCL.jpg	0	10	empty	empty	2
4	1	unread	reading	0	10	empty	empty	1
3	1	reading	reading	2	10	empty	empty	1
5	2	read	reading	10	10	1.0	muito legal	1
\.


--
-- TOC entry 2961 (class 0 OID 0)
-- Dependencies: 202
-- Name: series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_id_seq', 2, true);


--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 204
-- Name: volumes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.volumes_id_seq', 5, true);


--
-- TOC entry 2820 (class 2606 OID 163885)
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- TOC entry 2822 (class 2606 OID 163898)
-- Name: volumes volumes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volumes
    ADD CONSTRAINT volumes_pkey PRIMARY KEY (id);


--
-- TOC entry 2823 (class 2606 OID 163899)
-- Name: volumes volumes_serie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volumes
    ADD CONSTRAINT volumes_serie_id_fkey FOREIGN KEY (serie_id) REFERENCES public.series(id);


-- Completed on 2023-01-20 00:30:57

--
-- PostgreSQL database dump complete
--

