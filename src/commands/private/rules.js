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
        .setName("rules")
        .setDescription("Set your rules channel")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("Send verification embed in this channel")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const rulesEmbed = new EmbedBuilder()
            .setTitle("Normas | Rules")
            .setDescription(
                "🇪🇸 ***Normativa de Demons Community***\n\n**Prohibido el contenido NSFW**\nEstá prohibido compartir contenido gore o pornográfico en cualquier formato: Imágenes, vídeos, sonidos, stickers, gifs, links...\n**Prohibido el spam o flood**\nNo está permitido el envío excesivo de mensajes (flood) ni la publicidad siempre y cuando no se trate de temas relacionados con la universidad o proyectos personales. En estos casos sí está permitido.\n**Se respetuoso**\nNada de discriminación por etnia, ideología, religión, género, edad, discapacidad... El humor negro está permitido siempre y cuando no se haga fuera de lugar.\n**Utilizar cada canal para lo que es**\nCada canal tiene un título descriptivo o una descripción. Si no sabes qué canal es el correcto, usa <#ESP YOUR CAHNNEL>\n\n\n🇺🇸 ***Demons Community Policy***\n\n**NSFW content is forbidden**\nIt is forbidden to share gore or pornographic content in any format: images, videos, sounds, stickers, gifs, links...\n**Spam or flooding is forbidden**\nExcessive sending of messages (flooding) or advertising is not allowed as long as it is not related to the university or personal projects. In these cases it is allowed.\n**Be respectful**\nNo discrimination based on ethnicity, ideology, religion, gender, age, disability... Black humor is allowed as long as it is not made out of place.\n**Use each channel for what it is for.**\nIf you don't know which channel is the correct one, use <#ENG YOUR CAHNNEL>."
            )
            .setColor(0x5fb041);
        let sendChannel = channel.send({
            embeds: ([rulesEmbed]),
        });
        interaction.reply({ content: `The message has been successfully sent to ${channel}.`, ephemeral: true})
    },
};