export class Empleado {
    cif: string;
    nombre: string;
    apellidos: string;
    edad: number;

    constructor(cif = '', nombre = '', apellidos = '', edad = 0) {
        this.cif = cif;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
    }
}
