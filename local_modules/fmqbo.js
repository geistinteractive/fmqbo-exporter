'use strict';

const rp = require('request-promise');
const QBOSchema = require('./QBOSchema')



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
    };


    return get(1, 1000)

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

  return (Entity)=>{
      return getAll(QBOSchema.select(Entity), (response=>{
        return response.QueryResponse[Entity]
      }))
    }


};