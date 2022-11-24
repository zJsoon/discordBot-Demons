const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Suggest something.')
		.addStringOption(option =>
			option
				.setName('description')
				.setDescription('Add description for ur suggestion.')
				.setRequired(true)
		),
	async execute(interaction) {
		const { guild, options, member } = interaction;

		const description = interaction.options.getString('description');


		const suggest = new EmbedBuilder()
			.setColor(0x2f3136)
			.setTitle('✨ New Suggestion ✨')
			.setDescription(`${description}`)
			.setFooter({
				text: `A suggestion made by ${member.user.tag}`,
				iconURL: member.displayAvatarURL({ dynamic: true })
			});

		await guild.channels.cache.get('CHANNEL TO SEND SUGGESTION').send({
			embeds: ([suggest])
		}).then((s) => {
			s.react('⬆️')
			s.react('⬇️')
		}).catch((err) => {
			throw err;
		});

		interaction.reply({ content: ':white_check_mark: | Your suggestion has been succesfully submitted', ephemeral: true });
	}
}