const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const day = require("dayjs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Te da toda información sobre el servidor."),
    async execute(interaction, client) {
        const createsv = day(interaction.guild.createdAt).format("DD/MM/YY");
        const serverOwner = await interaction.guild.fetchOwner();

        const info = new EmbedBuilder()
            .setTitle("Server Information")
            .setThumbnail(interaction.guild.iconURL())
            .setColor(0x00f3ff)
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setThumbnail(
                "https://media.discordapp.net/attachments/975513806950248478/975849099351969852/Logotipo_500x500_px.jpeg"
            )
            .addFields([
                {
                    name: "Nombre del Servidor:",
                    value: interaction.guild.name,
                    inline: true,
                },
                {
                    name: "Número de Canales:",
                    value: interaction.guild.channels.cache.size.toString(),
                    inline: true,
                },
                {
                    name: "Owner:",
                    value: `${serverOwner}`,
                    inline: true,
                },
                {
                    name: "Miembros",
                    value: interaction.guild.memberCount.toString(),
                    inline: true,
                },
                {
                    name: "Número de Roles:",
                    value: interaction.guild.roles.cache.size.toString(),
                    inline: true,
                },
                {
                    name: "ID Server:",
                    value: interaction.guild.id.toString(),
                    inline: true,
                },
                { name: "Fecha de Creación:", value: `${createsv}`, inline: true },
                {
                    name: "Emojis",
                    value: interaction.guild.emojis.cache.size.toString(),
                    inline: true,
                },
                {
                    name: "Boosts",
                    value: interaction.guild.premiumSubscriptionCount.toString(),
                    inline: true,
                },
            ]);
        await interaction.reply({
            embeds: [info],
        });
    },
};
