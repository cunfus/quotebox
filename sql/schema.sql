DROP TABLE IF EXISTS QuoteBox;

CREATE TABLE IF NOT EXISTS QuoteBox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL, 
    title TEXT, 
    author TEXT,
    translator TEXT,
    quote TEXT NOT NULL UNIQUE
);


INSERT INTO QuoteBox (category, title, author, translator, quote) VALUES 
    ('proverb', null, null, null, 'Know thyself');