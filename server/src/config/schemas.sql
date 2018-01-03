CREATE DATABASE IF NOT EXISTS Veto;

USE Veto;

CREATE TABLE IF NOT EXISTS Quotes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) DEFAULT NULL,
    author VARCHAR(250) DEFAULT NULL,
    description VARCHAR(4000) DEFAULT NULL,
    type VARCHAR(100) DEFAULT NULL,
    status VARCHAR(100) DEFAULT NULL,
    hashtags VARCHAR(1000) DEFAULT NULL,
    votes NUMERIC DEFAULT NULL,
    dateCreated DATE DEFAULT NULL,
    dateQuote DATE DEFAULT NULL,
    source VARCHAR(1000) DEFAULT NULL,
    party VARCHAR(250) DEFAULT NULL,
    topicId int DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(topicId) REFERENCES Topics(id)
);

CREATE TABLE IF NOT EXISTS Topics (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) DEFAULT NULL,
    dateCreated DATE DEFAULT NULL,
    PRIMARY KEY(id)          
);

INSERT INTO Quotes 
    (title, author, description, type, status, topicId, hashtags, votes, dateCreated, dateQuote, source, party) 
VALUES 
    ('Geht das Kalkül der AfD wieder auf?', 
    'Timo Steppat', 
    'Die AfD ist wieder im Gespräch. Viele Politiker haben die Aussagen von Alexander Gauland vom Wochenende in deutlichen Worten verurteilt. Gauland sagte bei einer Veranstaltung, die Ausländerbeauftragte der Bundesregierung Aydan Özoguz solle man „in Anatolien entsorgen“. Der ehemalige BGH-Präsident Thomas Fischer will Anzeige wegen Volksverhetzung stellen.', 
    'politics', 
    '', 
    2, 
    'extremists, afd, north korea', 
    15, 
    '2017-08-30', 
    '2017-08-30', 
    'http://www.faz.net/aktuell/politik/bundestagswahl/afd-mit-kalkuel-in-den-wahlkampf-15174823.html', 
    'afd');

INSERT INTO Quotes 
    (title, author, description, type, status, topicId, hashtags, votes, dateCreated, dateQuote, source, party) 
VALUES 
    ('Das bedrohliche politische Genie des Steve Bannon', 
    'James Kirchick', 
    'Man kann Donald Trump nicht ohne Steve Bannon verstehen. Der Ideologe hat verstanden, wie er dem politischen Gegner zusetzen kann – und der geht immer wieder in seine Falle. Ein Gastbeitrag', 
    'politics', 
    '', 
    3, 
    'usa, trump, bannon', 
    23, 
    '2017-08-30', 
    '2017-08-30', 
    'http://www.faz.net/aktuell/politik/trumps-praesidentschaft/amerika-unter-trump-das-bedrohliche-politische-genie-des-steve-bannon-15173286.html', 
    'usa');    

INSERT INTO Quotes 
    (title, author, description, type, status, topicId, hashtags, votes, dateCreated, dateQuote, source, party) 
VALUES 
    ('Das Kanzleramt fest im Blick', 
    'THOMAS HOLL', 
    'Konservativ und streitlustig – in der Union hat sich Jens Spahn bei Reizthemen wie Islamkritik und Flüchtlingskrise für die Zeit nach Merkel profiliert. An seinem Aufstieg könnte ihn aber einer hindern – er selbst.', 
    'politics', 
    '', 
    1, 
    'cdu, spd', 
    68, 
    '2017-08-25', 
    '2017-08-30', 
    'http://www.faz.net/aktuell/politik/bundestagswahl/cdu-politiker-jens-spahn-das-kanzleramt-fest-im-blick-15161491.html', 
    'cdu');

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

    