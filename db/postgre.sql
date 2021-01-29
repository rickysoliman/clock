\c dvdrental;

DROP DATABASE IF EXISTS clock;

CREATE DATABASE clock WITH OWNER rickymarasigan;

\c clock;

CREATE SCHEMA clock;

CREATE TABLE alarms (
    alarm_id SERIAL,
    time VARCHAR(50),
    label VARCHAR(50),
    PRIMARY KEY (alarm_id)
);

SELECT * FROM alarms;

/*
\i '/Users/rickymarasigan/Desktop/Clock/db/postgre.sql';
*/