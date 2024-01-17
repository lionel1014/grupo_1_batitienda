-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-01-2024 a las 01:12:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bati_tienda`
--
CREATE DATABASE IF NOT EXISTS `bati_tienda` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `bati_tienda`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_product_relations`
--

CREATE TABLE `order_product_relations` (
  `order_product_relation_id` int(11) NOT NULL,
  `purchase_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `order_product_relations`
--

INSERT INTO `order_product_relations` (`order_product_relation_id`, `purchase_order_id`, `product_id`, `quantity`) VALUES
(1, 1, 23, 1),
(2, 1, 3, 2),
(3, 2, 19, 1),
(4, 2, 20, 1),
(5, 2, 18, 1),
(6, 3, 4, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` decimal(10,2) UNSIGNED NOT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `product_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `title`, `price`, `stock`, `description`, `image`, `product_category_id`) VALUES
(3, 'Aquaman Deep Dives', 39030.00, 50, 'Aquaman, el rey de la Atlántida y los Siete Mares, emerge de las profundidades del océano con nuevas historias de algunos de los mejores escritores y artistas de cómics. Con sus extraordinarias habilidades acuáticas, fuerza, valentía y humanidad, ¡Aquaman es una fuerza a tener en cuenta! ¡Sumérgete en las nuevas complejidades de su legado en esta colección de nuevas imágenes de los mejores talentos de DC como Marv Wolfman, Tom Taylor, Steve Orlando y muchos, muchos más!', '5.jpg', 15),
(4, 'Batgirl: La chica murciélago de Burnside', 38427.00, 100, 'Barbara Gordon está lista para superar su traumático pasado, hacer las maletas y afrontar todo tipo de retos en Burnside, el vecindario más cool de Gotham City. Allí retomará sus estudios de posgrado, hará nuevas amistades e investigará casos como Batgirl, luciendo para la ocasión un flamante uniforme.', '9.jpg', 15),
(5, 'Absolute Batman the Killing Joke HC', 57106.00, 75, 'Una de las novelas gráficas más populares de todos los tiempos, esta retorcida historia de locura y perseverancia se presenta como una Edición Absoluta por primera vez. Buscando demostrar que cualquier hombre puede ser empujado más allá de su punto de ruptura hasta la locura, el Joker intenta volver loco al comisionado Gordon. Gordon se niega a darse por vencido y lucha por mantener la cordura con la ayuda de Batman en un esfuerzo desesperado por vencer al loco.', '1.jpg', 15),
(6, 'Figura Bandai Jujutsu Kaisen Anime Heroes Megumi', 55500.00, 75, 'Únase a sus hechiceros favoritos de Tokyo Jujutsu High, de Jujutsu Kaisen, y reviva las increíbles escenas de lucha, las maldiciones demoníacas y el galardonado anime que tomó al mundo por sorpresa. La figura de acción de Jujutsu Kaisen Anime Heroes Megumi Fushiguro mide aproximadamente 6 1/2 pulgadas de alto y presenta múltiples puntos de articulación.', '6.jpg', 18),
(7, 'Figura Naruto Shippuden Anime Heroes Uzumaki N Sage Mode', 31500.00, 50, 'Entra en el mundo del anime de Naruto con las figuras de héroes de Bandai. Esta figura de captura el comportamiento frío y determinado de Naruto Shippuden. Viene en embalaje premium influenciado por el manga y el arte japonés. Estas figuras muy detalladas increíblemente decoradas de 17 cm Aproximadamente te permiten recrear los momentos icónicos de Naruto Shippuden y cuenta con más de 16 puntos de articulación. Perfecta para jugar y como exposición.', '7.jpg', 18),
(8, 'Figura One Piece Anime Heroes Trafalgar Law Bandai', 55500.00, 100, 'Luffy es el personaje principal de la serie de manga y anime One Piece y uno de los personajes más fuertes en todo el anime por sus capacidades de cuerpo de goma que le permiten una casi infinita resistencia y una formidable fuerza. Es un personaje despreocupado, siempre alegre y con un carisma sin igual. Esta figura vienen tal como las ves en las fotos de la publicación, en su caja, con su accesorios como las manos intercambiables. Es de gran calidad, totalmente original Anime de Bandai nuevo.', '8.jpg', 18),
(9, 'Funko Pop! Marvel: Doctor Strange Multiverse of Madness', 4310.00, 75, '¡Pon a prueba los límites de la realidad y salta al multiverso de Marvel con Pop! ¡Doctor Strange de Doctor Strange en el Multiverso de la Locura! Incluso hay una probabilidad de 1 en 6 de que encuentres la variante de persecución cósmica.', '10.jpg', 19),
(10, '¡Funko Pop! Disney: 30 aniversario de Pesadilla antes de Navidad - Santa Jack', 8720.00, 100, '¿Qué es esto? El rey de las calabazas ha traído Halloween a Halloween Town, pero ahora está listo para celebrar, con el espíritu de unas fiestas más alegres, ¡Jack Skellington está aquí para celebrar el 30 aniversario de Pesadilla antes de Navidad como papá! ¡Papá Noel!', '11.jpg', 19),
(11, '¡Funko Pop! Naruto - Naruto', 14720.00, 50, '¡Tus personajes favoritos de Naruto ahora son figuras de vinilo súper lindas! ¡Este Naruto Pop! La figura de vinilo presenta al ninja multiplicador de la exitosa serie de anime. Con una altura aproximada de 3 3/4 pulgadas, esta figura está empaquetada en una caja expositora.', '12.jpg', 19),
(12, 'Figura de acción Marvel Legends Series Winter Soldier', 38350.00, 50, 'Aunque Bucky Barnes ha luchado para volver a ser él mismo, en sus pesadillas más oscuras cobra vida su mayor temor... ¡de que siga siendo el Soldado de Invierno! Con más de 80 años de historia del entretenimiento, Marvel se ha convertido en la piedra angular de las colecciones de fans de todo el mundo. Con la serie Marvel Legends, los personajes favoritos de Marvel Comic Universe y Marvel Cinematic Universe están diseñados con detalles y articulaciones de primera calidad para posar y exhibir en colecciones. Desde figuras hasta vehículos y artículos de juego de rol premium, la serie Marvel Legends ofrece productos inspirados en personajes de élite para los fanáticos y coleccionistas de Marvel. Las figuras adicionales se venden por separado.', '13.jpg', 20),
(13, 'Figura de acción coleccionable Star Wars The Black Series Darth Vader', 51030.00, 100, 'La figura de acción de Darth Vader de la serie negra a escala de 6 pulgadas está diseñada para parecerse al personaje de Star Wars: The Empire Strikes Back, con detalles de primera calidad y múltiples puntos de articulación.', '14.jpg', 20),
(14, 'Figura de acción de X-Men de Marvel Legends', 21760.00, 75, 'Resucitado de repente y con unas garras de adamantio sobrecalentadas, Wolverine debe luchar una vez más para recuperar su libertad y su mente. Con más de 80 años de historia en el mundo del entretenimiento, Marvel se ha convertido en la piedra angular de las colecciones de fans de todo el mundo. Con la serie Marvel Legends, los personajes favoritos de los fans de Marvel Comic Universe y Marvel Cinematic Universe están diseñados con detalles y articulaciones de primera calidad para posar y exhibirlos en colecciones. Desde figuras hasta vehículos y objetos de juego de rol de primera calidad, la serie Marvel Legends ofrece productos inspirados en personajes de élite para los fanáticos y coleccionistas de Marvel.', '15.jpg', 20),
(15, 'El Inmortal Hulk Vol. 10: Del Infierno y la Muerte', 14000.00, 50, 'Los monstruos gamma volvieron y convergen, uno a uno, en Nueva York. ¿Quién los detendrá? ¿Y quién nos salvará del Inmortal Hulk? Los Avengers harán su mejor esfuerzo, pero la última vez destruyeron una ciudad entera mientras luchaban contra Hulk', '19.jpg', 16),
(16, 'La Muerte de Wolverine (Marvel Must Have)', 13000.00, 100, 'Ha llegado la hora. Después de toda una vida luchando por aquello en lo que creía, Wolverine ha llegado al final del camino. Agotado, sin factor curativo, y con una recompensa por su cabeza, Logan tendrá que luchar una última vez para irse bajo sus propios términos, haciendo que su muerte, igual que su vida, tenga un sentido. Charles Soule y Steve McNiven saben por quién tañen las campanas. Tañen por ti, tañen por mí, ahora que el mayor héroe de todos emprende su último viaje. Adiós, Logan.', '21.jpg', 16),
(17, 'Venom Vol. 8: El Rey de Negro', 13000.00, 75, 'La horripilante amenaza del Rey de Negro, el todo poderoso dios de la raza simbionte, se ha cernido por años. Ahora, luego de milenios de encierro, ¡Knull y su ejército de simbiontes llegan a la Tierra! Pero ¿cuáles son sus horrendos planes? ¿Y qué le ocurrirá a Venom cuando finalmente se enfrente cara a cara con el amo del abismo? Eddie Brock está a punto de enfrentar el mayor desafío de su vida, pero no está solo. ¿Quién luchará a su lado en el momento más oscuro de la Tierra? ¿Tendrán alguna oportunidad de vencer? ¡Es el fin de una era y el comienzo de una nueva leyenda!', '20.jpg', 16),
(18, 'Star Wars Vol. 4: El último Vuelo De Harbinger', 6000.00, 50, 'Con uno de los Rebeldes capturado y encarcelado, ¡regresamos una vez más a los diarios de Ben Kenobi y a una aventura legendaria con Yoda, el Maestro Jedi! Yoda se encuentra atrapado en un mundo lleno de salvajes y misteriosos niños. Vencido y capturado, el Maestro debe convertirse en alumno una vez más. Además, ¡los ecos de la lucha de Yoda en el pasado son percibidos por Luke en el presente! ¡Conectado todo está!', '30.jpg', 17),
(19, 'Star Wars Legends Colección Vol. 10: Lazos de Sangre - Jango Y Boba Fett', 4000.00, 100, 'Una fuerza maligna está a punto de liberarse. Parlan Spinner, el hilandero de la muerte, roba un arma secreta que los viejos Jedi han mantenido oculta durante miles de años para evitar el caos que podría ocasionar en toda la Galaxia. Se trata de Lord Dreypa, uno de los principales fundadores de la Orden Sith. Ahora este ser aterrador está libre y amenaza con destruir la tribu perdida de los Sith.', '32.jpg', 17),
(20, 'Star Wars Legends: Infinities Omnibus', 8000.00, 75, '¿Qué tal si en Una nueva esperanza, en lugar de destruir la Estrella de la Muerte, el misil de protones de Luke hubiera funcionado mal? ¿Qué tal si en El imperio contraataca Han no hubiera llegado a tiempo en Hoth para evitar que Luke muriera congelado? ¿Qué tal si en El regreso del jedi el detonador termal de Leia hubiera volado el palacio de Jabba the Hutt antes de rescatar a Han? Estas y otras preguntas son respondidas en estas historias especiales donde se cuentan versiones distintas de las versiones clásicas, a fin de explorar qué pudo ser diferente. ¡No te pierdas Star Wars Infinities, que reúne las versiones alternas de los episodios originales de la saga!', '31.jpg', 17),
(21, 'Atom: The Beginning #06', 3500.00, 50, 'Los robots más fuertes del mundo se preparan para la primera edición del WRB (World Robot Battling). Tenma y su equipo inscriben a U-ran, su nueva creación, pero... ¡Llega el emocionante sexto tomo de la historia previa al nacimiento de Atom (Astroboy)!', '29.jpg', 21),
(22, 'Akame Ga Kill! #15', 3600.00, 100, 'Tatsumi se aventura en la Capital en busca de fortuna para ayudar a su pueblo. Él vivía ignorante de la corrupción y manejos turbios que reinaban allí cuando una bella delincuente le roba. Por suerte, otra linda chica que forma parte de The Night Raid, un grupo de asesinos, lo rescata. Lo que no sabe Tatsumi es que esa joven va a recibir una visita de una familia de asesinos (incluida la chica ladrona) y que puede que ellos sean los buenos (o los menos malos)... y lo quieran reclutar. ¡Sumate al viaje de Tatsumi mientras se replantea su forma de ver el mundo de la mano de Akame, ¡La asesina de ojos rojos!!', '28.jpg', 21),
(23, 'Ahora Soy Zombie #02', 4100.00, 75, 'Fuuka y Zukekiyo, rodeados por la gente caida de Heike, viven la vida lenta y larga como zombie. Lo bueno de la vida aqui es que si te lastimas la cabeza no pasa nada. Este mundo es el paraiso.', '27.jpg', 21),
(24, 'Amar y Ser Amado, Dejar y Ser Dejado #01', 3200.00, 50, 'Yuna y Akari son dos chicas con un concepto del amor completamente opuesto: Yuna es soñadora y romántica, Akari es realista y directa. A pesar de sus diferencias, la casualidad las llevará a convertirse en muy buenas amigas, ayudándose a ampliar la forma en que entienden el mundo y crecer como persona. Las cosas se complicarán cuando Yuna se enamore de Rio, el hermanastro de Araki, que cuenta con una muy mala fama en materia de mujeres y Akari comience a sentir cosas por Kazuomi, un amigo de la infancia de Yuna al que en un principio quería enganchar con esta. ', '24.jpg', 22),
(25, 'Aoha Ride #07', 3600.00, 100, 'Aoha Ride (también conocida como Ao Haru Ride) muestra las vicisitudes de la vida en el colegio: la amistad, la dificultad de entablar relaciones con otros compañeros con personalidades distintas, el primer amor… mediante la emotiva historia que protagonizan Futaba y Kou.', '25.jpg', 22),
(26, 'All You Need is Kill #02', 3800.00, 75, 'Cuando el soldado Keiji Kiriya se alista para su primer día de combate...', '26.jpg', 24),
(27, 'Attack on Titan #32', 4500.00, 50, '¡La última batalla por la supervivencia de la humanidad está a punto de comenzar...', '23.jpg', 24),
(28, 'Dragon Ball Z: Guía de Personajes', 4000.00, 75, '¡La guía esencial que destaca la historia y el poder de más de 200 personajes...', '22.jpg', 25),
(29, 'Dragon Ball: A Visual History', 3200.00, 50, 'Explora 30 años de aventuras de Dragon Ball a través de una colección de ilustraciones...', '18.jpg', 25),
(30, 'The Legend of Zelda: Hyrule Historia', 5000.00, 100, 'Este libro de arte oficial de Hyrule Historia contiene ilustraciones históricas...', '17.jpg', 25),
(31, 'Super Mario Encyclopedia: The Official Guide to the First 30 Years', 3200.00, 75, '¡Celebra el trigésimo aniversario de Super Mario con la historia definitiva...', '16.jpg', 25),
(32, 'Camiseta Dragon Ball Shenron', 1500.00, 50, 'Camiseta negra con la impresión del dragón Shenron rodeado por las esferas del dragón...', '3.jpg', 26),
(33, 'Gorra One Piece Skull Luffy, Bandai', 30.00, 100, 'Gorra con la icónica calavera de Luffy!', '2.jpg', 26),
(34, 'Mochila Naruto/Leaf Village', 3500.00, 75, 'Mochila con diseño del emblema de la Aldea de la Hoja de Naruto...', '4.jpg', 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_categories`
--

CREATE TABLE `product_categories` (
  `product_category_id` int(10) NOT NULL,
  `category` varchar(100) NOT NULL,
  `sub_category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `product_categories`
--

INSERT INTO `product_categories` (`product_category_id`, `category`, `sub_category`) VALUES
(15, 'Comic', 'DC'),
(16, 'Comic', 'Marvel'),
(17, 'Comic', 'Star Wars'),
(18, 'Figura', 'Bandai'),
(19, 'Figura', 'Funko'),
(20, 'Figura', 'Hasbro'),
(21, 'Manga', 'Shonen'),
(22, 'Manga', 'Shojo'),
(23, 'Manga', 'Seinen'),
(24, 'Manga', 'Josei'),
(25, 'Otro', 'Accesorio'),
(26, 'Otro', 'Indumentaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `purchase_order_id` int(10) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `order_state` varchar(100) NOT NULL,
  `create_date` date NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `purchase_orders`
--

INSERT INTO `purchase_orders` (`purchase_order_id`, `amount`, `order_state`, `create_date`, `customer_id`) VALUES
(1, 25870.00, 'en carrito', '2024-01-08', 25),
(2, 50000.00, 'pagado', '2023-12-07', 18),
(3, 80.00, 'Recibido', '2023-12-25', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` tinyint(3) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `last_name`, `email`, `password`, `category`, `image`, `user_name`) VALUES
(3, 'Carlos', 'García', 'carlos.garcia@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '1.jpg', 'carlos_garcia'),
(4, 'Isabella', 'Johnson', 'isabella.johnson@yahoo.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '2.jpg', 'isabella_johnson'),
(5, 'Diego', 'Martínez', 'diego.martinez@outlook.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '3.jpg', 'diego_martinez'),
(6, 'Sophia', 'López', 'sophia.lopez@hotmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '4.jpg', 'sophia_lopez'),
(7, 'Lucas', 'Smith', 'lucas.smith@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '5.jpg', 'lucas_smith'),
(8, 'Mateo', 'Silva', 'mateo.silva@yahoo.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '6.jpg', 'mateo_silva'),
(9, 'Valentina', 'Gómez', 'valentina.gomez@outlook.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '7.jpg', 'valentina_gomez'),
(10, 'Andrew', 'Fernández', 'andrew.fernandez@hotmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '8.jpg', 'andrew_fernandez'),
(11, 'Renata', 'Rojas', 'renata.rojas@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '9.jpg', 'renata_rojas'),
(12, 'Emiliano', 'Rodríguez', 'emiliano.rodriguez@yahoo.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '10.jpg', 'emiliano_rodriguez'),
(13, 'Mia', 'Williams', 'mia.williams@outlook.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '11.jpg', 'mia_williams'),
(14, 'Nicolás', 'Serrano', 'nicolas.serrano@hotmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '12.jpg', 'nicolas_serrano'),
(15, 'Valeria', 'Taylor', 'valeria.taylor@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '13.jpg', 'valeria_taylor'),
(16, 'Emmanuel', 'Brown', 'emmanuel.brown@yahoo.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '14.jpg', 'emmanuel_brown'),
(17, 'Camila', 'Salazar', 'camila.salazar@outlook.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '15.jpg', 'camila_salazar'),
(18, 'Alexander', 'Fuentes', 'alexander.fuentes@hotmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '16.jpg', 'alexander_fuentes'),
(19, 'Aitana', 'Méndez', 'aitana.mendez@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '17.jpg', 'aitana_mendez'),
(20, 'Daniel', 'Pérez', 'daniel.perez@yahoo.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '18.jpg', 'daniel_perez'),
(21, 'María', 'Ramírez', 'maria.ramirez@hotmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '19.jpg', 'maria_ramirez'),
(22, 'Sebastián', 'Mendoza', 'sebastian.mendoza@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '20.jpg', 'sebastian_mendoza'),
(23, 'Elena', 'Clark', 'elena.clark@yahoo.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '21.jpg', 'elena_clark'),
(24, 'Hugo', 'González', 'hugo.gonzalez@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '22.jpg', 'hugo_gonzalez'),
(25, 'Ava', 'Hill', 'ava.hill@outlook.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '23.jpg', 'ava_hill'),
(26, 'Oscar', 'Young', 'oscar.young@hotmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '24.jpg', 'oscar_young'),
(27, 'Lily', 'Anderson', 'lily.anderson@gmail.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 1, '25.jpg', 'lily_anderson'),
(28, 'Sofía', 'Williams', 'sofia.williams@outlook.com', '$2a$10$6W0fd6kY1HISt/W4kstvQuIf7aceNWNcONcVRpEo0ueQ53r3eaqNm', 2, '26.jpg', 'sofia_williams');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `order_product_relations`
--
ALTER TABLE `order_product_relations`
  ADD PRIMARY KEY (`order_product_relation_id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_category_id` (`product_category_id`);

--
-- Indices de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_category_id`),
  ADD UNIQUE KEY `sub_category` (`sub_category`);

--
-- Indices de la tabla `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`purchase_order_id`),
  ADD KEY `user_id` (`customer_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `order_product_relations`
--
ALTER TABLE `order_product_relations`
  MODIFY `order_product_relation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `product_category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `purchase_order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `order_product_relations`
--
ALTER TABLE `order_product_relations`
  ADD CONSTRAINT `order_product_relations_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`purchase_order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_product_relations_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `product_categories` (`product_category_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
