import { EXTENSIONS, SUPER_JSON, PROVIDERS_DIR } from "./constants";
import { exists, mkdir, writeFile } from "./io";
import { providerTemplate } from "./templates";
import { SuperJson } from '@superfaceai/sdk';


async function createProvider() {
    const providerName = process.argv[2];

    //Create folder structure if it doesn't exist 
    if (!await exists(`./$${PROVIDERS_DIR}`)) {
        await mkdir(`./$${PROVIDERS_DIR}`);
    }

    //Create provider file
    await writeFile(`./${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`, providerTemplate(providerName));

    //Add provider to super.json
    const loadedResult = await SuperJson.load(SUPER_JSON);
    const superJson = loadedResult.match(
        v => v,
        err => {
            throw err
        }
    );

    const newProvider = {
        file: `../${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`,
        security: []
    }
    superJson.addProvider(providerName, newProvider)

    await writeFile(SUPER_JSON, superJson.stringified);
}
createProvider().catch((e) => console.log(`Error: ${e}`))