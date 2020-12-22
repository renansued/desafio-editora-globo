const newsDB = require('../models/newsModel');

module.exports = {
  async getList(req, res) {

    const news = await newsDB.find()
    .catch(error => res.status(500).json(error));

    if(news == null)
        res.status(404).json({errorCode:404,message:"Notícia não localizada."})
    else 
        return res.json(news)
  },
 
  async getById(req, res){

    const news = await newsDB.findOne({ _id: req.params.id })
        .catch(error => res.status(500).json(error));

    if(news == null)
        res.status(404).json({errorCode:404,message:"Notícia não localizada."})
    else 
        return res.json(news)
  },
 
  async add(req, res){ 
    const novaNoticia = new newsDB({
      title: req.body.title,
      content: req.body.content,
      publishDate: req.body.publishDate
    });
  
    const news = await novaNoticia
      .save()
      .catch(error => {
        res.status(500).json(error)
      });

      if(news == null)
        res.status(404).json({errorCode:404,message:"Notícia não localizada."})
      else 
        return res.json(news)
    },

    async edit(req, res){
        const newsAtualizada = {
            title: req.body.title,
            content: req.body.content,
            publishDate: req.body.publishDate
        }
        
        const news = await newsDB.findOneAndUpdate({ _id: req.params.id }, newsAtualizada, { new: true })
            .catch(error => res.status(500).json(error));
    
        if(news == null)
            res.status(404).json({errorCode:404,message:"Notícia não localizada."})
        else 
            return res.json(news)
    },

    async delete(req, res){
        const news = await newsDB.findOneAndDelete({ _id: req.params.id })
            .catch(error => res.status(500).json(error));

        if(news == null)
            res.status(404).json({errorCode:404,message:"Notícia não localizada."})
        else 
            return res.json(news)
    }
}