# Explicación del Código Paso a Paso

| Paso | Descripción | Función o Método Implementado | Fragmento de Código | Captura / Resultado | Observaciones |
|------|-------------|-------------------------------|----------------------|----------------------|---------------|
| 1 | Se importa el módulo `fs` para trabajar con archivos. | `require('fs')` | `const fs = require('fs');` | - | Es necesario para leer el archivo fuente. |
| 2 | Se intenta importar `cli-table3` para mostrar tablas bonitas. Si falla, se usa tabla básica. | `require('cli-table3')` con `try/catch` | `let Table; let tieneCliTable = true; try { Table = require('cli-table3'); } catch (e) { ... }` | Advertencia en consola si no está instalado. | Permite flexibilidad y mejora la presentación. |
| 3 | Se recibe el nombre del archivo fuente desde los argumentos de la terminal. | `process.argv[2]` | `const archivo = process.argv[2];` | Recibe por ejemplo: `codigofuente.ts` | Si no se pasa o no existe, lanza error. |
| 4 | Validación de existencia del archivo fuente. | `fs.existsSync` | `if (!fs.existsSync(archivo)) { ... }` | Error: "Archivo no encontrado" | Asegura que el archivo exista antes de continuar. |
| 5 | Se lee el archivo fuente y se divide en líneas. | `fs.readFileSync`, `split('\n')` | `const code = fs.readFileSync(archivo, 'utf-8'); const lines = code.split('\n');` | Arreglo de líneas de código. | Fundamental para recorrer el código línea por línea. |
