import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect } from "react";
import { useRefinementList, useInstantSearch } from "react-instantsearch";

const Filters = () => {
  const { items, refine } = useRefinementList({ attribute: "sku_color" });
  const { items: genderItems, refine: refineGender } = useRefinementList({
    attribute: "prod_gender",
  });
  const { items: featureItems, refine: refineFeature } = useRefinementList({
    attribute: "prod_features",
  });

  const { refresh } = useInstantSearch();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="filters-component">
      <fieldset>
        <legend>Features</legend>
        <FormGroup>
          {genderItems.map((item) => (
            <FormControlLabel
              key={item.value}
              checked={item.isRefined}
              onChange={() => {
                refineGender(item.value);
              }}
              control={<Checkbox />}
              label={item.label}
            />
          ))}
        </FormGroup>
      </fieldset>
      <p></p>
      <fieldset>
        <legend>Colors</legend>

        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={item.value}
              checked={item.isRefined}
              onChange={() => refine(item.value)}
              control={<Checkbox />}
              label={item.label}
            />
          ))}
        </FormGroup>
      </fieldset>
      <p></p>
      <fieldset>
        <legend>Features</legend>
        <FormGroup>
          {featureItems.map((item) => (
            <FormControlLabel
              key={item.value}
              checked={item.isRefined}
              onChange={() => {
                refineFeature(item.value);
              }}
              control={<Checkbox />}
              label={item.label}
            />
          ))}
        </FormGroup>
      </fieldset>
    </div>
  );
};

export default Filters;
