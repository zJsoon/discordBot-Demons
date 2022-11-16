const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Enseña tu avatar."),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Avatar de `+ interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setImage(interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor(0x00f3ff)
            .setTimestamp();
        await interaction.reply({
            embeds: [embed],
        });
    },
};
