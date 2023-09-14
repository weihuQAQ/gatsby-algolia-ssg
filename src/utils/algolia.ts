import algoliasearch from "algoliasearch/lite";
import { BaseHit } from "instantsearch.js";

export const searchClient = algoliasearch("YourAppID", "YourApiKey");

export interface FacetRecord {
  type: string;
  value: string[];
}

export interface AlgoliaSourceProduct extends BaseHit {
  prod_name: string;
  sku_image_url: string;
}
