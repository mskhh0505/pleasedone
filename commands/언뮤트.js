exports.run = async (client, message, args) => {
  if(message.member.roles.cache.some(role => ['Bot access'].includes(role.name))) {
    const mention =
      (await message.mentions.members.first()) ||
      (await message.guild.members.cache.get(args[0]));
    if(mention) {
      if(!mention.roles.cache.some(role => ["Bot access"].includes(role.name))) {
        if(message.member.roles.highest.position > mention.roles.highest.position) {
          if(mention.manageable) {
            const muted = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(muted) {
              if(mention.roles.cache.some(role => ['Muted'].includes(role.name))) {
                if(message.guild.me.hasPermission("MANAGE_ROLES")) {
                  if(mention.id != message.author.id) {
                    mention.roles.remove(muted)
                    message.channel.send({embed: {
                      color: 9240450,
                      description: `성공적으로 언뮤트 <@${mention.id}>!`,
                      author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                      }
                    }})
                    if(process.env.logchannelid === 'false') return;
                    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
                    if(args[1]) {
                      return logchannel.send({embed: {
                        color: 2127726,
                        description: `<@${message.author.id}> (${message.author.tag}) unmuted <@${mention.id}> (${mention.user.tag}) with reason ${args.slice(1).join(" ")}.`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        },
                        footer: {
                          text: 'Mute Logs'
                        },
                        timestamp: new Date(),
                      }})
                    } else {
                      return logchannel.send({embed: {
                        color: 2127726,
                        description: `<@${message.author.id}> (${message.author.tag}) unmuted <@${mention.id}> (${mention.user.tag}) with no reason.`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        },
                        footer: {
                          text: 'Mute Logs'
                        },
                        timestamp: new Date(),
                      }})
                    }
                  } else return message.channel.send({embed: {
                    color: 16733013,
                    description: `자기 자신에게 사용할 수 없습니다.`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }})
                } else return message.channel.send({embed: {
                  color: 16733013,
                  description: `역할 관리 권한이 필요합니다.`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
              } else return message.channel.send({embed: {
                color: 16733013,
                description: `해당 유저는 뮤트가 아닙니다.`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
            } else return message.channel.send({embed: {
              color: 16733013,
              description: `뮤트 역할이 없습니다.`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }})
          } else return message.channel.send({embed: {
            color: 16733013,
            description: `권한이 충분하지 않습니다.!`,
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
            }
          }})
        } else return message.channel.send({embed: {
          color: 16733013,
          description: `높은 유저를 뮤트 할 수 없습니다.`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }})
      } else return message.channel.send({embed: {
        color: 16733013,
        description: `뮤트 권한을 가지고 있습니다.`,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        }
      }})
    } else {
      let findname = await message.guild.members.fetch({query: args[0], limit: 1});
      if(findname.first()) {
        let filter = (msg) => msg.author.id === message.author.id;
        const msg = await message.channel.send({embed: {
          color: 39423,
          description: `해당유저를 언뮤트 하시겠습니까? <@${findname.first().id}> (${findname.first().user.tag})?`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          },
          footer: {
            text: `답변: yes | no`
          }
        }});
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
          if (collected.size === 0) {
            message.channel.send({embed: {
              description: `You took to long.`,
              color: 16733013,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }});
          } else {
            let answer = collected.first().content.toLowerCase();
            if(answer === "yes") {
              if(!findname.first().roles.cache.some(role => ["Bot access"].includes(role.name))) {
                if(message.member.roles.highest.position > findname.first().roles.highest.position) {
                  if(findname.first().manageable) {
                    const muted = message.guild.roles.cache.find(role => role.name === 'Muted');
                    if(muted) {
                      if(findname.first().roles.cache.some(role => ['Muted'].includes(role.name))) {
                        if(message.guild.me.hasPermission("MANAGE_ROLES")) {
                          if(findname.first().id != message.author.id) {
                            findname.first().roles.remove(muted)
                            message.channel.send({embed: {
                              color: 9240450,
                              description: `성공적으로 언뮤트하엿습니다. <@${findname.first().id}>!`,
                              author: {
                                name: message.author.tag,
                                icon_url: message.author.displayAvatarURL()
                              }
                            }})
                            if(process.env.logchannelid === 'false') return;
                            let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
                            if(args[1]) {
                              return logchannel.send({embed: {
                                color: 2127726,
                                description: `<@${message.author.id}> (${message.author.tag}) unmuted <@${findname.first().id}> (${findname.first().user.tag}) with reason ${args.slice(1).join(" ")}.`,
                                author: {
                                  name: message.author.tag,
                                  icon_url: message.author.displayAvatarURL()
                                },
                                footer: {
                                  text: 'Mute Logs'
                                },
                                timestamp: new Date(),
                              }})
                            } else {
                              return logchannel.send({embed: {
                                color: 2127726,
                                description: `<@${message.author.id}> (${message.author.tag}) unmuted <@${findname.first().id}> (${findname.first().user.tag}) with no reason.`,
                                author: {
                                  name: message.author.tag,
                                  icon_url: message.author.displayAvatarURL()
                                },
                                footer: {
                                  text: 'Mute Logs'
                                },
                                timestamp: new Date(),
                              }})
                            }
                          } else return message.channel.send({embed: {
                            color: 16733013,
                            description: `자기 자신을 풀 수 없습니다.`,
                            author: {
                              name: message.author.tag,
                              icon_url: message.author.displayAvatarURL()
                            }
                          }})
                        } else return message.channel.send({embed: {
                          color: 16733013,
                          description: `권한이 필요합니다.`,
                          author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL(),
                          }
                        }})
                      } else return message.channel.send({embed: {
                        color: 16733013,
                        description: `해당유저는 뮤트가 아닙니다.`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        }
                      }})
                    } else return message.channel.send({embed: {
                      color: 16733013,
                      description: `뮤트 역할이 없습니다 만들어주세요.`,
                      author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                      }
                    }})
                  } else return message.channel.send({embed: {
                    color: 16733013,
                    description: `권한을 추가하기에 부족합니다.`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }})
                } else return message.channel.send({embed: {
                  color: 16733013,
                  description: `높은 유저를 뮤트 할 수 없습니다.`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
              } else return message.channel.send({embed: {
                color: 16733013,
                description: `해당 유저는 뮤트 권한을 가지고 있습니다.`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
            } else if(answer === "no") {
              return message.channel.send({embed: {
                description: `뮤트 취소`,
                color: 9240450,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
            } else return message.channel.send({embed: {
              description: `올바르지 않은 옵션.`,
              color: 16733013,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }})
          }
        })
      } else return message.channel.send({embed: {
        description: `유저를 멘션하거나 입력하세요.`
      }})
    }
  } else return message.channel.send({embed:{
    description: "권한이 필요합니다.",
    color: 16733013,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    }
 }})
}
