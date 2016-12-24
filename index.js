'use strict';

const {send, sendError} = require('micro');
const fmqbo = require('./local_modules/fmqbo');
const QBOSchema = require('./local_modules/QBOSchema')
const url = require('url');
const path = require('path');
const qs = require('querystring');



module.exports = async function (req, res) {

  const urlObj = url.parse(req.url);
  const pathObj = path.parse(urlObj.pathname);
  const fileName = pathObj.base;
  const entity = pathObj.name;
  const query = qs.parse(urlObj.query)

  const r = fmqbo(query.apiKey);

  try{
    const data = await r(entity);
    const csv = QBOSchema.csv(entity, data)
    res.setHeader('Content-Type', 'application/csv');
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);

    send(res, 200, csv )
  }catch(e){
    sendError(req, res, e)
  }


};