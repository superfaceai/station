const { parseMap, parseProfile, Source } = require("@superfaceai/parser");

const fs = require("fs");

const SUPER_JSON= './superface/super.json';

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getFiles = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name);

const profileNamespaces = getDirectories("./superface/build/profiles");

profileNamespaces.forEach(ns => {
  const profileFileNames = getFiles(`./superface/build/profiles/${ns}`)
    .filter(dirName => !dirName.endsWith(".ast.json"));
  profileFileNames.forEach(profileFileName => {
    const fullFileName = `./superface/build/profiles/${ns}/${profileFileName}`;
    const body = fs.readFileSync(fullFileName);
    const source = new Source(body.toString('utf-8'), fullFileName);
    const ast = parseProfile(source);
    fs.writeFileSync(`${fullFileName}.ast.json`, JSON.stringify(ast, null, 2));
  });
});

const mapFileNames = getFiles("./superface/build/maps")
  .filter(name => !name.endsWith(".ast.json") && name !== '.gitkeep');

mapFileNames.forEach(mapFileName => {
  const body = fs.readFileSync(`./superface/build/maps/${mapFileName}`);
  const source = new Source(body.toString('utf-8'));
  const ast = parseMap(source);
  fs.writeFileSync(`./superface/build/maps/${mapFileName}.ast.json`, JSON.stringify(ast, null, 2));
})