import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } from "discord.js";
import "dotenv/config";

interface CatApiImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?mime_types=gif";

async function fetchRandomCatGif(): Promise<string> {
  const res = await fetch(CAT_API_URL);
  if (!res.ok) throw new Error(`Cat API returned ${res.status}`);
  const [image] = (await res.json()) as CatApiImage[];
  return image.url;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const meowCommand = new SlashCommandBuilder()
  .setName("meow")
  .setDescription("meow with cat gif");

async function registerCommands(): Promise<void> {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!token || !clientId) {
    throw new Error("DISCORD_TOKEN and DISCORD_CLIENT_ID must be set in .env");
  }

  const rest = new REST().setToken(token);
  await rest.put(Routes.applicationCommands(clientId), {
    body: [meowCommand.toJSON()],
  });
  console.log("Slash command /meow registered globally.");
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "meow") return;

  await interaction.deferReply();
  try {
    const gif = await fetchRandomCatGif();
    await interaction.editReply({ content: `🐱 **Miau!**\n${gif}` });
  } catch (err) {
    console.error("Failed to fetch cat gif:", err);
    await interaction.editReply({ content: "🐱 **Miau!** _(but the cat gif ran away...)_" });
  }
});

(async () => {
  await registerCommands();
  await client.login(process.env.DISCORD_TOKEN);
})();

// made with love for siiri 💙
