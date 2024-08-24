### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

Backend:
- Typescript
- NestJs
- Axios
- TypeOrm
- Redis
- Postgres

Frontend:
- NextJs
- React-Query
- Shadcn-ui
- React-Hook-Form


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

**1. First, Clone this repository either using https or ssh:**

```bash
  $ git clone this repo
```

**2. Install all dependencies**

```bash
  $ npm install
```

**3. Prepare husky, install husky in global environment.**

```bash
  $ npm -g install husky
```

**4. Prepare husky, initiate husky**

```bash
  $ npm run prepare
```

**5. Preparation for Migration**

```bash
  $ npm run migration:generate
```

**6. Run Migrate DB**

```bash
  $ npm run migration:run
```

**7. Run code, and enjoy the journey** **(^\_^)**

```bash
  $ npm run start:dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Or using docker compose

> Just running:

```bash
  $ docker compose up --build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Utilities

**1. API List.**
You need to run the service first then access its host:port/docs

**2. Encryption Ready.**
Uncomment Interceptor Request and/or Response in src/app.module.ts

**3. SQL Logging.**
as it was running on development the log will appear, deactivate it at src/@core/config/config.service.ts on getTypeOrmConfig function, disable logging value.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make this project such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please clone the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m '{type}({scope}): {details}'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Directory Journey
Backend:
```graphql
├───.husky
│    └───\_
├───src
│   ├───@core
│   │   ├───config
│   │   ├───guards
│   │   ├───interceptors
│   │   ├───logger
│   │   ├───middleware
│   │   ├───seeds
│   │   ├───service
│   │   ├───type
│   │   └───utils
│   ├───@model
│   ├───auth
│   │   └───dto
│   ├───migrations
│   │   └───seeds
│   ├───user
│   │   └───dto
│   └───jobs
│       └───dto
├───.env
├───.gitignore
├───.lintstagedrc.js
├───.prettierignore
├───.prettierrc
├───eslintrc.json
├───commitlint.config.js
├───docker-compose.yaml
├───Dockerfile
├───package.json
├───package-lock.yaml
├───README.md
└───tsconfig.js
```


Frontemd:
├───app
│   └───[locale]
│       ├───(auth)
│       │   ├───login
│       │   └───register
│       ├───(dashboard)
│       │   └───jobs
│       │       └───[id]
│       └───error
├───components
│   ├───data-table
│   ├───forms
│   ├───pagination
│   ├───popover
│   ├───providers
│   └───ui
│       └───auto-form
│           ├───common
│           └───fields
├───hooks
├───lib
├───query
│   ├───base
│   ├───dto
│   ├───query
│   └───service
└───types