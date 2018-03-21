const dirTree = require("directory-tree");
const path = require("path");
const fs = require("fs");
const remarkable = require("remarkable");
const hljs = require("highlight.js");

let md = new remarkable({
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />)
    breaks: true, // Convert '\n' in paragraphs into <br>
    langPrefix: "language-", // CSS language prefix for fenced blocks
    linkify: false, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) {}
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {}

        return ""; // use external default escaping
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
    };

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
            file.html = md.render(fs.readFileSync(item.path, { encoding: "utf-8" }));
        }

        file.name = item.name.replace(item.extension, "");
        file.name = file.name.replace(reg, "");

        arr.push(file);
    }

    return arr;
};
