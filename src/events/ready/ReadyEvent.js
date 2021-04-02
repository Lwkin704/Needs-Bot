const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    let serverIn = await client.guilds.catch;
    console.log(client.user.tag + ' has logged in.');
    client.user.setPresence({ 
      activity: {
       name: `youtube`,
       type: "WATCHING" 
      },
    })
    .catch(console.error);
  }
}