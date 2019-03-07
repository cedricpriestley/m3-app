const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const areaSchema = new Schema(
  {
    type: { type: String },
    type_id: { type: String },
    tags: [
      {
        name: { type: String, required: true },
        count: { type: Number, required: false }
      }
    ],
    id: { type: String, required: true },
    sort_name: { type: String },
    name: { type: String, required: true },
    life_span: {
      ended: { type: Boolean },
      begin: { type: String },
      end: { type: String }
    },
    aliases: [
      {
        begin: { type: String },
        type: { type: String },
        locale: { type: String },
        type_id: { type: String },
        sortName: { type: String },
        name: { type: String },
        end: { type: String },
        primary: { type: Boolean },
        ended: { type: Boolean }
      }
    ],
    disambiguation: { type: String },
    last_updated: { type: Date, default: Date.now },
  }
);

module.exports.area = mongoose.model('Area', areaSchema);
module.exports.areaType = mongoose.model('AreaType', areaTypeSchema);
module.exports.areaAliasType = mongoose.model('AreaAliasType', areaAliasTypeSchema);