## 環境構築

### 仮想環境

```sh
python -m venv .
pip install -r requirements.txt
```

### データベース

PostgreSQLをインストール

```sh
# インストール
brew install postgresql@14

# PostgreSQLを起動
brew services start postgresql@14

# 起動状況の確認
brew services list
```

データベースを作成

```sh
# データベースの一覧を表示
❯ psql -l
                           List of databases
   Name    |  Owner  | Encoding | Collate | Ctype |  Access privileges
-----------+---------+----------+---------+-------+---------------------
 postgres  | shunsei | UTF8     | C       | C     |
 template0 | shunsei | UTF8     | C       | C     | =c/shunsei         +
           |         |          |         |       | shunsei=CTc/shunsei
 template1 | shunsei | UTF8     | C       | C     | =c/shunsei         +
           |         |          |         |       | shunsei=CTc/shunsei
(3 rows)

# データベースに接続
psql postgres
```

実行したSQL文

> [!important]
> データベースユーザーのパスワードは全て`password`

```sql
CREATE DATABASE dreamsink;

-- Connect to the database
\c dreamsink;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dreams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Trigger function to update updated_at field
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
CREATE TRIGGER update_dream_updated_at
BEFORE UPDATE ON dreams
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Insert sample data
\i seeds/users.sql
\i seeds/dreams.sql

-- Create a test user
CREATE USER test WITH PASSWORD 'password';

-- Grant superuser privileges to the test user
ALTER USER test WITH SUPERUSER;
```

## 起動方法

```sh
python app.py
```
