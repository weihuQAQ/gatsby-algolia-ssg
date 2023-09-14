import type { GatsbyNode } from "gatsby";
import path from "path";
import { generateAlgoliaInitialResults } from "./src/utils/server";

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions;

  const template = path.resolve("src/templates/plp/index.tsx");

  const pages = [
    {
      uri: "/b/red",
      title: "Test PLP",
      defaultIndex: "YourIndex",
      hardFilters: {
        prod_gender: {
          type: "",
          value: ["Kids", "Men", "Women"],
        },
        sku_color: {
          type: "",
          value: ["Black", "Blue"],
        },
        prod_features: {
          type: "",
          value: ["Custom engraving"],
        },
      },
    },
  ];

  for (let i = 0; i < pages.length; i++) {
    const { uri, title, defaultIndex, hardFilters } = pages[i];

    // const serverState = await getServerState(hardFilters, defaultIndex);
    const state = await generateAlgoliaInitialResults(
      defaultIndex,
      hardFilters,
    );

    createPage({
      path: uri,
      component: template,
      context: {
        uri,
        title,
        hardFilters,
        serverState: state,
        defaultIndex,
      },
    });
  }
};
