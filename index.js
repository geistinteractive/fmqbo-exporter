'use strict';

const {send} = require('micro');
const fmqbo = require('./local_modules/fmqbo');
const json2CSV = require('json2CSV');

const r = fmqbo('kXXX');

module.exports = async function (req, res) {

  const entity = 'Items'

  const data = await r[entity]();

  const csv = json2CSV({data});

  res.setHeader('Content-Type', 'application/csv');
  res.setHeader('Content-disposition', `attachment; filename=${entity}.csv`);

  send(res, 200, csv)

};

