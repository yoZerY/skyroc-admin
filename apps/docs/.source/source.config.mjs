// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// lib/remark-snackplayer.ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { visit } from "unist-util-visit";
var MONOREPO_ROOT = resolve(process.cwd(), "../..");
function parseParams(paramString = "") {
  const params = Object.fromEntries(new URLSearchParams(paramString).entries());
  if (!params.platform) {
    params.platform = "web";
  }
  return params;
}
function readFileContents(filePath) {
  const absolute = resolve(MONOREPO_ROOT, filePath);
  return readFileSync(absolute, "utf-8");
}
function attr(name, value) {
  return {
    type: "mdxJsxAttribute",
    name,
    value
  };
}
function toJsxNode(node) {
  const params = parseParams(node.meta ?? void 0);
  const code = params.file ? readFileContents(params.file) : node.value;
  const name = params.name ? decodeURIComponent(params.name) : "Example";
  const description = params.description ? decodeURIComponent(params.description) : "Example usage";
  const ext = params.ext ? decodeURIComponent(params.ext) : params.file?.split(".").pop() ?? "tsx";
  const filename = `App.${ext}`;
  const files = encodeURIComponent(
    JSON.stringify({
      [filename]: {
        type: "CODE",
        contents: code
      }
    })
  );
  const dependencies = `react-native-safe-area-context${params.dependencies ? `,${params.dependencies}` : ""}`;
  const platform = params.platform ?? "web";
  const supportedPlatforms = params.supportedPlatforms ?? "ios,android,web";
  const theme = params.theme ?? "light";
  const preview = params.preview ?? "true";
  const loading = params.loading ?? "lazy";
  const deviceAppearance = params.deviceAppearance ?? "light";
  const jsxNode = {
    type: "mdxJsxFlowElement",
    name: "div",
    attributes: [
      attr("className", "snack-player"),
      attr("data-snack-name", name),
      attr("data-snack-description", description),
      attr("data-snack-files", files),
      attr("data-snack-dependencies", dependencies),
      attr("data-snack-platform", platform),
      attr("data-snack-supported-platforms", supportedPlatforms),
      attr("data-snack-theme", theme),
      attr("data-snack-preview", preview),
      attr("data-snack-loading", loading),
      attr("data-snack-device-appearance", deviceAppearance),
      attr("data-snack-device-frame", "false")
    ],
    children: []
  };
  Object.assign(node, jsxNode);
}
function remarkSnackPlayer() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang === "SnackPlayer") {
        toJsxNode(node);
      }
    });
  };
}
var remark_snackplayer_default = remarkSnackPlayer;

// source.config.ts
var { docs, meta } = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remark_snackplayer_default]
  }
});
export {
  source_config_default as default,
  docs,
  meta
};
