import { existsSync, readFileSync } from "fs";
import { parse } from 'dotenv'
import { expand } from 'dotenv-expand'
export function loadEnvFile(envFilePaths: string[] = ['.env.development.local', '.env.development', '.env'], expandOptions: { [x: string]: string } = {}) {

    let config: { [x: string]: any } = {};
    for (const envFilePath of envFilePaths) {
        if (existsSync(envFilePath)) {
            config = Object.assign(parse(readFileSync(envFilePath)), config);
            config = expand(Object.assign(Object.assign({}, expandOptions), { parsed: config })).parsed || config;
        }
    }
    return config;
}

