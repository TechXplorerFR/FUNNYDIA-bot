function loadCommands(client) {
    const fs = require('fs');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading("Commandes", "Statut")

    const commandFolder =  fs.readdirSync("./commands");
    for(const folder of commandFolder) {
        const commandFile = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        for (const file of commandFile) {
            const command = require(`../commands/${folder}/${file}`);
            if(command.name) {
                client.commands.set(command.name, command);
                table.addRow(file, "✔️");
            } else {
                table.addRow(
                    file,
                    "❌ => Il manque un help.name dans un fichier."
                );
                continue;
            }
            if (command.aliases && Array.isArray(command))
            command.aliases.forEach((alias) => 
                client.aliases.set(alias, command.name)
            );
        }
        console.log(table.toString())
    }
}

module.exports = {
    loadCommands,
}