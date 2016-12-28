'use strict';
/**
 * Created by toddgeist on 12/24/16.
 */
const json2CSV = require('json2csv');

const fields = {
  Item : ['Id', 'Name', 'Description', 'Active', 'Taxable', 'UnitPrice', 'Type' ],
  Customer : ['Taxable','Job','Balance','Id','FullyQualifiedName','DisplayName','PrintOnCheckName','Active','GivenName','FamilyName','CompanyName','Title'],
  Term : ['Id', 'Name', 'Active','DiscountPercent','DueDays','DiscountDays' ],
  Invoice : ['Id', 'DocNumber' ]
};



module.exports = {

  select(name){

    const f = fields[name] ? fields[name] : "*";
    return `SELECT ${f} FROM ${name}`
  },

  csv(name, data){
    const f = fields[name];
    if(f) return json2CSV({data, fields: f})

    return json2CSV({data})
  }

};
