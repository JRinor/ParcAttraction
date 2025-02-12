DROP TABLE IF EXISTS attraction;
CREATE TABLE attraction (
    attraction_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    difficulte INT,
    visible BOOL DEFAULT TRUE
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    users_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL, -- ajout du commentaire
    rating INT CHECK (rating BETWEEN 1 AND 5),  -- Ajout de la note
    users_id INT NULL,  -- Permet les critiques anonymes
    first_name VARCHAR(255) NULL,  -- Prénom optionnel
    last_name VARCHAR(255) NULL,   -- Nom optionnel
    attraction_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(users_id) ON DELETE SET NULL, 
    FOREIGN KEY (attraction_id) REFERENCES attraction(attraction_id) ON DELETE CASCADE
);
