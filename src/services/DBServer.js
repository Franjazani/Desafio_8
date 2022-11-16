import knex from 'knex';
import dbConfig from '../../knexfile';

class DB {
  constructor() {
      const environment = process.env.NODE_ENV || 'development'; //variable de entorno, en funcion de esa variable se exporta el objeto que esta en knexfile
      
    console.log(`SETTING ${environment} DB`);//segun el objeto que usemos (opcion o development) de knexfile.js se inicializa la BD
      const options = dbConfig[environment];
      
    this.connection = knex(options);// this.connection representa a knex
    }

    //inicializacion

     init() {
        //hasTable es la funcion que te dice si existe o no
    this.connection.schema.hasTable('productos').then((exists) => {//pregunta si un producto existe o no en una base de datos
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable(
        'productos',
        async (productosTable) => {// si la tabla de productos NO EXISTE, la creamos
          productosTable.increments();
          productosTable.string('nombre').notNullable();
          productosTable.string('descripcion').notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.decimal('precio', 4, 2);//4 digitos y 2 decimales
          productosTable.timestamps(true, true);
          
          const initProducts = [
            {
              nombre: 'Artesano Malbec',
              descripcion: 'Vino tinto Manos Negras',
              stock: 20,
              precio: '3300',
              
            },
            {
              nombre: 'Buescapleito Cabernet Franc',
              descripcion: 'Vino tinto Bodega Azul',
              stock: 15,
              precio: '1950',
              
            },
          ];
          await Promise.all(createProducts);
        }
      );
    });
  }

    
    get(tablaVinos, id) {
    if (id) return this.connection(tablaVinos).where('id', id);

    return this.connection(tablaVinos);
  }

  create(tablaVinos, data) {
    return this.connection(tablaVinos).insert(data);
  }

  update(tablaVinos, id, data) {
    return this.connection(tablaVinos).where('id', id).update(data);
  }

  delete(tablaVinos, id) {
    return this.connection(tablaVinos).where('id', id).del();
  }
}

export const DBService = new DB();