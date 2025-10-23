const {
    listarFotos,
    obtenerFotoById,
    crearFoto,
    actualizarFoto,
    eliminarFoto} = require('../service/foto.service');

async function getFotos(req,res){
    try {
        const fotos = await listarFotos();
        res.json(fotos);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getFoto(req, res){
    try {
        const {id} = req.params;
        const foto = await obtenerFotoById(id);
        if(!foto) return res.status(404).json({error: 'Foto no encontrada'});
        res.json(foto);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function createFoto(req, res){
    try {
        const foto = await crearFoto(req.body);
        res.status(201).json(foto);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function updateFoto(req, res){
    try {
        const {id} = req.params;
        const resultado = await actualizarFoto(id, req.body);
        if(resultado.changes === 0) return res.status(404).json({error: 'Foto no encontrada'});
        res.json({message: 'Foto actualizada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function deleteFoto(req, res){
    try {
        const {id} = req.params;
        const resultado = await eliminarFoto(id);
        if(resultado.chages === 0) return res.status(404).json({error: 'Foto no encontrada'});
        res.json({message: 'Foto eliminada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function uploadFoto(req, res) {
  try {
    // Verifica si hay archivos
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Al menos un archivo requerido' });
    }
    //verifica que se maximo 4 archivos
    if (req.files.length > 4) {
      return res.status(400).json({ error: 'Máximo 4 archivos permitidos' });
    }

    const { id_publicacion } = req.body;
    if (!id_publicacion) {
      return res.status(400).json({ error: 'id_publicacion requerido' });
    }

    const idPub = parseInt(id_publicacion);
    const fotosSubidas = [];

    // Procesa cada archivo en paralelo
    const promesas = req.files.map(async (file) => {
      const url = `/uploads/${file.filename}`;
      const foto = await crearFoto({ id_publicacion: idPub, url });

      return {
        id: foto.id,
        url: url,
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      };
    });

    const resultados = await Promise.all(promesas);
    fotosSubidas.push(...resultados);

    res.status(201).json({
      message: `${fotosSubidas.length} foto(s) subidas exitosamente`,
      fotos: fotosSubidas,
      publicacion_id: idPub
    });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Un archivo es demasiado grande (máx 5MB)' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ error: 'Demasiados archivos (máx 4)' });
      }
      return res.status(400).json({ error: 'Error en upload: ' + err.message });
    }
    res.status(400).json({ error: err.message });
  }
}


//controller --> router
module.exports = {
    getFotos,
    getFoto,
    createFoto,
    updateFoto,
    deleteFoto,
    uploadFoto
};
