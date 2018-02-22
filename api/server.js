const express = require('express');
const async = require('async');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const Joi = require('Joi')
const _ = require('lodash')
const uuidv1 = require('uuid/v1')
const compareAsc = require('date-fns/compare_asc')

const app = express();
const port = process.env.PORT || 5000;
const TYPE_USER_AGENT = 'userAgent'
const TYPE_IP = 'ip'
const allowTypes = [TYPE_USER_AGENT, TYPE_IP]
const blockedFileJson = 'conf/blocked.json'
const blockedUserAgentConf = 'conf/block-user-agent.inc'
const blockedIpConf = 'conf/block-user-ip.inc'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/blocked/:type', async (req, res) => {
  const type = req.params.type
  if(!allowTypes.includes(type)){
    return res.status(400).send({error: 'Invalid Type'})
  }

  try {
    const items = await fs.readJson(blockedFileJson)
    res.send({data: items.filter(item => item.type === type)})
  } catch (error) {
    return res.send({ data: []});
  }
})

app.post('/blocked', async (req, res) => {
  const body = req.body;

  const schema = Joi.object({
    type: Joi.any().valid(allowTypes).required(),
    value: body.type === 'ip'
      ? Joi.string().ip().required()
      : Joi.string().required(),
    expireAt: Joi.date().timestamp('unix')
  })

  const {error, value} = Joi.validate(body, schema)
  if(error) {
    return res.status(400).send({error: _.get(error, 'details[0].message')})
  }

  let items = []
  try {
    items = await fs.readJson(blockedFileJson)
  } catch (error) {}

  const item = {
    id: uuidv1(),
    ...value
  }

  items.push(item)

  try {
    await fs.writeJson(blockedFileJson, items)

    return res.send({data: item})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
})



////////

app.listen(port, (err) => {
  if (err) {
    console.log('err', err)
  } else {
    console.log(`Listening on port ${port}`)
  }
});