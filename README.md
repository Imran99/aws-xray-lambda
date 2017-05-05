### Usage
* Deploy the api via sls deploy
* Create a secrets.yml file with an API_KEY field. Add the key provided after deployment
* If you are using usage plans, add the api and stage to your usage plan via the api-g console
* Enable tracing on lambda a via the lambda management console
* Make an inital post request to api a and check the x-ray console for a service map and trace info

### More Info
AWS X-Ray SDK docs: https://www.npmjs.com/package/aws-xray-sdk-core