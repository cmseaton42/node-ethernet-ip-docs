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
    const { docdir } = JSON.parse(source);
    const docPath = path.resolve(docdir);

    this.addDependency(docPath);

    const tree = dirTree(docPath, {
        extensions: /\.md$/
    });

    const parsed = parseTree(tree.children);

    return `export default ${JSON.stringify(parsed)}`;
};

const parseTree = children => {
    let arr = [];
    const reg = /^(\d+\w-)/;

    for (let item of children) {
        let file = {};
        if (item.type === "directory") {
            file.files = parseTree(item.children);
        } else {
            file.name = item.name.replace(item.extension, "");
            file.name = file.name.replace(reg, "");
            file.html = marked(fs.readFileSync(item.path, { encoding: "utf-8" }));
        }

        arr.push(file);
    }

    return arr;
};
