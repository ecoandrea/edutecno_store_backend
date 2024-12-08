import { v4 as uuidv4 } from 'uuid'
import { query } from '../config/db.config.js';
import { DataBaseError } from '../errors/TypesError.js';
import { Validation } from '../utils/validate/Validate.js';
import { ValidationError } from '../errors/TypesError.js';


export class Usuario {
    constructor({ id, nombre, apellido_paterno, apellido_materno, email, telefono }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.email = email;
        this.telefono = telefono;
        this.active = true
    }

     //esta funcion va validacion por validacion, si encuentra error lo guarda en erros[], sino  encuentra hace return 
        //arroja todos los errores posibles ganando control en la app
    static validate(data) {
        const errors = [];

        const { nombre, apellido_paterno, apellido_materno, email, telefono } = data //no se puede reasignar string porque llega como objeto , hace un cambio implicito
        let nombreValido, apellido_paternoValido, apellido_maternoValido, emailValido, telefonoValido  //se soluciona con la version validada de data, son variables indefinida y abajo se pone el valor. 

        // Si pasa validacion devuelve el valor valido, el de antes pero validado

        try {
            nombreValido = Validation.isNonEmptyString(nombre, 'nombre');
            nombreValido = Validation.name(nombre, 'nombre');
        } catch (error) {
            errors.push(error.message)
        }

        try {
            apellido_paternoValido = Validation.isNonEmptyString(apellido_paterno, 'apellido_paterno');
            apellido_paternoValido = Validation.name(apellido_paterno, 'apellido_paterno');
        } catch (error) {
            errors.push(error.message);
        }

        try {
          apellido_maternoValido = Validation.isNonEmptyString(apellido_materno, 'apellido_paterno');
          apellido_maternoValido = Validation.name(apellido_materno, 'apellido_paterno');
        } catch (error) {
          errors.push(error.message);
        }

        try {
          emailValido = Validation.isNonEmptyString(email, 'email');
          emailValido = Validation.email(email);
        } catch (error) {
          errors.push(error.message);
        }

        try {
            telefonoValido = Validation.isNonEmptyString(telefono, 'telefono');
            telefonoValido = Validation.phone(telefono);
        } catch (error) {
            errors.push(error.message);
        }

        if(errors.length > 0) throw new ValidationError('Error al validar Usuario', errors)

            return {
                nombre: nombreValido,
                apellido_paterno: apellido_paternoValido,
                apellido_materno: apellido_maternoValido,
                email: emailValido,
                telefono: telefonoValido
            }

            //Lo que retorna no es el dato original , devuelve lo que es valido en la app, retorna un nuevo objeto con las mismas caractristicas , pero con valores validos

            //error se pushea al array errors[]
        }


        
    static async create(data) {
        try {

            Usuario.validate(data) // antes de hacer cualquier cosa va a validar

            const { nombre, apellido_paterno, apellido_materno, email, telefono } = data;
            const id = uuidv4();
            const active = true;

            const insertQuery = `
                INSERT INTO usuarios (id, nombre, apellido_paterno, apellido_materno, email, telefono, active)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `
            const values = [id, nombre, apellido_paterno, apellido_materno, email, telefono, active];

            const { rows } = await query(insertQuery, values);
            return rows[0]
        } catch (error) {
            throw new DataBaseError('Error al registrar el usuario en la base de datos', error)
        }
    }
}