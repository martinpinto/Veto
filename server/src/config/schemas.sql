DROP DATABASE Veto;

CREATE DATABASE IF NOT EXISTS Veto;

USE Veto;

CREATE TABLE IF NOT EXISTS Party (
    py_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    py_name VARCHAR(500) NOT NULL,
    py_logo VARCHAR(500) DEFAULT NULL,
    py_link VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY(py_id)
);

CREATE TABLE IF NOT EXISTS User (
    u_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    u_firstname VARCHAR(500) NOT NULL,
    u_lastname VARCHAR(500) NOT NULL,
    u_username VARCHAR(500) NOT NULL,
    u_password VARCHAR(500) NOT NULL,
    u_email VARCHAR(500) NOT NULL,
    u_avatar VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY(u_id)
);

CREATE TABLE IF NOT EXISTS Politician (
    p_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    p_firstname VARCHAR(500) DEFAULT NULL,
    p_lastname VARCHAR(500) DEFAULT NULL,
    p_role VARCHAR(500) DEFAULT NULL,
    p_avatar VARCHAR(500) DEFAULT NULL,
    p_votes INT DEFAULT NULL,
    p_partyId INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY(p_id),
    FOREIGN KEY(p_partyId) REFERENCES Party(py_id)
);

CREATE TABLE IF NOT EXISTS Quote (
    q_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    q_title VARCHAR(500) NOT NULL,
    q_description VARCHAR(4000) DEFAULT NULL,
    q_status VARCHAR(100) DEFAULT 'unverified',
    q_votes NUMERIC DEFAULT NULL,
    q_dateCreated DATETIME DEFAULT NOW(),
    q_dateQuote DATETIME DEFAULT NULL,
    q_source VARCHAR(1000) DEFAULT NULL,
    q_partyId INT UNSIGNED DEFAULT NULL,
    q_userId INT UNSIGNED DEFAULT NULL,
    q_politicianId INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY(q_id),
    FOREIGN KEY(q_partyId) REFERENCES Party(py_id),
    FOREIGN KEY(q_userId) REFERENCES User(u_id),
    FOREIGN KEY(q_politicianId) REFERENCES Politician(p_id)
);

CREATE TABLE IF NOT EXISTS Topic (
    t_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    t_title VARCHAR(500) DEFAULT NULL,
    t_dateCreated DATETIME DEFAULT NULL,
    PRIMARY KEY(t_id)          
);

CREATE TABLE IF NOT EXISTS QuoteTopic (
    qt_quoteId INT UNSIGNED NOT NULL,
    qt_topicId INT UNSIGNED NOT NULL,
    PRIMARY KEY(qt_quoteId, qt_topicId),
    FOREIGN KEY(qt_quoteId) REFERENCES Quote(q_id),
    FOREIGN KEY(qt_topicId) REFERENCES Topic(t_id)    
);

CREATE TABLE IF NOT EXISTS Comment (
    c_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    c_title VARCHAR(500) NOT NULL,
    c_content VARCHAR(500) NOT NULL,
    c_dateCreated DATETIME DEFAULT NOW(),
    c_userId INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY(c_id),
    FOREIGN KEY(c_userId) REFERENCES User(u_id)
);

INSERT INTO Topic
    (t_title, t_dateCreated)
VALUES
    ('cdu',
    '2017-12-01');

INSERT INTO Topic
    (t_title, t_dateCreated)
VALUES
    ('extremists',
    '2017-12-02');

INSERT INTO Topic
    (t_title, t_dateCreated)
VALUES
    ('usa',
    '2017-12-10');

INSERT INTO Party
    (py_name, py_logo, py_link)
VALUES
    ('CDU',
    'https://www.cdu.de/sites/all/themes/ubg/cdu2017/cdu2017/logo.png',
    'https://www.cdu.de/');
    
INSERT INTO Party
    (py_name, py_logo, py_link)
VALUES
    ('SPD',
    'https://www.spd.de/typo3conf/ext/spd/Resources/Public/Images/logo.svg',
    'https://www.spd.de/');

INSERT INTO Party
    (py_name, py_logo, py_link)
VALUES
    ('FDP',
    'https://www.fdp.de/sites/all/themes/custom/uv_fdp/logo.svg',
    'https://www.fdp.de/');

INSERT INTO Politician
    (p_firstname, p_lastname, p_partyId, p_role, p_avatar, p_votes)
VALUES
    ('Steve', 'Bannon', 1, 'Advisor', 'http://static1.businessinsider.com/image/59976266f1a8501d008b61dd/steve-bannon-fired-a-warning-shot-on-his-way-out-of-the-white-house.jpg', 10);

INSERT INTO Politician
    (p_firstname, p_lastname, p_partyId, p_role, p_avatar, p_votes)
VALUES
    ('Alexander', 'Gauland', 2, 'Politician', 'https://www.welt.de/img/politik/deutschland/mobile168515717/8382509967-ci102l-w1024/AfD-Spitzenkandidat-Alexander-Gauland.jpg', 10);

INSERT INTO Politician
    (p_firstname, p_lastname, p_partyId, p_role, p_avatar, p_votes)
VALUES
    ('Jens', 'Spahn', 3, 'Politician', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Jens_Spahn_MdB.jpg/1200px-Jens_Spahn_MdB.jpg', 10);

INSERT INTO User
    (u_firstname, u_lastname, u_username, u_password, u_email)
VALUES
    ('Martin', 'Pinto', '@martinpinto', 'secure', 'secure@mail.com');

INSERT INTO Quote 
    (q_title, q_description, q_status, q_votes, q_dateCreated, q_dateQuote, q_source, q_partyId, q_userId, q_politicianId) 
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

INSERT INTO Quote
    (q_title, q_description, q_status, q_votes, q_dateCreated, q_dateQuote, q_source, q_partyId, q_userId, q_politicianId) 
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

INSERT INTO Quote
    (q_title, q_description, q_status, q_votes, q_dateCreated, q_dateQuote, q_source, q_partyId, q_userId, q_politicianId) 
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

INSERT INTO QuoteTopic
    (qt_quoteId, qt_topicId)
VALUES
    (1, 1);

INSERT INTO QuoteTopic
    (qt_quoteId, qt_topicId)
VALUES
    (2, 3);

INSERT INTO QuoteTopic
    (qt_quoteId, qt_topicId)
VALUES
    (3, 2);