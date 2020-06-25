import React from "react";
import { Box } from "@material-ui/core";
import { compose } from "recompose";
import { Helmet } from "react-helmet";
import withDashboardLayout from "../../layouts/dashboardLayout";
import { useIntl } from "react-intl";
import { TradingView } from "../../components/TradingTerminal";
import "./position.scss";

/**
 * @typedef {import("../../services/tradeApiClient.types").PositionEntity} PositionEntity
 */

/**
 * @typedef {Object} PositionPageProps
 * @property {string} positionId The position ID dynamic route path parameter.
 */

/**
 * Position detail page component.
 *
 * @param {PositionPageProps} props Component properties.
 * @returns {JSX.Element} Position page element.
 */
const PositionPage = (props) => {
  const { positionId = null } = props;
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: "menu.positionview",
          })}
        </title>
      </Helmet>
      <Box className="positionPage" display="flex" flexDirection="column" justifyContent="center">
        <Box
          className="positionDetail"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <TradingView positionId={positionId} />
        </Box>
      </Box>
    </>
  );
};

export default compose(withDashboardLayout)(PositionPage);
