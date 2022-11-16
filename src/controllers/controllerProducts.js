import { DBService } from '../services/DBServer';

const tablaVinos = 'productos';

export const checkBodyProduct = async (req, res, next) => {
  const { nombre, descripcion, stock, precio} = req.body;

  if (!nombre || !descripcion || !stock || !precio)
    return res.status(400).json({
      msg: 'Faltan datos',
    });

  next();
};

export const getAllProducts = async (req, res) => {
    try {
        const items = await DBService.get(tablaVinos);

        res.json({ data: items, });
        
    } catch (error) {
        res.status(400).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

export const getProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const item = await DBService.get(tablaVinos, id);
        
        res.json({ data: item, });
        
    } catch (error) {
        res.status(400).json({
            msgs: 'No se encontro el producto!',
        });
    }
}
export const createProduct = async(req, res) => {
    try {
        const { nombre, descripcion, stock, precio } = req.body;

    const data = {
      nombre,
      descripcion,
      stock,
      precio      
    };

    const newId = await DBService.create(tablaVinos, data);

    const newProduct = await DBService.get(tablaVinos, newId);

    res.json({
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, stock, precio } = req.body;

    let item = await DBService.get(tablaVinos, id);

    if (!item.length)
      return res.status(404).json({
        msgs: 'No se encontro el producto!',
      });

    const data = {
      nombre,
      descripcion,
      stock,
      precio      
    };

    DBService.update(tablaVinos, id, data);

    item = await DBService.get(tablaVinos, id);
    res.json({
      msg: 'Producto actualizado',
      item,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        DBService.delete(tablaVinos, id);
        res.json({
            msg: 'Producto Borrado',
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};