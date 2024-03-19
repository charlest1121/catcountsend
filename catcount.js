const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const Jimp = require('jimp');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const getRandomCatImg = require('random-cat-img');
const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api');

const catCountFilePath = path.join(__dirname, 'catCount.txt');
let catCount = readCatCount();

function readCatCount() {
    try {
        return parseInt(fs.readFileSync(catCountFilePath, 'utf8'), 10);
    } catch (error) {
        return 0; // If the file doesn't exist or an error occurs, start with a count of 0
    }
}

function writeCatCount(count) {
    fs.writeFileSync(catCountFilePath, count.toString(), 'utf8');
}

function translateMeow() {
    // Randomly select a target language from the list
    const languages = ['es', 'de', 'fr', 'zh-cn', 'ja', 'ru', 'it', 'ko', 'pt', 'ar'];
    const targetLanguage = languages[Math.floor(Math.random() * languages.length)];
    
    // Return a promise that resolves with the translated text
    return translate('Meow', {to: targetLanguage})
        .then(res => res.text)
        .catch(err => {
            console.error(`Error translating Meow: ${err}`);
            return 'Meow'; // Fallback to 'Meow' if translation fails
        });
}

client.on('ready', () => {
    console.log(`${client.user.username} is ready!(countcat)`);
    client.user.setActivity(`Cats counted: ${catCount}`, { type: 'PLAYING' });
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id || message.channel.type !== 'DM') return;

    if (message.content.toLowerCase().includes('cat')) {
        catCount++;
        writeCatCount(catCount);
        client.user.setActivity(`Cats counted: ${catCount}`, { type: 'PLAYING' });
        console.log(`Cat count updated: ${catCount}`);

        try {
            let imageUrl = '';
            let imageSource = '';

            try {
                const response = await fetch("https://cataas.com/cat?json=true");
                if (!response.ok) throw new Error(`Failed to fetch from CATAAS: ${response.statusText}`);
                const data = await response.json();
                
                if (!data._id) throw new Error('CATAAS response did not include an _id property.');
                imageUrl = `https://cataas.com/cat/${data._id}`;
                imageSource = 'CATAAS';
            } catch (error) {
                console.error('Error fetching from CATAAS, using fallback:', error.message);
                const response = await getRandomCatImg();
                if (!response || typeof response !== 'object' || !response.message) {
                    throw new Error('Fallback image fetch failed: Invalid response from random-cat-img');
                }
                imageUrl = response.message;
                imageSource = 'random-cat-img';
            }

            const userName = message.author.username;
            const image = await Jimp.read(imageUrl);
            const bannerHeight = 60; // Adjust the banner height as needed
            const banner = new Jimp(image.bitmap.width, bannerHeight, 0xFFFFFFFF);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); // Using black font for better visibility on white banner
            const translatedMeow = await translateMeow();

            await banner.print(font, 0, 10, {
                text: `${translatedMeow}, ${userName}! Cat #${catCount}`,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            }, banner.bitmap.width, banner.bitmap.height);
            
            await image.blit(banner, 0, 0); // Overlay the banner at the top of the image

            console.log(`Fetched cat image URL from ${imageSource}: ${imageUrl}`);
            const processedImageName = path.join(__dirname, `cat_${catCount}.jpg`);
            await image.writeAsync(processedImageName);
            await message.channel.send({ files: [processedImageName] });
        } catch (error) {
            console.error('Error fetching or processing cat image:', error.message);
        }
    }
});

client.login("YOUR_TOKEN_HERE");
