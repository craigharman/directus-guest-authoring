# About

These projects are created when writing Directus guest articles.

## Create a new project

1. From the project root, install Nuxt in a sub directory:
```bash
npx nuxi@latest init <project-name>
```
2. In the newly created project, install the Directus SDK:
```bash
npm install @directus/sdk
```
3. Create a `docker-compose.yml` file in the project root:
```yaml
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    volumes:
      - ./database:/directus/database
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    environment:
      SECRET: "replace-with-random-value"
      ADMIN_EMAIL: "admin@example.com"
      ADMIN_PASSWORD: "d1r3ctu5"
      DB_CLIENT: "sqlite3"
      DB_FILENAME: "/directus/database/data.db"
      WEBSOCKETS_ENABLED: "true"
      CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC: localhost:3000
```
4. Edit the `.gitignore` file to ignore the `database` and `uploads` directories:
```bash
database/*
uploads/*
```

That's it! You can now run Directus with `docker-compose up` and run the front end with `npm run dev`.