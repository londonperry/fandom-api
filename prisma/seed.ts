

import axios from 'axios';
import cheerio from 'cheerio';
import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getCharacterInfo = async (characterName: string): Promise<Prisma./*Replace Me*/_characterCreateInput> => {
    const { data } = await axios.get(`https://REPLACE-ME.fandom.com/wiki/${characterName}`);
    const $ = cheerio.load(data);
    let name = $('div[data-source="full name"] > div.pi-data-value.pi-font').text();
    const affiliation = $('div[data-source="affiliation"] > div.pi-data-value.pi-font').text();
    const image = $('.image.image-thumbnail > img').attr('src');
    if (!name) {
        const parts = characterName.split('/');
        const last = parts[parts.length - 1];
        name = last.replace('_', ' ');
    }
    const characterInfo: Prisma./*Replace Me*/_characterCreateInput = {
        name,
        affiliation,
        image,
    };
    return characterInfo;
};

const loadCharacters = async () => {
    try {

        const characterInfoPromises = characterNames
            .map((characterName) => getCharacterInfo(characterName));
        const characters: Prisma./*Replace Me*/_characterCreateInput[] = await Promise.all(characterInfoPromises);
        console.log("🚀 ~ file: seed.ts ~ line 138 ~ loadCharacters ~ characters", characters)
        // save them to the db
        console.log("Let's seed it");
        await prisma./*Replace Me*/_character.createMany({ data: characters });
    } catch (error) {
        console.error(error)
    }
};

const characterNames = [
/* Add relative slug for getCharacterInfo */
];

loadCharacters();