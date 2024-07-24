#### 1. Create Project

```sh
    // node v21.1.0, npm v10.2.3
    npm create vite@latest <ProjectName> -- --template react-ts
```

#### 2. Install Package

```sh
    npm install
    npm install path
    npm install @types/node
    npm install styled-components @types/styled-components
    npm install @reduxjs/toolkit
    npm install react-redux @types/react-redux
    npm install react-router-dom
    npm install --save-dev prettier @trivago/prettier-plugin-sort-imports
    npm install swiper
    npm install axios
    npm install @faker-js/faker
    npm install js-cookie @types/js-cookie
    npm install react-easy-crop
    npm install react-datepicker @types/react-datepicker
    npm install react-beautiful-dnd @types/react-beautiful-dnd
    npm install react-toastify
    npm install slate slate-react slate-history
    npm install polished
```

#### 3. Install Dev tool on browser

    - Redux DevTools

#### 4. Install VScode Extension

    - Typescript React code snippets
    - vscode-styled-components

#### 5. Config Alias Path

```sh
    ## inside compilerOptions of tsconfig.json
    "baseUrl": "./src",
    "paths": {
      "@*": ["*"],
    }

    # vite.config.ts
    import path from "path";

    resolve: {
        alias: {
        "@store": path.resolve(__dirname, "./src/store"),
        ...
        },
    },

    # Example Usage
    import store from "@store/store";
```

#### 6. Add Lib "ES2021.String" to tsconfig.json

```sh
    "compilerOptions": {
        "lib": ["ES2020", "DOM", "DOM.Iterable", "ES2021.String"],
        ...
    }
```

#### 7. Set Script in package.json

```sh
    "dev": "vite --mode dev",

    # start localhost with this command
    npm run dev -- --host
```

#### 8. Build dist for deployment

```sh
    npm run build
```

#### 9. Copy dist.zip to server

```sh
    scp -r ./dist.zip <username>@<IP_server>:/root/main/
```

#### 10. Shell to Server via ssh

```sh
    ssh <username>@<IP_address>
```

#### 11. Run dist

```sh
    npm install -g serve
    # serve at port 80
    serve -s dist -l 8000
```
