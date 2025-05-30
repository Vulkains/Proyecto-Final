PGDMP      &                }            proyecto    17.5    17.5 /    S           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            T           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            U           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            V           1262    16606    proyecto    DATABASE     |   CREATE DATABASE proyecto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE proyecto;
                     postgres    false            �            1259    16684 
   categorias    TABLE     ~   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text
);
    DROP TABLE public.categorias;
       public         heap r       postgres    false            �            1259    16683    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public               postgres    false    222            W           0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public               postgres    false    221            �            1259    16702    ordenes    TABLE     �   CREATE TABLE public.ordenes (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric(10,2) NOT NULL
);
    DROP TABLE public.ordenes;
       public         heap r       postgres    false            �            1259    16701    ordenes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ordenes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ordenes_id_seq;
       public               postgres    false    226            X           0    0    ordenes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ordenes_id_seq OWNED BY public.ordenes.id;
          public               postgres    false    225            �            1259    16675 	   productos    TABLE     �   CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL
);
    DROP TABLE public.productos;
       public         heap r       postgres    false            �            1259    16674    productos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.productos_id_seq;
       public               postgres    false    220            Y           0    0    productos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;
          public               postgres    false    219            �            1259    16715 	   servicios    TABLE     �   CREATE TABLE public.servicios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL
);
    DROP TABLE public.servicios;
       public         heap r       postgres    false            �            1259    16714    servicios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.servicios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.servicios_id_seq;
       public               postgres    false    228            Z           0    0    servicios_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.servicios_id_seq OWNED BY public.servicios.id;
          public               postgres    false    227            �            1259    16693    ubicaciones    TABLE     �   CREATE TABLE public.ubicaciones (
    id integer NOT NULL,
    direccion text NOT NULL,
    ciudad character varying(100) NOT NULL
);
    DROP TABLE public.ubicaciones;
       public         heap r       postgres    false            �            1259    16692    ubicaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ubicaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ubicaciones_id_seq;
       public               postgres    false    224            [           0    0    ubicaciones_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ubicaciones_id_seq OWNED BY public.ubicaciones.id;
          public               postgres    false    223            �            1259    16666    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(100) NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16665    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    218            \           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    217            �           2604    16687    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16705 
   ordenes id    DEFAULT     h   ALTER TABLE ONLY public.ordenes ALTER COLUMN id SET DEFAULT nextval('public.ordenes_id_seq'::regclass);
 9   ALTER TABLE public.ordenes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226            �           2604    16678    productos id    DEFAULT     l   ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);
 ;   ALTER TABLE public.productos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16718    servicios id    DEFAULT     l   ALTER TABLE ONLY public.servicios ALTER COLUMN id SET DEFAULT nextval('public.servicios_id_seq'::regclass);
 ;   ALTER TABLE public.servicios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            �           2604    16696    ubicaciones id    DEFAULT     p   ALTER TABLE ONLY public.ubicaciones ALTER COLUMN id SET DEFAULT nextval('public.ubicaciones_id_seq'::regclass);
 =   ALTER TABLE public.ubicaciones ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            �           2604    16669    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            J          0    16684 
   categorias 
   TABLE DATA           =   COPY public.categorias (id, nombre, descripcion) FROM stdin;
    public               postgres    false    222   ,2       N          0    16702    ordenes 
   TABLE DATA           ?   COPY public.ordenes (id, id_usuario, fecha, total) FROM stdin;
    public               postgres    false    226   ^2       H          0    16675 	   productos 
   TABLE DATA           D   COPY public.productos (id, nombre, descripcion, precio) FROM stdin;
    public               postgres    false    220   {2       P          0    16715 	   servicios 
   TABLE DATA           D   COPY public.servicios (id, nombre, descripcion, precio) FROM stdin;
    public               postgres    false    228   �2       L          0    16693    ubicaciones 
   TABLE DATA           <   COPY public.ubicaciones (id, direccion, ciudad) FROM stdin;
    public               postgres    false    224   �2       F          0    16666    usuarios 
   TABLE DATA           6   COPY public.usuarios (id, nombre, correo) FROM stdin;
    public               postgres    false    218   43       ]           0    0    categorias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categorias_id_seq', 4, true);
          public               postgres    false    221            ^           0    0    ordenes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.ordenes_id_seq', 5, true);
          public               postgres    false    225            _           0    0    productos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.productos_id_seq', 2, true);
          public               postgres    false    219            `           0    0    servicios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.servicios_id_seq', 3, true);
          public               postgres    false    227            a           0    0    ubicaciones_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.ubicaciones_id_seq', 4, true);
          public               postgres    false    223            b           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);
          public               postgres    false    217            �           2606    16691    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public                 postgres    false    222            �           2606    16708    ordenes ordenes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ordenes
    ADD CONSTRAINT ordenes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ordenes DROP CONSTRAINT ordenes_pkey;
       public                 postgres    false    226            �           2606    16682    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public                 postgres    false    220            �           2606    16722    servicios servicios_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_pkey;
       public                 postgres    false    228            �           2606    16700    ubicaciones ubicaciones_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ubicaciones
    ADD CONSTRAINT ubicaciones_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ubicaciones DROP CONSTRAINT ubicaciones_pkey;
       public                 postgres    false    224            �           2606    16673    usuarios usuarios_correo_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);
 F   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_correo_key;
       public                 postgres    false    218            �           2606    16671    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            J   "   x�3�I�I-�,�/B�RR�
�b���� �
o      N      x������ � �      H      x������ � �      P   V   x�3�N�-.�KW()�H�+I��IT06*�44200�30�2��,���K�450PHOR04*J��42�JsV$�Wp�$!���qqq l�      L   &   x�3�t,S(N�+IT(�/N��M�J,�I������ �I	      F      x������ � �     