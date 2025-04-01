let edad: number = 30;
const nombre: string = "Juan";
var activo: boolean = true;

const colores: string[] = ["rojo", "verde", "azul"];
let coordenadas: [number, number] = [10, 20];

enum Estado {
    Activo,
    Inactivo,
    Pendiente
}

let estadoUsuario: Estado = Estado.Activo;

function saludar(nombre: string): string {
    return "Hola, " + nombre;
}

function error(): never {
    throw new Error("Error crítico");
}

function log(mensaje: string): void {
    console.log(mensaje);
}

interface Persona {
    nombre: string;
    edad: number;
    activo: boolean;
}

const persona1: Persona = {
    nombre: "Ana",
    edad: 28,
    activo: true
};

type Resultado = "ok" | "error" | number;

let respuesta: Resultado = "ok";

let datos: any = { foo: "bar" };
let desconocido: unknown;

if (typeof desconocido === "string") {
    console.log("Es un string");
}
