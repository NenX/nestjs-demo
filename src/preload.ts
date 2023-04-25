import { existsSync, readFileSync } from "fs";
import { parse } from 'dotenv'
import { expand } from 'dotenv-expand'
function loadEnvFile(envFilePaths: string[], expandOptions: { [x: string]: string } = {}) {

    let config = {};
    for (const envFilePath of envFilePaths) {
        if (existsSync(envFilePath)) {
            config = Object.assign(parse(readFileSync(envFilePath)), config);
            config = expand(Object.assign(Object.assign({}, expandOptions), { parsed: config })).parsed || config;
        }
    }
    return config;
}