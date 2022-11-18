const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Te doy tu información."),

    async execute(interaction, client) {
        const member =
            interaction.options.getMember("member") || interaction.user;
        function formatDate(template, date) {
            var tiempo = "YYYY:MM:DD:HH:mm:ss".split(":");
            date = new Date(
                date || Date.now() - new Date().getTimezoneOffset() * 6e4
            );
            return date
                .toISOString()
                .split(/[-:.TZ ]/)
                .reduce(function (template, item, i) {
                    return template.split(tiempo[i]).join(item);
                }, template);
        }

        const embedinfo = new EmbedBuilder()
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: `Information of ` + interaction.user.username,
            })
            .setThumbnail(
                interaction.user.displayAvatarURL({
                    format: "png",
                    dynamic: "true",
                })
            )
            .addFields([
                {
                    name: `**Name:**`,
                    value: interaction.user.tag,
                    inline: false,
                },
                {
                    name: `**ID:**`,
                    value: interaction.user.id,
                    inline: false,
                },
                {
                    name: `**Server login:**`,
                    value: formatDate(
                        "DD/MM/YYYY, a las HH:mm:ss",
                        member.joinedAt
                    ),
                    inline: false,
                },
                {
                    name: `**Boost:**`,
                    value: interaction.user.premiumSince
                        ? "User Booster"
                        : "User no Booster",
                    inline: false,
                },
            ])
            .setColor(0x2f3136)
            .setTimestamp(Date.now());
        await interaction.reply({
            embeds: [embedinfo],
        });
    },
};
