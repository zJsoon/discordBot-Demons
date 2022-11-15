module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content:
                        "Ha habido un error al ejecutar el comando. | There was an error executing the command.",
                    ephemeral: true,
                });
            }
        } else if (interaction.isButton()) {
            const role = interaction.guild.roles.cache.get(
                "1030849774187982859"
            );
            return interaction.member.roles.add(role).then((member) =>
                interaction.reply({
                    content: `El rol ${role} se te ha sido asignado`,
                    ephemeral: true,
                })
            );
        } else {
            return;
        }
    },
};
