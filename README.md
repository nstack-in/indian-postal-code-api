# Indian Postal Code API

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nstack-in/indian-postal-code-api)

- /api/pin/ : Query all the States
- /api/pin/:state : Query All the Districts in selected State
- /api/pin/:state/:DistrictsName/ : Query All the city in selected District
- /api/pin/:state/:DistrictsName/:city : Query All the Post Office in selected city
- /api/pin/find/:Pincode: Query for the details of selected pin code.

> Here selected means the data which you passed in the URL