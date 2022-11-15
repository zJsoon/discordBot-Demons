const {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createverify")
        .setDescription("Set your verification channel")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("Send verification embed in this channel")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const verifyEmbed = new EmbedBuilder()
            .setTitle("Verificación")
            .setDescription(
                "Reacciona a este mensaje para obtener el rol miembro y verificar que no eres un bot."
            )
            .setColor(0x5fb041);
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId("verify")
                        .setLabel("Verificate!")
                        .setStyle(ButtonStyle.Success)
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({
                content: "Ha habido un error, intentelo más tarde.",
                ephemeral: true,
            });
        } else {
            return interaction.reply({
                content:
                    "Ha sido perfectamente establecido el canal de verificación",
                ephemeral: true,
            });
        }
    },
};
