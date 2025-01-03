const Joi = require('joi');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/validate', (req, res) => {
    const { error , value} = validateCredentials(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
    }
    res.send("<html><script> alert('Validation successful!!!')</script></html>");
});

function validateCredentials(credentials){
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': '<html><script>alert("Please provide a valid email address!!")</script></html>',
                'string.empty': '<html><script>alert("Email cannot be empty.")</script><html>'
            }),
        password: Joi.string()
            .min(8) 
            .required()
            .messages({
            'string.min':  '<html><script> alert("Password must be at least 8 characters long.")</script><html>',
            'string.empty':'<html><script> alert("Password cannot be empty.")</script><html>',
            'string.max':  '<html><script> alert("Password must be no longer than 30 characters.")</script><html>'
            })
    });
    return schema.validate(credentials);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));