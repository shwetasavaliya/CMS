const user = require('./api/user')
const party = require('./api/party')

module.exports = {
    ...user,
    ...party
}