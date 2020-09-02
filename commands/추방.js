const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();
const groupId = 4483539;
const maximumRank = 1;

async function getRankID(func_group, func_user){
    let role = await roblox.getRankInGroup(func_group, func_user);
    return role;
}

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Bot access"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "You need the `Exile Permissions` role to run this command.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
    let username = args[0];
    if(!username){
        return message.channel.send({embed: {
            color: 16733013,
            description: "The username argument is required.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oops! ${username} is not a Roblox user. Perhaps you misspelled?`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL
            }
        }});
    }
    let rankInGroup = await getRankID(Number(groupId), id);
    if(maximumRank <= rankInGroup){
        return message.channel.send({embed: {
            color: 16733013,
            description: "This user cannot be exiled by this bot.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let exileResponse;
    try {
        exileResponse = await roblox.exile(Number(groupId), id);
    } catch (err) {
        console.log(chalk.red('An error occured when running the exile command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oops! An unexpected error has occured. It has been logged to the bot console.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 9240450,
        description: `**Success!** Exiled ${username} from the group.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has exiled ${username} from the group.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Action Logs'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
        }
    }});
}
