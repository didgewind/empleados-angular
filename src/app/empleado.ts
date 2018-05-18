export class Empleado {
    id: number;
    cif: string;
    nombre: string;
    apellidos: string;
    edad: number;

    constructor(id = 0, cif = '', nombre = '', apellidos = '', edad = 0) {
        this.id = id;
        this.cif = cif;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
    }
}
