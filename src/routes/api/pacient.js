const express = require('express');
const router = express.Router();
const axios = require('axios');
const  GUS_URL =  process.env.GUS_URL
const fs = require('fs');
const dataRaw = fs.readFileSync('./temp/pacientes.json');
const data = JSON.parse(dataRaw);
/**
 * @route POST  api/v1/pacient
 * @desc  Get a pacient from GUS by CURP
 * @access Private - need a token
*/
router.post(
  '/',
  async (req,res) => {
    let body = req.body;
    console.log(body);
    console.log(data);
    let pacientes = data.pacientes;
    if(!body.curp && !body.id ){
      return res.status(400).json({errors: [{msg: "Curp or Id is required"}]});
    }
    try{
      for(var i = 0; i < pacientes.length; i++){
        if(body.curp === pacientes[i].curp || body.id === pacientes[i].id){
          return res.json({paciente: pacientes[i]});
        }
      }
      return res.status(400).json({errors: [{msg: "Pacient not found"}]})
    }catch(error){
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
)


router.put(
  '/',
  async (req,res) => {
    let body = req.body;
    console.log(body);
    if(!body.paciente){
      return res.status(400).json({error: { msg: "paciente object is required"}})
    }
    let pacientes = []
    let paciente = body.paciente;
    if(!paciente.curp) return res.status(400).json({error: { msg: " curp is required"}})
    if(!paciente.nombre) return res.status(400).json({error: { msg: " nombre is required"}}) 
    if(!paciente.aPaterno) return res.status(400).json({error: { msg: "apellido paterno is required"}})
    if(!paciente.aMaterno) return res.status(400).json({error: { msg: " apellido materno is required"}})
    if(!paciente.sexo) return res.status(400).json({error: { msg: "sexo is required"}});
    pacientes = data.pacientes;
    let id = pacientes[pacientes.length-1].id + 1;
    paciente.id = id;
    pacientes.push(paciente);
    let jsonData = {pacientes: pacientes};
    fs.writeFileSync('./temp/pacientes.json',JSON.stringify(jsonData));
    return res.status(200).json({msg: 'paciente agregado exitosamente', id: id});
  }
)


module.exports = router;