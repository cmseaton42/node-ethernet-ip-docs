const dirTree = require("directory-tree");
const path = require("path");
const fs = require("fs");
const marked = require("marked");
const highlight = require("highlight");

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return highlight.highlightAuto(code).value;
    }
});

module.exports = function(source) {
    const src = JSON.parse(source);
    const site_path = path.resolve(src.site_root);

    this.addDependency(site_path);

    src.content = parseTree(dirTree(site_path, { extensions: /\.md$/ }).children);

    let config = {
        name: src.name,
        repo_link: src.repo_link,
        version: src.version
    }

    config.nav = [];
    config.content = {};

    for (let dir of src.content) {
        const { type } = dir;

        if (type === "directory") {
            const { name, files } = dir;
            config.nav.push(name);
            config.content[name] = files;
        }
    }


    return `export default ${JSON.stringify(config)}`;
};

const parseTree = children => {
    let arr = [];
    const reg = /^(\d+\s*-\s*)/;

    for (let item of children) {
        let file = {};
        if (item.type === "directory") {
            file.type = "directory";
            file.files = parseTree(item.children);
        } else {
            file.type = "file";
            file.html = marked(fs.readFileSync(item.path, { encoding: "utf-8" }));
        }

        file.name = item.name.replace(item.extension, "");
        file.name = file.name.replace(reg, "");

        arr.push(file);
    }

    return arr;
};
