import { readFile, writeFile, getDirectories, exists, mkdir, getFiles, copyFile } from "./io";
import { CAPABILITIES_DIR, PROFILE_BUILD_PATH, EXTENSIONS } from "./constants";

const { parseProfile, parseMap, Source } = require("@superfaceai/parser");


async function compileFile(path: string) {
    try {
        const body = await readFile(path);
        const source = new Source(body, path);
        let ast: any;
        if (path.endsWith(EXTENSIONS.map.source)) {
            ast = parseMap(source)
        } else if (path.endsWith(EXTENSIONS.profile.source)) {
            ast = parseProfile(source);
        } else {
            throw new Error(`Invalid suffix:${path}`)
        }
        await writeFile(`${path}.ast.json`, JSON.stringify(ast, null, 2));
    } catch (error) {
        console.log('Error during compilation', error)
    }
}

async function compile() {
    //Get capabilities directories
    const scopes = await getDirectories(`./${CAPABILITIES_DIR}`);
    let profiles: string[];
    let useCases: string[];
    let maps: string[];

    scopes.forEach(async (scope: string) => {
        useCases = await getDirectories(`./${CAPABILITIES_DIR}/${scope}`)
        useCases.forEach(async (useCase: string) => {
            console.log(`Coping content of ${CAPABILITIES_DIR}/${scope}/${useCase} to ./${PROFILE_BUILD_PATH}/${scope}/${useCase}`)

            //Create folder structure if it doesn't exist 
            if (!await exists(`./${PROFILE_BUILD_PATH}`)) {
                await mkdir(`./${PROFILE_BUILD_PATH}`);
            }
            if (!await exists(`./${PROFILE_BUILD_PATH}/${scope}`)) {
                await mkdir(`./${PROFILE_BUILD_PATH}/${scope}`);
            }
            if (!await exists(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}`)) {
                await mkdir(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}`);
            }
            if (!await exists(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps`)) {
                await mkdir(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps`);
            }
            //Compile profiles
            profiles = await getFiles(`./${CAPABILITIES_DIR}/${scope}/${useCase}`)
            profiles.forEach(async (file: string) => {
                if (file.endsWith('js') || file.endsWith('ts')) {
                    console.log(`Skipping profile file: ${file}`)
                } else {
                    console.log(`${file} --> ${file}${EXTENSIONS.profile.build}`)
                    //This file shoud be profile
                    await copyFile(`./${CAPABILITIES_DIR}/${scope}/${useCase}/${file}`, `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${file}`);
                    await compileFile(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${file}`)
                }
            })
            //Compile maps
            maps = await getFiles(`./${CAPABILITIES_DIR}/${scope}/${useCase}/maps`)
            maps.forEach(async (file: string) => {
                if (file.endsWith('js') || file.endsWith('ts')) {
                    console.log(`Skipping file: ${file}`)
                } else {
                    console.log(`${file} --> ${file}${EXTENSIONS.map.build}`)
                    //This file shoud be map
                    await copyFile(`./${CAPABILITIES_DIR}/${scope}/${useCase}/maps/${file}`, `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`);
                    await compileFile(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`)
                }
            })
        })
    })
}

compile().catch((e) => console.log(`Error: ${e}`))