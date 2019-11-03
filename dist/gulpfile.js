"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildTools = __importStar(require("turbo-gulp"));
const gulp_1 = __importDefault(require("gulp"));
const minimist_1 = __importDefault(require("minimist"));
const options = minimist_1.default(process.argv.slice(2), {
    string: ["devDist"],
    default: { devDist: undefined },
    alias: { devDist: "dev-dist" },
});
const project = {
    root: __dirname,
    packageJson: "package.json",
    buildDir: "build",
    distDir: "dist",
    srcDir: "src",
    tslint: {
        configuration: {
            rules: {
                "number-literal-format": false,
            },
        },
    },
};
const lib = {
    project,
    name: "lib",
    srcDir: "src/lib",
    scripts: ["**/*.ts"],
    mainModule: "index",
    dist: {
        packageJsonMap: (old) => {
            const version = options.devDist !== undefined ? `${old.version}-build.${options.devDist}` : old.version;
            return Object.assign(Object.assign({}, old), { version, scripts: undefined, private: false });
        },
        npmPublish: {
            tag: options.devDist !== undefined ? "next" : "latest",
        },
    },
    customTypingsDir: "src/custom-typings",
    tscOptions: {
        skipLibCheck: true,
    },
    typedoc: {
        dir: "typedoc",
        name: "Skype Http",
        deploy: {
            repository: "git@github.com:ocilo/skype-http.git",
            branch: "gh-pages",
        },
    },
    clean: {
        dirs: ["build/lib", "dist/lib"],
    },
};
const example = {
    project,
    name: "example",
    srcDir: "src",
    scripts: ["example/**/*.ts", "lib/**/*.ts"],
    tsconfigJson: "src/example/tsconfig.json",
    mainModule: "example/main",
    customTypingsDir: "src/custom-typings",
    outModules: buildTools.OutModules.Both,
    tscOptions: {
        skipLibCheck: true,
    },
    clean: {
        dirs: ["build/example", "dist/example"],
    },
};
const test = {
    project,
    name: "test",
    srcDir: "src",
    scripts: ["test/**/*.ts", "lib/**/*.ts"],
    customTypingsDir: "src/custom-typings",
    tsconfigJson: "src/test/tsconfig.json",
    outModules: buildTools.OutModules.Both,
    tscOptions: {
        skipLibCheck: true,
    },
    copy: [{ files: ["test/test-resources/**/*"] }],
    clean: {
        dirs: ["build/test"],
    },
};
const libTasks = buildTools.registerLibTasks(gulp_1.default, lib);
buildTools.registerMochaTasks(gulp_1.default, test);
buildTools.registerNodeTasks(gulp_1.default, example);
buildTools.projectTasks.registerAll(gulp_1.default, project);
gulp_1.default.task("all:tsconfig.json", gulp_1.default.parallel("lib:tsconfig.json", "test:tsconfig.json", "example:tsconfig.json"));
gulp_1.default.task("dist", libTasks.dist);
//# sourceMappingURL=gulpfile.js.map