## Bit orders
[![Build Status](https://travis-ci.com/notbaddays/bitpharma-orders-management.svg?branch=master)](https://travis-ci.com/notbaddays/bitpharma-orders-management)

# Create React App

Crea aplicaciones React sin configuración de compilación.

- [Creating an App](#creating-an-app) – Cómo crear una nueva aplicación.
- [User Guide](https://facebook.github.io/create-react-app/) – Cómo desarrollar aplicaciones bootstrapped con la aplicación Crear React.

La aplicación Create React funciona en macOS, Windows y Linux.<br>
Si algo no funciona, por favor, contactarnos. support@bitpharma.xyz.

## Quick Overview

```sh
npx create-react-app my-app
cd my-app
npm start
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

Luego, abrir [http://localhost:3000/](http://localhost:3000/) para ver el app.<br>
Cuando esté listo para implementarse en producción, cree un paquete minificado con `npm run build`.

<p align='center'>
<img src='https://cdn.rawgit.com/facebook/create-react-app/27b42ac/screencast.svg' width='600' alt='npm start'>
</p>

### Iniciar inmediatamente

Usted **no** necesita instalar o configurar herramientas como Webpack o Babel. <br>
Están preconfigurados y ocultos para que pueda centrarse en el código.

Simplemente crea un proyecto y listo.

## Creando un App


** Necesitará tener Node 8.10.0 o posterior en su máquina de desarrollo local** (pero no se requiere en el servidor). Puede usar [nvm](https://github.com/creationix/nvm#installation) (macOS / Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) para cambiar fácilmente las versiones de Node entre diferentes proyectos.


Para crear una nueva aplicación, puede elegir uno de los siguientes métodos:

### npx

```sh
npx create-react-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) viene con npm 5.2+ y superior, consulte [instrucciones para versiones anteriores de npm](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init react-app my-app
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create react-app my-app
```

_`yarn create` is available in Yarn 0.25+_

Creará un directorio llamado `my-app` dentro de la carpeta actual.<br>
Dentro de ese directorio, generará la estructura inicial del proyecto e instalará las dependencias transitivas:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

Sin configuración o estructuras de carpetas complicadas, solo los archivos que necesita para crear su aplicación.<br>
Una vez finalizada la instalación, puede abrir la carpeta del proyecto:

```sh
cd my-app
```

Dentro del proyecto recién creado, puede ejecutar algunos comandos incorporados:

### `npm start` or `yarn start`


Ejecuta la aplicación en modo de desarrollo. <br>
Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

La página se volverá a cargar automáticamente si realiza cambios en el código. <br>
Verá los errores de compilación y las advertencias de pelusas en la consola.

<p align='center'>
<img src='https://cdn.rawgit.com/marionebl/create-react-app/9f62826/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

Ejecuta el observador de prueba en un modo interactivo.<br>
Por defecto, ejecuta pruebas relacionadas con los archivos cambiados desde la última confirmación.

### `npm run build` or `yarn build`

Ejecuta el observador de prueba en un modo interactivo. <br>
Por defecto, realizar pruebas relacionadas con los archivos cambiados desde la última confirmación.

La compilación se reduce y los nombres de archivo incluyen los hashes. <br>

Su aplicación está lista para ser implementada.


## Philosophy

- **Una dependencia:** Solo hay una dependencia de compilación. Utiliza Webpack, Babel, ESLint y otros proyectos asombrosos, pero ofrece una experiencia curada y cohesiva sobre ellos.

- **No requiere configuración:** No necesita configurar nada. Se maneja una configuración razonablemente buena tanto de desarrollo como de producción para que pueda concentrarse en escribir código.

- **Sin bloqueo:** Puede "expulsar" a una configuración personalizada en cualquier momento. Ejecute un solo comando, y todas las dependencias de configuración y compilación se moverán directamente a su proyecto, para que pueda continuar justo donde lo dejó.

## Expresiones de gratitud

Agradecemos a los autores de los proyectos relacionados existentes por sus ideas y colaboración:

- [@carlosvq](https://github.com/carlosvq)
- [@ricardomalagon](https://github.com/ricardomalagon)
- [@visquel](https://github.com/visquel)
- [@leinadpb](https://github.com/leinadpb)
- [@hectorandac](https://github.com/hectorandac)

## License

Este software es open source, [licensed as MIT](https://github.com/facebook/create-react-app/blob/master/LICENSE).
