import React from "react";
import useProvidersAnalytics from "../../../hooks/useProvidersAnalytics";
import ProvidersProfitsTable from "../../Providers/ProvidersProfitsTable";
import AnalyticsFilters from "../../Providers/AnalyticsFilters";
import ProvidersProfitsChart from "../../Providers/ProvidersProfitsChart";
import { FormattedMessage } from "react-intl";
import { Box } from "@material-ui/core";

/**
 * @typedef {Object} ProvidersAnalyticsPropTypes
 * @property {string} type Type of provider to retreive.
 */

/**
 * Provides filters for filtering providers.
 *
 * @param {ProvidersAnalyticsPropTypes} props Component properties.
 * @returns {JSX.Element} Component JSX.
 */
const ProvidersAnalytics = ({ type }) => {
  const {
    stats,
    timeFrames,
    timeFrame,
    setTimeFrame,
    quotes,
    quote,
    setQuote,
    bases,
    base,
    setBase,
    clearFilters,
  } = useProvidersAnalytics(type);

  return (
    <Box>
      <AnalyticsFilters
        base={base}
        bases={bases}
        onBaseChange={setBase}
        onClear={clearFilters}
        onQuoteChange={setQuote}
        onTimeFrameChange={setTimeFrame}
        quote={quote}
        quotes={quotes}
        timeFrame={timeFrame}
        timeFrames={timeFrames}
        // type={type}
      />
      <ProvidersProfitsChart
        type={type}
        timeFrame={timeFrame}
        quote={quote}
        base={base.val}
        stats={stats}
      />
      <ProvidersProfitsTable
        persistKey={`${type}Analytics`}
        stats={stats}
        title={<FormattedMessage id={`${type}.performance`} />}
        // type={type}
      />
    </Box>
  );
};

export default ProvidersAnalytics;
