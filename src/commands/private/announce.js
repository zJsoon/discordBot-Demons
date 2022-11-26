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
        .setName("announce")
        .setDescription("Send an ad to a specific channel.")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("To which channel do you want to send the Message Embed?")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("mention")
                .setDescription("Tag someone (None = No Tag)")
                .setRequired(true)
                .addChoices(
                    { name: 'None', value: 'none'},
                    { name: '@everyone', value: '@everyone'},
                    { name: '@here', value: '@here'},
                )
        )
        .addStringOption((option) =>
            option
                .setName("title")
                .setDescription("Add title")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription("Add Description")
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("timestamp")
                .setDescription("Add Timestamp")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("footer-name")
                .setDescription("Add Footer Text")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const mention = interaction.options.getString("mention");
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");
        const timestamp = interaction.options.getBoolean("timestamp");
        const footer_name = interaction.options.getString("footer-name");

        let announces = new EmbedBuilder()
        // Mention
        if (mention == '@everyone'){
            tag = '@everyone';
        } else if (mention == '@here'){
            tag = '@here';
        } else if (mention == 'none'){
            tag = '';
        }
        // Color
        announces.setColor(0x2f3136)
        // Title
        if (title) {
            announces.setTitle(title);
        } else { }
        // Description
        if (description) {
            announces.setDescription(description)
        } else { }
        // Timestamp
        if (timestamp == true){
            announces.setTimestamp();
        } else { }
        // Footer
        if (footer_name){
            announces.setFooter({ text: footer_name, iconURL: interaction.guild.iconURL()})
        } else { }
        // Send Embed
        let sendChannel = channel.send({ content: tag, embeds: ([announces])});
        interaction.reply({ content: `The message has been successfully sent to ${channel}.`, ephemeral: true})
    },
};