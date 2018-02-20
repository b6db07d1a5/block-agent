const express = require('express');
const async = require('async');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/users', (req, res) => {
  if (fs.existsSync('blockuser.json')) {
    fs.readFile('blockuser.json', 'utf8', function(err, data){
      if (err){
        console.log(err);
      }
      else {
        res.send({ data: JSON.parse(data) });
      }
    });
  }
  else {
    res.send({ data: {} })
  }
});

app.post('/api/users', (req, res) => {

  async.each(['blockuser.json', 'block-user-agent.inc', 'block-user-ip.inc'], function (file, callback) {

    fs.writeFile(file, fileType(file, req.body), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(file + ' was updated.');
        }
        callback();
    });

    }, function (err) {
        if (err) {
            console.log('A file failed to process');
        }
        else {
            console.log('All files have been processed successfully');
            res.send({ result: 'success' })
        }
    });
})

function fileType(file, users){
  switch(file) {
    case 'blockuser.json' :
      return JSON.stringify(users, null, 4);
    break;
    case 'block-user-agent.inc' :
      return exportUser(users);
    break;
    case 'block-user-ip.inc' :
      return exportIp(users);
    break;
    default :
      return ''
    break;

  }

}

function exportUser(users) {
  let usersStr = users.filter((filter) => filter.userType === 'agent' && filter.isExpire === false)
                    .map((user) => user.userName)
                    .join('|')

  return `if ($http_user_agent ~* (${usersStr}) ) {
      return 403;
}`
}

function exportIp(users) {
  let usersFiltered = users.filter((filter) => filter.userType === 'ip' && filter.isExpire === false)
  
  let denyStr = ''
  usersFiltered.forEach((user) => {
      denyStr += `Deny ${user.userName};\n`
  });
  return denyStr;
}

app.listen(port, (err) => {
  if (err) {
    console.log('err', err)
  } else {
    console.log(`Listening on port ${port}`)
  }
});