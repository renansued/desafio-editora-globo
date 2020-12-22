const userDB  = require('../models/userModel');

module.exports = {
  async getList(req, res) {

    const user = await userDB.find()
    .catch(error => res.status(500).json(error));

    if(user == null)
        res.status(404).json("Notícia não localizada.")
    else 
        return res.json(user)
  },
 
  async getById(req, res){

    const user = await userDB.findOne({ _id: req.params.id })
        .catch(error => res.status(500).json(error));

    if(user == null)
        res.status(404).json("Notícia não localizada.")
    else 
        return res.json(user)
  },
 
  async add(req, res){ 
    const novaNoticia = new userDB({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
      dataPublicacao: req.body.dataPublicacao
    });
  
    const user = await novaNoticia
      .save()
      .catch(error => {
        res.status(500).json(error)
      });

      if(user == null)
        res.status(404).json("Notícia não localizada.")
      else 
        return res.json(user)
  },
  
    async edit(req, res){
        const userAtualizada = { 
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            dataPublicacao: req.body.dataPublicacao 
        }
    
        const user = userDB.findOneAndUpdate({ _id: req.params.id }, userAtualizada, { new: true })
            .catch(error => res.status(500).json(error));

        if(user == null)
            res.status(404).json("Notícia não localizada.")
        else 
            return res.json(user)

    },

    async edit(req, res){
        const userAtualizada = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            dataPublicacao: req.body.dataPublicacao 
        }
        
        const user = await userDB.findOneAndUpdate({ _id: req.params.id }, userAtualizada, { new: true })
            .catch(error => res.status(500).json(error));
    
        if(user == null)
            res.status(404).json("Notícia não localizada.")
        else 
            return res.json(user)
    },

    async delete(req, res){
        const user = await userDB.findOneAndDelete({ _id: req.params.id })
            .catch(error => res.status(500).json(error));

        if(user == null)
            res.status(404).json("Notícia não localizada.")
        else 
            return res.json(user)
    }
}