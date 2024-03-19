# CatRandom

CatRandom is a playful Discord bot designed to engage with users through the magic of cat images. Whenever a user mentions the word "cat" within a message, CatRandom springs into action, fetching a delightful cat image from various sources and appending a customized banner with a translated "Meow" greeting and the count of cats shared so far. It's a fun way to add a bit of whimsy and charm to your Discord server conversations.

## Features

- Listens for messages containing the word "cat" in any Discord channel or direct message (DM).
- Fetches a random cat image from either CATAAS (Cat As A Service) or a fallback image source.
- Appends a customizable banner at the top of the fetched image with a translated "Meow" greeting to the user who mentioned the word "cat", along with a running total of cat images shared.
- Updates the users's activity status to reflect the current count of cat images shared.

## Installation

To get CatRandom up and running in your Discord environment, follow these steps:

1. Ensure you have Node.js installed on your system.
   
   [NPM download](https://nodejs.org/en/download)
  **OR**
   `sudo apt install npm -y`
   
3. Clone this repository to your local machine.
   `git clone https://github.com/charlest1121/catcountsend.git`
5. Navigate to the cloned directory and run `npm install` to install all the necessary dependencies listed in `package.json`.
   `cd catcountsend`
7. Replace `YOUR_TOKEN_HERE` with your discord account token.
   
9. Start the bot using `npm start`.

## Usage

Once installed and running, CatRandom will automatically listen for the word "cat" in any message. When detected, it will:

- Increment the internal cat count.
- Fetch a random cat image from its sources.
- Generate and append a banner with a greeting and the current cat count.
- Send the processed image to the same channel or DM where the word "cat" was mentioned.

## Dependencies

- [@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api) *CURRENTLY BROKEN, so it just defaults to Meow. Make a commit to fix if you want.*
- [discord.js](https://www.npmjs.com/package/discord.js) *Use this library if you want to use this script with your own bot*
- [discord.js-selfbot-v13](https://www.npmjs.com/package/discord.js-selfbot-v13) (Use at your own risk)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [google-translate-api](https://www.npmjs.com/package/google-translate-api)
- [jimp](https://www.npmjs.com/package/jimp)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [random-cat-img](https://www.npmjs.com/package/random-cat-img)

## Contributing

Contributions to CatRandom are welcome! Whether it's reporting bugs, discussing improvements, or contributing code, feel free to join in. Please open an issue or pull request as needed.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Disclaimer

This project uses the discord.js-selfbot-v13 library, which allows for the creation of self-bots. The creation and use of self-bots are against Discord's Terms of Service. Use this bot and library at your own risk.

---

Remember, a README file is often the first thing users or contributors see when they encounter your project. It's your opportunity to make a good impression and guide them through using and contributing to your project.
