const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const empSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true

    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
        
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now 
    }
})

empSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
}) 

empSchema.methods.generateAuthToken = async function(req,res){
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;

    } catch (error) {
        // res.status(401).send(`the error part ${error}`)
        console.log('the error part' + error)
    }
}

const empModel =  new mongoose.model('empdata',empSchema)
module.exports = empModel