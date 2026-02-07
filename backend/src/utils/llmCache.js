import fs from "fs";

const FILE = "llm-cache.json";

let cache = fs.existsSync(FILE)
    ? JSON.parse(fs.readFileSync(FILE, "utf-8"))
    : {};

export function getCachedLLM(key){
    return cache[key];
}

export function setCachedLLM(key, value){
    cache[key] = value;
    fs.writeFileSync(FILE, JSON.stringify(cache,null,2));
}