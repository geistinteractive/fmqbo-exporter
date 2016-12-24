'use strict';

const rp = require('request-promise');



module.exports = (apiKey) => {

  const getAll = (query, transform) => {

    let all  = [];

    const get = (start, max) => {

      //make the request
      return r({
        qs : {
          query : `${query} STARTPOSITION ${start} MAXRESULTS ${max}`,
        },
        uri : ''
      })
        // transform and concat results
        .then(result=>{
          const arr = transform(result);
          all = all.concat( arr );
          return arr
        })

        // test if we should repeat
        .then(result=>{
          if (result.length === max) {
            start += max;
            return get(start, max);
          } else {
            //done
            return all;
          }
        })
    }


    return get(1, 500)

  };



  const r = rp.defaults({
    baseUrl : 'https://proxy.fmqbo.com/qbo/query',
    auth : {
      user : apiKey,
      pass : 'x',
      sendImmediately : true,
    },
    json : true
  });

  return {
    Items : ()=>{
      return getAll('Select * From Item', (response=>{
        return response.QueryResponse.Item
      }))
    },

    Customers : ()=>{
      return getAll('Select * From Customer', (response=>{
        return response.QueryResponse.Customer
      }))
    },

    Accounts : ()=>{
      return getAll('Select * From Account', (response=>{
        return response.QueryResponse.Account
      }))
    },

  }



};