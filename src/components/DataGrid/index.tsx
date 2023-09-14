import React from "react";
import {
  useInfiniteHits,
  usePagination,
  Pagination,
} from "react-instantsearch";

import { ProductCard } from "../Card";
import type { AlgoliaSourceProduct } from "../../utils/algolia";

import "./index.scss";

const DataGrid = () => {
  const { hits } = useInfiniteHits<AlgoliaSourceProduct>();
  const { nbHits, nbPages, currentRefinement } = usePagination();

  console.log(nbHits, hits.length);

  return (
    <div className="products-grid-component">
      <div>
        <p>
          1-{hits.length} of {nbHits}
        </p>
        <p>
          pages: {nbPages} {currentRefinement}
        </p>
      </div>
      <div className="products-grid">
        {hits.map((hit) => (
          <div className="products-grid-item" key={hit.objectID}>
            <ProductCard product={hit} />
          </div>
        ))}
      </div>

      <div>
        <p>
          1-{hits.length} of {nbHits}
        </p>
        <p>
          pages: {nbPages} {currentRefinement}
        </p>
      </div>

      <Pagination />
    </div>
  );
};

export default DataGrid;
