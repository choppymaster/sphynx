const db = require('quick.db')

module.exports = {
  name: "setwelcome",
  description: "set a  channel for welcome messages",
  permissions: "MANAGE_GUILD",
  execute(message, args) {
  const channel = message.mentions.channels.first()
  if(!channel) return message.channel.send('You didnt mentioned a channel')
db.set(`welcome_${message.guild.id}_channel`, channel)
message.channel.send(`Welcome channel setted to ${channel}`)

   }
}