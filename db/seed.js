import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const FILEPATH = `/countries.csv`;
console.log(FILEPATH);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = fs.readFileSync(__dirname + FILEPATH, "utf8");
const lines = file.toString().split(/\r?\n/);

const countries = {};
console.log(countries);
