const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const request = require('request')
const client = require('mailchimp-marketing');
const https = require('https')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use('/', express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})

app.post('/', (req, res) => {
    var data = {
    	members: [
    		{
    			email_address: req.body.email,
    			status: 'subscribed',
    			merge_fields: {
    				FNAME: req.body.firstName,
    				LNAME: req.body.lastName
    			}
    		}
    	]
    }
    data = JSON.stringify(data)

    const url = "https://us14.api.mailchimp.com/3.0/lists/4291cb3b9f/"

    const options = {
    	method: "POST",
    	auth: "rotrixx:9b52e4fd764578c5252f2eac96e7c8eb-us14"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }
    })

request.write(data)
request.end()
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App running on port 3000')
})

// Mailchimp:
// * us14.api.mailchimp.com
// * apikey: 9b52e4fd764578c5252f2eac96e7c8eb-us14
// * audienceId: 4291cb3b9f