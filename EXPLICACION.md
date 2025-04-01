# Explicación del Código Paso a Paso

| Paso | Descripción | Función o Método Implementado | Fragmento de Código | Captura / Resultado | Observaciones |
|------|-------------|-------------------------------|----------------------|----------------------|---------------|
| 1 | Se importa el módulo `fs` para trabajar con archivos. | `require('fs')` | `const fs = require('fs');` | - | Es necesario para leer el archivo fuente. |
| 2 | Se intenta importar `cli-table3` para mostrar tablas bonitas. Si falla, se usa tabla básica. | `require('cli-table3')` con `try/catch` | `let Table; let tieneCliTable = true; try { Table = require('cli-table3'); } catch (e) { ... }` | Advertencia en consola si no está instalado. | Permite flexibilidad y mejora la presentación. |
| 3 | Se recibe el nombre del archivo fuente desde los argumentos de la terminal. | `process.argv[2]` | `const archivo = process.argv[2];` | Recibe por ejemplo: `codigofuente.ts` | Si no se pasa o no existe, lanza error. |
| 4 | Validación de existencia del archivo fuente. | `fs.existsSync` | `if (!fs.existsSync(archivo)) { ... }` | ![Captura de tokens](./screenshots/1.png) | Asegura que el archivo exista antes de continuar. |
| 5 | Se lee el archivo fuente y se divide en líneas. | `fs.readFileSync`, `split('\n')` | `const code = fs.readFileSync(archivo, 'utf-8'); const lines = code.split('\n');` | Arreglo de líneas de código. | Fundamental para recorrer el código línea por línea. |
| 6 | Se definen las listas de palabras clave, tipos, operadores y delimitadores. | Constantes en arrays | `const keywords = [...]`, `const types = [...]` | - | Sirve como base para clasificar tokens. |
| 7 | Se inicializan las estructuras para tokens y tabla de símbolos. | `[]` vacíos | `const tokens = []; const symbolTable = [];` | - | Acumulan los resultados del análisis. |
| 8 | Se recorre cada línea y se aplica una expresión regular para extraer tokens. | `match(regex)` | `const regex = /"(.*?)"|.../g; const matches = line.match(regex);` | Tokens crudos de cada línea | Maneja strings, números, identificadores, símbolos, etc. |
| 9 | Se clasifica cada token según su tipo (Keyword, Type, Operator, etc). | Condiciones con `includes`, regex | `if (keywords.includes(token)) ...` | Lista con tipo, valor y línea | Clasificación fundamental del análisis léxico. |
| 10 | Se construye la tabla de símbolos detectando variables, funciones, interfaces y enums. | Condicionales en loop | `if (token === 'let' ...) { ... }` | Datos guardados: nombre, tipo, línea | Se identifica si es Variable, Function o Structure. |
| 11 | Se imprime la tabla de tokens, con o sin `cli-table3`. | `console.log` o `tokenTable.toString()` | `if (tieneCliTable) { ... } else { ... }` | Tabla con bordes o alineada con tabs | Adapta el formato según disponibilidad. |
| 12 | Se imprime la tabla de símbolos, con o sin `cli-table3`. | `console.log` o `symbolTableOutput.toString()` | `if (tieneCliTable) { ... } else { ... }` | Tabla con info de identificadores y funciones | Misma lógica adaptable que con los tokens. |

