const fs = require('fs-extra')
const compareAsc = require('date-fns/compare_asc')

const {
    TYPE_USER_AGENT,
    TYPE_IP,
    allowTypes,
    blockedFileJson,
    blockedUserAgentConf,
    blockedIpConf,
  } = require('../constants')

let items = []

try {
    items = fs.readJsonSync(blockedFileJson)
} catch (error) {

}

Promise.all([
    fs.outputFile(blockedUserAgentConf, exportUser(items)),
    fs.outputFile(blockedIpConf, exportIp(items))
])

function exportUser(items) {
    const result = items.filter(item => item.type === TYPE_USER_AGENT && !isExpire(item.expireAt))
      .map(({ value }) => value)
      .join('|')

    if(result.length === 0) return '';
  
    return `if ($http_user_agent ~* (${result}) ) {
        return 403;
}`
}
  
function exportIp(items) {
  const result = items.filter((item) => item.type === TYPE_IP && !isExpire(item.expireAt))
  
  if(result.length === 0) return '';
  
  let denyStr = ''
  result.forEach(({ value }) => {
      denyStr += `Deny ${value};\n`
  });
  return denyStr;
}

function isExpire(date) {
  if(!date) return false;
  const result = compareAsc(
    new Date(),
    new Date(date)
  )
  return result >= 0
}