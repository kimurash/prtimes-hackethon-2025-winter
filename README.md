# Dream　Sink

書き溜めた夢を公開して「いいね！」がもらえるWebサービス

## 機能一覧

- 自分の夢
    - [x] 夢の作成
    - [x] 夢の閲覧
    - [ ] 夢の編集
    - [X] 夢の削除
    - [x] 公開 or 非公開設定
- 公開されている夢
    - [x] 夢の閲覧
    - [ ] 夢の絞り込み
    - [x] いいね！

## 画面

WIP

## 技術スタック

| カテゴリ       | 技術                                        | 
| -------------- | ------------------------------------------- | 
| フロントエンド | React, React Router, Tailwind CSS, Radix UI, Jotai | 
| バックエンド   | Flask                                       | 
| データベース   | PostgreSQL                                  | 

## ER図

```mermaid
erDiagram
    USERS {
        INTEGER id PK "Primary Key"
        VARCHAR username "ユーザー名"
        VARCHAR email "メールアドレス"
        VARCHAR password_hash "パスワードハッシュ"
        TIMESTAMP created_at "作成日時"
        TIMESTAMP updated_at "更新日時"
    }
    DREAMS {
        INTEGER id PK "Primary Key"
        INTEGER user_id FK "Foreign Key to USERS"
        TEXT title "タイトル"
        TEXT content "内容"
        BOOLEAN is_public "公開フラグ"
        INTEGER likes "いいね数"
        TIMESTAMP created_at "作成日時"
        TIMESTAMP updated_at "更新日時"
    }
    USERS ||--o{ DREAMS : "has many"
```
