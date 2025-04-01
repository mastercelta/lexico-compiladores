const fs = require('fs');
let Table;
let tieneCliTable = true;

const archivo = process.argv[2];

if (!fs.existsSync(archivo)) {
    console.error(`Archivo no encontrado: ${archivo}`);
    process.exit(1);
}

try {
    Table = require('cli-table3');
} catch (e) {
    tieneCliTable = false;
    console.warn('\n⚠️  cli-table3 no está instalado. Usando tabla básica.\nPuedes instalarlo con: npm install cli-table3\n');
}

const code = fs.readFileSync(archivo, 'utf-8');
const lines = code.split('\n');

const keywords = [
    'let', 'const', 'var', 'function', 'interface', 'enum',
    'return', 'throw', 'if', 'else', 'typeof'
];
const types = [
    'number', 'string', 'boolean', 'void', 'any', 'unknown', 'never'
];
const operators = [
    '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=',
    '+', '-', '*', '/', '%', '&&', '||', '!', ':', '=>', '.'
];
const delimiters = [';', ',', '(', ')', '{', '}', '[', ']'];
const symbolTable = [];
const tokens = [];

let lineNumber = 0;

for (const line of lines) {
    lineNumber++;
    const regex = /"(.*?)"|'(.*?)'|[A-Za-z_][\w]*|\d+\.\d+|\d+|==|===|!=|!==|<=|>=|=>|[+\-*/%=!<>&|.:;,()[\]{}]/g;
    const matches = line.match(regex);
    if (!matches) continue;

    for (let i = 0; i < matches.length; i++) {
        const token = matches[i];
        let type = 'Identifier';

        if (keywords.includes(token)) type = 'Keyword';
        else if (types.includes(token)) type = 'Type';
        else if (operators.includes(token)) type = 'Operator';
        else if (delimiters.includes(token)) type = 'Delimiter';
        else if (/^\d+(\.\d+)?$/.test(token)) type = 'Number';
        else if (/^".*"$|^'.*'$/.test(token)) type = 'String';

        tokens.push({ type, value: token, line: lineNumber });

        // Tabla de símbolos (simplificada)
        if (
            (token === 'let' || token === 'const' || token === 'var') &&
            /^[A-Za-z_][\w]*$/.test(matches[i + 1])
        ) {
            const name = matches[i + 1];
            const nextTypeIndex = matches.indexOf(':', i + 1);
            const declaredType = nextTypeIndex !== -1 ? matches[nextTypeIndex + 1] : 'unknown';

            symbolTable.push({
                name,
                dataType: declaredType,
                tokenType: 'Variable',
                line: lineNumber
            });
        }

        if (
            token === 'function' &&
            /^[A-Za-z_][\w]*$/.test(matches[i + 1])
        ) {
            symbolTable.push({
                name: matches[i + 1],
                dataType: 'function',
                tokenType: 'Function',
                line: lineNumber
            });
        }

        if (
            token === 'interface' &&
            /^[A-Za-z_][\w]*$/.test(matches[i + 1])
        ) {
            symbolTable.push({
                name: matches[i + 1],
                dataType: 'interface',
                tokenType: 'Structure',
                line: lineNumber
            });
        }

        if (
            token === 'enum' &&
            /^[A-Za-z_][\w]*$/.test(matches[i + 1])
        ) {
            symbolTable.push({
                name: matches[i + 1],
                dataType: 'enum',
                tokenType: 'Structure',
                line: lineNumber
            });
        }
    }
}

if (tieneCliTable) {
    const tokenTable = new Table({ head: ['Tipo', 'Valor', 'Línea'], style: { head: ['cyan'] } });
    tokens.forEach(t => tokenTable.push([t.type, t.value, t.line]));
    console.log('\nTokens detectados:\n');
    console.log(tokenTable.toString());
} else {
    console.log('\nTokens detectados:\n');
    console.log('Tipo\t\tValor\t\tLínea');
    tokens.forEach(t => {
        const tType = t.type.padEnd(10);
        const tVal = t.value.padEnd(10);
        console.log(`${tType}\t${tVal}\t${t.line}`);
    });
}

if (tieneCliTable) {
    const symbolTableOutput = new Table({ head: ['Nombre', 'Tipo', 'Tipo de Token', 'Línea'], style: { head: ['green'] } });
    symbolTable.forEach(s => symbolTableOutput.push([s.name, s.dataType, s.tokenType, s.line]));
    console.log('\nTabla de Símbolos:\n');
    console.log(symbolTableOutput.toString());
} else {
    console.log('\nTabla de Símbolos:\n');
    console.log('Nombre\t\tTipo\t\tTipo de Token\tLínea');
    symbolTable.forEach(s => {
        const name = s.name.padEnd(10);
        const dt = s.dataType.padEnd(10);
        const tt = s.tokenType.padEnd(14);
        console.log(`${name}\t${dt}\t${tt}\t${s.line}`);
    });
}