const fs = require('fs-extra')


const blockedUserAgentConf = 'conf/block-user-agent.inc'
const blockedIpConf = 'conf/block-user-ip.inc'

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
    if(items.length === 0) return '';
    const result = items.filter(item => item.type === TYPE_USER_AGENT && !isExpire(item.expireAt))
      .map(({ value }) => value)
      .join('|')
  
    return `if ($http_user_agent ~* (${result}) ) {
        return 403;
  }`
  }
  
  function exportIp(items) {
    const result = items.filter((item) => 
                          item.type === TYPE_IP && 
                          !isExpire(item.expireAt))
    
    let denyStr = ''
    result.forEach(({ value }) => {
        denyStr += `Deny ${value};\n`
    });
    return denyStr;
  }

  function isExpire(date) {
    if(!date) return false;
    const result = compareAsc(
      new Date(date),
      new Date()
    )
    return result >= 0
  }