# meow-bot

Discord bot with a `/meow` command that replies with **Miau!** and a random cat gif.

## Config

1. Create a Discord app at the [Developer Portal](https://discord.com/developers/applications)
2. Copy `.env.example` to `.env` and fill in your values:

| Variable            | Where to find it                         |
|---------------------|------------------------------------------|
| `DISCORD_TOKEN`     | Bot tab → Token                          |
| `DISCORD_CLIENT_ID` | General Information → Application ID     |

3. Invite the bot to your server via **OAuth2 → URL Generator** (select `bot` + `applications.commands` scopes)

## Commands

| Command | Description                          |
|---------|--------------------------------------|
| `/meow` | Replies with **Miau!** and a cat gif |

## Run

```bash
npm install
npm run dev
```
