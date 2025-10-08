const {proponerTransaccion, listarTransacciones, cambiarEstado} = require('../service/transaccion.service');

async function proponer(req, res){
    try {
        const nuevo = await proponerTransaccion(req.body);
        res.status(201).json({message:'Intercambio creado', transaccion:nuevo});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

async function listar(req, res){
    try {
        const list = await listarTransacciones();
        res.json(list);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function actualizarEstado(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    if (!estado) return res.status(400).json({ error: 'Falta estado' });

    const result = await cambiarEstado(id, estado);
    if (result.update === 0) return res.status(404).json({ error: 'Transacción no encontrada' });
    res.json({ message: 'Estado Actualizado', result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = {proponer, listar, actualizarEstado};