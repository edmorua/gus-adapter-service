const express = require('express');
const router = express.Router();
const axios = require('axios');
const  GUS_URL =  process.env.GUS_URL
const {medicos}= require('../../temp/doctores');

/**
 * @route GET  api/v1/pacient
 * @desc  Get a pacient from GUS by CURP
 * @access Private - need a token
*/
router.post(
  '/',
  async (req,res) => {
    let body = req.body;
    if(!body.curp && !body.cedula){
      return res.status(400).json({errors: [{msg: "Curp or Cedula is required"}]});
    }
    try{
      for(var i = 0; i < doctores.length; i++){
        if(body.curp === doctores[i].curp || body.id === doctores[i].id){
          return res.json({Doctor: doctores[i]});
        }
      }
      return res.status(400).json({errors: [{msg: "Doctor not found"}]})
    }catch(error){
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
)
