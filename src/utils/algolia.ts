import algoliasearch from "algoliasearch/lite";
import { BaseHit, IndexUiState } from "instantsearch.js";

const appId = String(process.env.ALGOLIA_APP_ID);
const apiKey = String(process.env.ALGOLIA_API_KEY);

export const searchClient = algoliasearch(appId, apiKey);

export interface FacetRecord {
  type: string;
  value: string[];
}

export interface AlgoliaSourceProduct extends BaseHit {
  prod_name: string;
  sku_image_url: string;
}

export const getIndexStateWithoutConfigure = <
  TIndexUiState extends IndexUiState,
>(
  uiState: TIndexUiState
): Omit<TIndexUiState, "configure"> => {
  const { configure, ...trackedUiState } = uiState;
  return trackedUiState;
};
