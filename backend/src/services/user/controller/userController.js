const userDB  = require('../models/userModel');

module.exports = {

    async getList(req, res) {

        const user = await userDB.find()
            .catch(error => res.status(500).json(error));

        if(user == null)
            return res.status(404).json({errorCode:404,message:"Usuário não localizado."})
        else 
            return res.json(user)
    },
 
    async getById(req, res){

        const user = await userDB.findOne({ _id: req.params.id })
            .catch(error => res.status(500).json(error));

        if(user == null)
            res.status(404).json({errorCode:404,message:"Usuário não localizado."})
        else 
            return res.json(user)
    },

    async add(req, res){ 
        const newUser = new userDB({
            name: req.body.name,
            login: req.body.login,
            password: req.body.password
        });
  
        const user = await newUser
            .save()
            .catch(error => {
            res.status(500).json(error)
            });

        if(user == null)
            res.status(404).json({errorCode:404,message:"Usuário não localizado."})
        else 
            return res.json(user)
    },
  
    async edit(req, res){
        const userUpdated = { 
            name: req.body.name,
            login: req.body.login,
            password: req.body.password
        }
    
        const user = await userDB.findOneAndUpdate({ _id: req.params.id }, userUpdated, { new: true })
            .catch(error => res.status(500).json(error));

        if(user == null)
            res.status(404).json({errorCode:404,message:"Usuário não localizado."})
        else 
            return res.json(user)

    },

    async delete(req, res){
        const user = await userDB.findOneAndDelete({ _id: req.params.id })
            .catch(error => res.status(500).json(error));

        if(user == null)
            res.status(404).json({errorCode:404,message:"Usuário não localizado."})
        else 
            return res.json(user)
    }
}