const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empresaSchema = new Schema(
  {
    name: String,
    symbolName: String,
    apiUrl: String
  }
);

const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;