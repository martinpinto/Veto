DROP DATABASE Veto;

CREATE DATABASE IF NOT EXISTS Veto;

USE Veto;

CREATE TABLE IF NOT EXISTS Parties (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) DEFAULT NULL,
    logo VARCHAR(500) DEFAULT NULL,
    link VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(500) DEFAULT NULL,
    lastname VARCHAR(500) DEFAULT NULL,
    username VARCHAR(500) DEFAULT NULL,
    password VARCHAR(500) DEFAULT NULL,
    email VARCHAR(500) DEFAULT NULL,
    avatar VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Politicians (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(500) DEFAULT NULL,
    lastname VARCHAR(500) DEFAULT NULL,
    role VARCHAR(500) DEFAULT NULL,
    avatar VARCHAR(500) DEFAULT NULL,
    votes INT DEFAULT NULL,
    partyId INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(partyId) REFERENCES Parties(id)
);

CREATE TABLE IF NOT EXISTS Quotes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) DEFAULT NULL,
    description VARCHAR(4000) DEFAULT NULL,
    status VARCHAR(100) DEFAULT 'unverified',
    votes NUMERIC DEFAULT NULL,
    dateCreated DATE DEFAULT NULL,
    dateQuote DATE DEFAULT NULL,
    source VARCHAR(1000) DEFAULT NULL,
    partyId INT UNSIGNED DEFAULT NULL,
    userId INT UNSIGNED DEFAULT NULL,
    politicianId INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(partyId) REFERENCES Parties(id),
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(politicianId) REFERENCES Politicians(id)
);

CREATE TABLE IF NOT EXISTS Topics (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) DEFAULT NULL,
    dateCreated DATE DEFAULT NULL,
    PRIMARY KEY(id)          
);

CREATE TABLE IF NOT EXISTS QuotesTopics (
    quoteId INT UNSIGNED NOT NULL,
    topicId INT UNSIGNED NOT NULL,
    PRIMARY KEY(quoteId, topicId),
    FOREIGN KEY(quoteId) REFERENCES Quotes(id),
    FOREIGN KEY(topicId) REFERENCES Topics(id)    
);

CREATE TABLE IF NOT EXISTS Comments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) DEFAULT NULL,
    content VARCHAR(500) DEFAULT NULL,
    dateCreated DATE DEFAULT NULL,
    userId INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES Users(id)
);

INSERT INTO Topics
    (title, dateCreated)
VALUES
    ('cdu',
    '2017-12-01');

INSERT INTO Topics
    (title, dateCreated)
VALUES
    ('extremists',
    '2017-12-02');

INSERT INTO Topics
    (title, dateCreated)
VALUES
    ('usa',
    '2017-12-10');

INSERT INTO Parties
    (name, logo, link)
VALUES
    ('CDU',
    'https://www.cdu.de/sites/all/themes/ubg/cdu2017/cdu2017/logo.png',
    'https://www.cdu.de/');
    
INSERT INTO Parties
    (name, logo, link)
VALUES
    ('SPD',
    'https://www.spd.de/typo3conf/ext/spd/Resources/Public/Images/logo.svg',
    'https://www.spd.de/');

INSERT INTO Parties
    (name, logo, link)
VALUES
    ('FDP',
    'https://www.fdp.de/sites/all/themes/custom/uv_fdp/logo.svg',
    'https://www.fdp.de/');

INSERT INTO Politicians
    (firstname, lastname, partyId, role, avatar, votes)
VALUES
    ('Steve', 'Bannon', 1, 'Advisor', 'http://static1.businessinsider.com/image/59976266f1a8501d008b61dd/steve-bannon-fired-a-warning-shot-on-his-way-out-of-the-white-house.jpg', 10);

INSERT INTO Politicians
    (firstname, lastname, partyId, role, avatar, votes)
VALUES
    ('Alexander', 'Gauland', 2, 'Politician', 'https://www.welt.de/img/politik/deutschland/mobile168515717/8382509967-ci102l-w1024/AfD-Spitzenkandidat-Alexander-Gauland.jpg', 10);

INSERT INTO Politicians
    (firstname, lastname, partyId, role, avatar, votes)
VALUES
    ('Jens', 'Spahn', 3, 'Politician', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Jens_Spahn_MdB.jpg/1200px-Jens_Spahn_MdB.jpg', 10);

INSERT INTO Users
    (firstname, lastname, username, password, email)
VALUES
    ('Martin', 'Pinto', '@martinpinto', 'secure', 'secure@mail.com');

INSERT INTO Quotes 
    (title, description, status, votes, dateCreated, dateQuote, source, partyId, userId, politicianId) 
VALUES 
    ('Geht das Kalkül der AfD wieder auf?', 
    'Die AfD ist wieder im Gespräch. Viele Politiker haben die Aussagen von Alexander Gauland vom Wochenende in deutlichen Worten verurteilt. Gauland sagte bei einer Veranstaltung, die Ausländerbeauftragte der Bundesregierung Aydan Özoguz solle man „in Anatolien entsorgen“. Der ehemalige BGH-Präsident Thomas Fischer will Anzeige wegen Volksverhetzung stellen.', 
    'unverified', 
    15, 
    '2017-08-30', 
    '2017-08-30', 
    'http://www.faz.net/aktuell/politik/bundestagswahl/afd-mit-kalkuel-in-den-wahlkampf-15174823.html', 
    1,
    1,
    1);

INSERT INTO Quotes 
    (title, description, status, votes, dateCreated, dateQuote, source, partyId, userId, politicianId) 
VALUES 
    ('Das bedrohliche politische Genie des Steve Bannon', 
    'Man kann Donald Trump nicht ohne Steve Bannon verstehen. Der Ideologe hat verstanden, wie er dem politischen Gegner zusetzen kann – und der geht immer wieder in seine Falle. Ein Gastbeitrag', 
    'unverified', 
    23, 
    '2017-08-30', 
    '2017-08-30', 
    'http://www.faz.net/aktuell/politik/trumps-praesidentschaft/amerika-unter-trump-das-bedrohliche-politische-genie-des-steve-bannon-15173286.html', 
    2,
    1,
    2);    

INSERT INTO Quotes 
    (title, description, status, votes, dateCreated, dateQuote, source, partyId, userId, politicianId) 
VALUES 
    ('Das Kanzleramt fest im Blick', 
    'Konservativ und streitlustig – in der Union hat sich Jens Spahn bei Reizthemen wie Islamkritik und Flüchtlingskrise für die Zeit nach Merkel profiliert. An seinem Aufstieg könnte ihn aber einer hindern – er selbst.', 
    'unverified', 
    68, 
    '2017-08-25', 
    '2017-08-30', 
    'http://www.faz.net/aktuell/politik/bundestagswahl/cdu-politiker-jens-spahn-das-kanzleramt-fest-im-blick-15161491.html', 
    3,
    1,
    3);

INSERT INTO QuotesTopics
    (quoteId, topicId)
VALUES
    (1, 1);

INSERT INTO QuotesTopics
    (quoteId, topicId)
VALUES
    (2, 3);

INSERT INTO QuotesTopics
    (quoteId, topicId)
VALUES
    (3, 2);