import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch";
import type { InitialResults, UiState } from "instantsearch.js";

import App from "../../components/App";
import { searchClient } from "../../utils/algolia";

interface PageContextType {
  defaultIndex: string;
  serverState?: { initialResults?: InitialResults; initialUiState?: UiState };
}
const PLPTemplate: React.FC<PageProps<object, PageContextType>> = ({
  pageContext,
}) => {
  const { serverState, defaultIndex } = pageContext;

  console.log(123, pageContext);

  return (
    <InstantSearchSSRProvider initialResults={serverState?.initialResults}>
      <InstantSearch
        indexName={defaultIndex}
        searchClient={searchClient}
        initialUiState={serverState?.initialUiState}
      >
        <main>
          <App />
        </main>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export default PLPTemplate;

export const Head: HeadFC = () => <title>Home Page</title>;
