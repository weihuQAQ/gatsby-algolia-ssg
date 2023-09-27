import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch";
import type { InitialResults, UiState } from "instantsearch.js";

import { simple } from "instantsearch.js/es/lib/stateMappings";
import { history } from "instantsearch.js/es/lib/routers";
import { searchClient } from "../../utils/algolia";

import App from "../../components/App";

const simpleStateMapping = simple();

interface PageContextType {
  defaultIndex: string;
  serverState?: { initialResults?: InitialResults; initialUiState?: UiState };
}
const PLPTemplate: React.FC<PageProps<object, PageContextType>> = ({
  pageContext,
}) => {
  const { serverState, defaultIndex } = pageContext;

  return (
    <InstantSearchSSRProvider initialResults={serverState?.initialResults}>
      <InstantSearch
        indexName={defaultIndex}
        searchClient={searchClient}
        initialUiState={serverState?.initialUiState}
        routing={{
          stateMapping: simpleStateMapping,
          router: history({
            writeDelay: 1,
            parseURL({ qsModule, location }) {
              const uiState =  qsModule.parse(location.search.slice(1), {
                arrayLimit: 99,
              }) as unknown as UiState;
              return uiState;
            },
            createURL({ qsModule, location, routeState }) {
              const {
                protocol,
                hostname,
                port = "",
                pathname,
                hash,
              } = location;
              const queryString = qsModule.stringify(routeState);
              const portWithPrefix = port === "" ? "" : `:${port}`;

              console.log(123,routeState);
              


              if (!queryString) {
                return `${protocol}//${hostname}${portWithPrefix}${pathname}${hash}`;
              }

              return `${protocol}//${hostname}${portWithPrefix}${pathname}?${queryString}${hash}`;
            },
            getLocation() {
              if (typeof window === "undefined") {
                return new URL("/", "") as unknown as Location;
              }
              return window.location;
            },
          }),
        }}
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
