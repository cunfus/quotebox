# QuoteBox

QuoteBox is a lightweight web application that demonstrates how to use Cloudflare D1 as a serverless database, with a Cloudflare Workers backend and a frontend built with HTML and JavaScript. The frontend fetches data from a Workers API and displays it dynamically on the page.

## Features

- **D1 Database**: Stores and retrieves data using Cloudflare's serverless SQLite database.
- **Frontend Integration**: Fetches data via JavaScript and displays it in a `<span>` element.
- **CORS Support**: Configured for secure cross-origin requests between frontend and backend.
- **Scalable Deployment**: Deployed using Cloudflare Workers for the backend.

## Prerequisites

- Node.js (v20 or higher)
- Wrangler CLI (v4.19 or higher)
- A Cloudflare account with Workers and D1 enabled
- Basic knowledge of JavaScript, HTML, and SQL


## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/cunfus/quotebox.git
    cd quotebox
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Wrangler**

    Update `wrangler.jsonc` with your Cloudflare account details and D1 database configuration:
    ```jsonc
    {
      "d1_databases": [
        {
          "binding": "DB",
          "database_name": "prod-d1-quotebox",
          "database_id": "set-your-d1-id"
        }
      ]
    }
    ```

4. **Set Up D1 Database**

    Create a D1 database and initialize it:
    ```bash
    npx wrangler@latest d1 create prod-d1-quotebox
    npx wrangler d1 execute prod-d1-quotebox --local --file=./sql/schema.sql
    ```

5. **Run Worker**
    ```bash
    npm run dev
    ```

## Database Schema

The D1 database uses a table named `QuoteBox` to store quotes with associated metadata. The schema is defined as follows:

```sql
CREATE TABLE IF NOT EXISTS QuoteBox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    title TEXT,
    author TEXT,
    translator TEXT,
    quote TEXT NOT NULL UNIQUE
);
```

### Table Structure
- **id**: An auto-incrementing integer serving as the primary key, uniquely identifying each quote entry.
- **category**: A required text field indicating the category of the quote (e.g., "Motivational", "Philosophical").
- **title**: An optional text field for the title of the source (e.g., book or article title).
- **author**: An optional text field for the author of the quote.
- **translator**: An optional text field for the translator, if the quote is translated.
- **quote**: A required text field containing the quote itself, enforced as unique to prevent duplicates.

### Example Data
To populate the `QuoteBox` table, you can use the following SQL insert statement in `schema.sql`:

```sql
INSERT INTO QuoteBox (category, title, author, translator, quote) VALUES
    ('Motivational', 'The Alchemist', 'Paulo Coelho', 'Alan R. Clarke', 'And, when you want something, all the universe conspires in helping you to achieve it.'),
    ('Philosophical', NULL, 'Socrates', NULL, 'I know that I know nothing.'),
    ('Inspirational', 'Man''s Search for Meaning', 'Viktor Frankl', NULL, 'When we are no longer able to change a situation, we are challenged to change ourselves.');
```

Run the following command to apply the schema and insert example data:
```bash
wrangler d1 execute DB --file schema.sql
```

### Notes
- The `IF NOT EXISTS` clause ensures the table is only created if it does not already exist, preventing errors during reinitialization.
- The `UNIQUE` constraint on the `quote` column ensures no duplicate quotes are stored.
- Use parameterized queries in your Workers code to safely interact with the `QuoteBox` table and prevent SQL injection. Example:
  ```javascript
  const result = await env.DB.prepare("SELECT * FROM QuoteBox WHERE category = ?").bind("Motivational").all();
  ```



## Deployment

1. **Deploy Backend (Workers)**
    ```bash
    wrangler deploy
    ```
    Note the Workers URL (e.g., `https://your-worker.workers.dev`).

2. **Update API URL**
    In `public/random-quote.js`, update the `API_URL` to your Workers API endpoint:
    ```typescript
    const response = await fetch('https://your-worker.workers.dev/api/random');
    ```
3. **Test Frontend (Local)**

    Open `public/index.html` in the browser.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


