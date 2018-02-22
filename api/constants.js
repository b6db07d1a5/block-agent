const TYPE_USER_AGENT = 'userAgent'
const TYPE_IP = 'ip'
const allowTypes = [TYPE_USER_AGENT, TYPE_IP]
const blockedFileJson = 'conf/blocked.json'
const blockedUserAgentConf = 'conf/block-user-agent.inc'
const blockedIpConf = 'conf/block-user-ip.inc'

exports.TYPE_USER_AGENT = TYPE_USER_AGENT
exports.TYPE_IP = TYPE_IP
exports.allowTypes = allowTypes
exports.blockedFileJson = blockedFileJson
exports.blockedUserAgentConf = blockedUserAgentConf
exports.blockedIpConf = blockedIpConf