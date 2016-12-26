# fmqbo-exporter


Exports data from QuickBooks Online using our [fmQBO](https://www.geistinteractive.com/products/filemaker-quickbooks-online-fmqbo/) data proxy. This is primarily for use with FileMaker with our fmQBO connection product. But it could be used for anything.

You can use a browser or anything else that can make a GET request.  Here is the format for getting "Items".

`https://exportcsv.fmqbo.com/Item.csv?apiKey=<your api key>`

Note the capital "I" in "Item" and no "s".

Here is the one for getting Customers.

`https://exportcsv.fmqbo.com/Customer.csv?apiKey=<your api key>`


Your api key is the one you get when you connect through fmQBO

## Internals

This is made using these awesome node modules and frameworks 

[micro](https://github.com/zeit/micro)
[request](https://github.com/request/request)
[request-promise](https://github.com/request/request-promise)

and deployed with now from [zeit](https://zeit.co/now)