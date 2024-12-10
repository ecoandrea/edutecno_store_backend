import { v4 as uuidv4 } from "uuid";
import { DataBaseError } from "../errors/TypesError.js";
import { Validation } from "../utils/validate/Validate.js";
import { ValidationError } from "../errors/TypesError.js";
import {
  createRecord,
  findActiveRecordById,
  findAllActiveRecords,
  findRecordByFilter,
} from "../utils/crud/crudUtils.js";

export class Usuario {
  constructor({
    id,
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    telefono,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.email = email;
    this.telefono = telefono;
    this.active = true;
  }

  //esta funcion va validacion por validacion, si encuentra error lo guarda en erros[], sino  encuentra hace return
  //arroja todos los errores posibles ganando control en la app
  static validate(data) {
    const errors = [];

    const { nombre, apellido_paterno, apellido_materno, email, telefono } =
      data; //no se puede reasignar string porque llega como objeto , hace un cambio implicito
    let nombreValido,
      apellido_paternoValido,
      apellido_maternoValido,
      emailValido,
      telefonoValido; //se soluciona con la version validada de data, son variables indefinida y abajo se pone el valor.

    // Si pasa validacion devuelve el valor valido, el de antes pero validado

    try {
      nombreValido = Validation.isNonEmptyString(nombre, "nombre");
      nombreValido = Validation.name(nombre, "nombre");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      apellido_paternoValido = Validation.isNonEmptyString(
        apellido_paterno,
        "apellido_paterno"
      );
      apellido_paternoValido = Validation.name(
        apellido_paterno,
        "apellido_paterno"
      );
    } catch (error) {
      errors.push(error.message);
    }

    try {
      apellido_maternoValido = Validation.isNonEmptyString(
        apellido_materno,
        "apellido_paterno"
      );
      apellido_maternoValido = Validation.name(
        apellido_materno,
        "apellido_paterno"
      );
    } catch (error) {
      errors.push(error.message);
    }

    try {
      emailValido = Validation.isNonEmptyString(email, "email");
      emailValido = Validation.email(email);
    } catch (error) {
      errors.push(error.message);
    }

    try {
      telefonoValido = Validation.isNonEmptyString(telefono, "telefono");
      telefonoValido = Validation.phone(telefono);
    } catch (error) {
      errors.push(error.message);
    }

    if (errors.length > 0)
      throw new ValidationError("Error al validar Usuario", errors);

    return {
      nombre: nombreValido,
      apellido_paterno: apellido_paternoValido,
      apellido_materno: apellido_maternoValido,
      email: emailValido,
      telefono: telefonoValido,
    };

    //Lo que retorna no es el dato original , devuelve lo que es valido en la app, retorna un nuevo objeto con las mismas caractristicas , pero con valores validos

    //error se pushea al array errors[]
  }

  static async create(data) {
    try {
      //Usuario.validate(data) // antes de hacer cualquier cosa va a validar

      //para agregar id, active que se autogeneran, con createRecord no vienen esos datos
      const id = uuidv4();
      const active = true;

      const user = { id, ...data, active }; //se construye objeto nuevo que tiene el id que se creo, todo el contenido de data y el active

      const userRecorded = await createRecord("usuarios", user); //va nombre de tabla (usuario) y la data en formato de objeto
      return userRecorded;
    } catch (error) {
      throw new DataBaseError(
        "Error al registrar el usuario en la base de datos",
        error
      );
    }
  }

  static async findAllActive() {
    try {
      const users = await findAllActiveRecords("usuarios");
      return users;
    } catch (error) {
      throw new DataBaseError(
        `Error al obtener los registros de los usuarios en la base de datos`,
        error
      );
    }
  }

  static async findActiveById(id) {
    try {
      const user = await findActiveRecordById("usuarios", id);
      return user;
    } catch (error) {
      throw new DataBaseError(
        `No pudimon encontrar el usuario con el id ${id}`,
        error
      );
    }
  }

  static async find(filters, condition) {
    try {
      const users = await findRecordByFilter("usuarios", filters, condition);
      return users;
    } catch (error) {
      throw new DataBaseError(
        `
                    No pudimos encontrar usuarios a traves de los filtros: 
                    ${JSON.stringify(filters)}

                    y la condición ${condition}
                `,
        error
      );
    }
  }
}
