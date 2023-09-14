import React, { FC } from "react";

import { renderToString } from "react-dom/server";
import {
  getServerState,
  InstantSearch,
  InstantSearchSSRProvider,
  useInfiniteHits,
  useInstantSearch,
  usePagination,
  useRefinementList,
} from "react-instantsearch";
import { InitialResults, UiState } from "instantsearch.js";
import type { RefinementListConnectorParams } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";

import { FacetRecord, searchClient } from "./algolia";

export const VirtualRefinementList: FC<RefinementListConnectorParams> = (
  props,
) => {
  useRefinementList(props);

  return null;
};

export const VirtualWidget: FC = () => {
  useInstantSearch();
  useInfiniteHits();
  usePagination();

  return null;
};

const AlgoliaSSR: FC<{
  indexName: string;
  initialResults?: InitialResults;
  initialUiState?: UiState;
  facets?: { attribute: string }[];
}> = ({ initialResults, initialUiState, facets = [], indexName }) => {
  return (
    <InstantSearchSSRProvider initialResults={initialResults}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        initialUiState={initialUiState}
      >
        <div className="virtual-refinement-list">
          {facets.map((facet) => (
            <VirtualRefinementList
              attribute={facet.attribute}
              key={facet.attribute}
            />
          ))}
        </div>

        <div className="widget">
          <VirtualWidget />
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

const generateUiState = (hardFilters: Record<string, FacetRecord>) => {
  const entries = Object.entries(hardFilters);

  const uiStateEntries = entries.map(([key, object]) => {
    const values = object.value;
    return [key, values];
  });

  return Object.fromEntries(uiStateEntries);
};

export const generateAlgoliaInitialResults = async (
  indexName: string,
  hardFilters: Record<string, FacetRecord>,
) => {
  const initialUiState = {
    [indexName]: {
      refinementList: generateUiState(hardFilters),
    },
  };
  const facets = Object.keys(hardFilters).map((attribute) => ({ attribute }));

  const { initialResults } = await getServerState(
    <AlgoliaSSR
      indexName={indexName}
      initialUiState={initialUiState}
      facets={facets}
    />,
    {
      renderToString,
    },
  );

  return { initialResults, initialUiState, facets };
};
