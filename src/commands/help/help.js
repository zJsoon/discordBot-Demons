const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Información sobre todos los comandos del bot."),

    async execute(interaction, client) {
        const helpEmbed = new EmbedBuilder()
            .setTitle("¡Toda la información que necesitas!")
            .setDescription(
                "</help:0> --> Información sobre todos los comandos del bot.\n</ping:0> --> Te enseño mi ping."
            )
            .setFooter({
                text: "Demons Community",
            })
            .setColor(0x2f3136)
            .setTimestamp();
        await interaction.reply({ embeds: [helpEmbed] });
    },
};
