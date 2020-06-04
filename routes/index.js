const express = require('express');
const router  = express.Router();
const Empresa = require('../models/empresa')
const axios = require('axios')

/* GET home page */
router.get('/', (req, res, next) => {
  Empresa.find()
  .then(empresas => res.render('index', {empresas}))
  .catch(err => console.log(`Hubo un error ---> ${err}`))
});


router.post("/", (req, res, next) => {
  const key = 'M637VI4X3MRGVFSM';
  const functionName = 'TIME_SERIES_DAILY';
  const symbolName = req.body.empresa;
  const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;
 
  const nuevaEmpresa = new Empresa({symbolName, apiUrl});
  nuevaEmpresa.save()
  .then(empresa => res.redirect("/"))
  .catch(err => console.log(err));
});

module.exports = router;
