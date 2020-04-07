const express = require('express');
const router = express.Router();
const axios = require('axios');
const  GUS_URL =  process.env.GUS_URL
const {pacientes}= require('../../temp/temp');

/**
 * @route GET  api/v1/pacient
 * @desc  Get a pacient from GUS by CURP
 * @access Private - need a token
*/
router.post(
  '/',
  async (req,res) => {
    let body = req.body;
    if(!body.curp && !body.id ){
      return res.status(400).json({errors: [{msg: "Curp or Id is required"}]});
    }
    try{
      for(var i = 0; i < pacientes.length; i++){
        if(body.curp === pacientes[i].curp || body.id === pacientes[i].id){
          return res.json({paciente: pacientes[id]});
        }
      }
      return res.status(400).json({errors: [{msg: "Pacient not found"}]})
    }catch(error){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)



module.exports = router;