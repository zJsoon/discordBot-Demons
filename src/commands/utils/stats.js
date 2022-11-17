const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Conozca mejora la información del bot."),

    async execute(interaction, client) {
        const { version } = require("discord.js");
        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment
                .duration(interaction.client.uptime)
                .format(" D[d], H[h], m[m]");

            const embed = new EmbedBuilder()
                .setColor(0x00f3ff)
                .setTitle(`Stats de \`${client.user.username}\``)
                .addFields(
                    {
                        name: ":ping_pong: Ping",
                        value: `┕\`${Math.round(client.ws.ping)}ms\``,
                        inline: true,
                    },
                    {
                        name: ":clock1: Uptime",
                        value: `┕\`${duration}\``,
                        inline: true,
                    },
                    {
                        name: ":file_cabinet: Memory",
                        value: `┕\`${(
                            process.memoryUsage().heapUsed /
                            1024 /
                            1024
                        ).toFixed(2)}mb\``,
                        inline: true,
                    }
                )

                .addFields(
                    {
                        name: ":homes: Servers",
                        value: `┕\`${client.guilds.cache.size}\``,
                        inline: true,
                    },
                    {
                        name: ":busts_in_silhouette: Users",
                        value: `┕\`${client.guilds.cache.reduce(
                            (a, b) => a + b.memberCount,
                            0
                        )}\``,
                        inline: true,
                    },
                    {
                        name: ":control_knobs: API Latency",
                        value: `┕\`${interaction.client.ws.ping}ms\``,
                        inline: true,
                    }
                )
                .addFields(
                    {
                        name: ":blue_book: Discord.js",
                        value: `┕\`v${version}\``,
                        inline: true,
                    },
                    {
                        name: ":green_book: Node",
                        value: `┕\`${process.version}\``,
                        inline: true,
                    }
                );
            await interaction.reply({
                embeds: [embed],
            });
        });
    },
};
