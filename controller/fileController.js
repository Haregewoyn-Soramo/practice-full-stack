const  mongoose  = require('mongoose')
const File = require('../models/fileModels')

const getUserName = async (req, res)=>{
    try {
        const userName = await File.find({}).sort({createdAt: -1})
        res.status(200).json(userName) 
    } catch (error) {
        res.status(500).json({msg: "server error"})
       console.log('server error: ', error) 
    }
}
const updateUserFile = async (req, res)=>{
      try {
        
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id) ){
            return res.status(404).json({error: 'no such ID'})
        }
        const updateUserFile = await File.findByIdAndUpdate(id, {...req.body })
        if(!updateUserFile){
            return  res.status(404).json({error: 'no such user'}) 
        }
        res.status(200).json(updateUserFile)
      } catch (error) {
        res.status(500).json({msg: 'server error'} )
        console.log('server error: ', error) 
      }
}   
const deleteUserFile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'No such ID' });
        }
        const deleteUser = await File.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ msg: "No item found" });
        }
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
        console.log('Server error: ', error);
    }
}

const addUserFile = async (req, res) => {
    try {
        const { name, age, gender, email, phone, ethnicity } = req.body;

        
        let emptyField = [];

        if (!name) {
            emptyField.push('name');
        }
        if (!email) {
            emptyField.push('email');
        }
        if (!phone) {
            emptyField.push('phone');
        }
        if (!ethnicity) {
            emptyField.push('ethnicity');
        }
        if (!gender) {
            emptyField.push('gender');
        }
        if (!age) {
            emptyField.push('age');
        }

        
        if (emptyField.length > 0) {
            return res.status(400).json({ msg: `Missing fields: ${emptyField.join(', ')}` });
        }

      
        const newUser = await File.create({ name, age, gender, email, phone, ethnicity });
      
        await newUser.save();

       
        res.status(200).json(newUser);
    } catch (error) {
        console.log('server error', error);
        res.status(500).json({ error: "Cannot create new user account" });
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'Invalid ID format' });  // Return here
        }
        const userById = await File.findById(id);
        if (!userById) {
            return res.status(404).json({ msg: 'No user found with that ID' });  
        }
        res.status(200).json(userById);
    } catch (error) {
        console.log('Error occurred: ', error);
        res.status(500).json({ msg: 'Server error' });
    }
}


module.exports = {getUserName,updateUserFile, deleteUserFile, addUserFile, getUserById}