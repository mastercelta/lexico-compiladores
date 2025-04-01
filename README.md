# Compiladores - Taller 3 (Analizador Léxico JavaScript)

![commits](https://badgen.net/github/commits/mastercelta/lexico-compiladores?icon=github)
![last_commit](https://img.shields.io/github/last-commit/mastercelta/lexico-compiladores)
![language](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![Node.js](https://img.shields.io/badge/runtime-Node.js-green.svg)

## Autor

- Juan Camilo Peñaloza [@mastercelta](https://www.github.com/mastercelta)

## Descripción del Proyecto

**Taller 3** del curso **Compiladores**.  
El objetivo es desarrollar un programa en JavaScript (Node.js) que realice un **análisis léxico** de un fragmento de código fuente almacenado en un archivo independiente en TypeScript. El analizador identifica y clasifica **tokens** como:

- Palabras clave (`let`, `if`, `else`, `while`, `for`, `function`)
- Tipos de datos (`number`, `string`, `boolean`, `void`)
- Estructuras de control (`if`, `else`, `while`, `for`, `etc.`)
- Identificadores (variables y funciones)
- Operadores (`+`, `-`, `*`, `/`, `=`, `>`, `<`, `==`)
- Delimitadores (`;`, `{`, `}`, `(`, `)`)
- Cadenas de texto (`"texto"`)
- Números (enteros y decimales)

Además, el programa genera una **tabla de símbolos** con información sobre variables y funciones identificadas, incluyendo:

- Nombre
- Tipo de dato
- Tipo de token (Variable o Función)
- Número de línea donde aparece

El proyecto está desarrollado exclusivamente en **JavaScript con Node.js**.

---

## Instalación

### 1. Clonar el proyecto

```bash
git clone https://github.com/mastercelta/lexico-compiladores.git
cd lexico-compiladores
```
### 2. Instalar dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, instala las dependencias necesarias ejecutando:

Esta dependencia es opcional para ver la tabla mas bonita, si no tiene la dependencia, imprime una tabla sin formato.

```bash
npm install cli-table3
```

## Ejecución

### 3. Ejecutar el analizador léxico

Asegúrate de tener instalado [Node.js](https://nodejs.org/).

El archivo de entrada (por ejemplo, `codigofuente.js`) debe contener el código fuente que deseas analizar.

```bash
node analizador.js codigofuente.js
```

## Explicación del Código Paso a Paso

| Paso | Descripción | Función o Método | Fragmento de Código | Captura / Resultado | Observaciones |
|------|-------------|------------------|----------------------|----------------------|---------------|
| 1 | Leer archivo fuente desde línea de comandos | `fs.readFileSync` + `process.argv` | `const archivo = process.argv[2] || 'codigofuente.ts';` | Código cargado exitosamente | Se incluye validación si no existe |
| 2 | Dividir el contenido en líneas | `split('\n')` | `const lines = code.split('\n');` | Array de líneas | - |
| 3 | Tokenizar cada línea con expresión regular | `match(regex)` | `/"(.*?)"|...|[+\-*/%=!<>&|.:;,()[\]{}]/g` | Tokens detectados | Regex adaptado para múltiples casos |
| 4 | Clasificar tokens: keyword, identificador, operador, etc. | `if` conditions | `if (keywords.includes(token)) ...` | Lista de tokens clasificados | - |
| 5 | Construir tabla de símbolos | Condicionales en loop | `if (token === 'let' ...)` | Variables y funciones registradas | Mejorable con un parser real |
| 6 | Mostrar tokens en tabla | `cli-table3` o `console.log` | `console.log(tokenTable.toString())` | Tabla en consola | Usa fallback si no está instalado |
| 7 | Mostrar tabla de símbolos | `cli-table3` o `console.log` | `console.log(symbolTableOutput.toString())` | Tabla en consola | Igual que anterior |
