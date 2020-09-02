exports.run = async (client, message, args) => {
    const pingMessage = await message.channel.send("🏓 **퐁!**");
    pingMessage.edit(`퐁! 핑 | ${pingMessage.createdTimestamp - message.createdTimestamp}ms. API 핑 |  ${Math.round(client.ws.ping)}ms`);
  }
