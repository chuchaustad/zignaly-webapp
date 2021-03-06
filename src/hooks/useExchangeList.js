import { useState, useEffect } from "react";
import useStoreSessionSelector from "./useStoreSessionSelector";
import tradeApi from "../services/tradeApiClient";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "../store/actions/ui";

/**
 * @typedef {import("../services/tradeApiClient.types").ExchangeListEntity} ExchangeListEntity
 * @typedef {Object} ExchangesHookData
 * @property {Array<ExchangeListEntity>} exchanges
 * @property {Boolean} exchangesLoading
 */

/**
 * Provides exchange list.
 * @param {boolean} [shouldExecute] Flag to indicate if we should execute the request.
 * @returns {ExchangesHookData} Exchange list.
 */
const useExchangeList = (shouldExecute = true) => {
  const [loading, setLoading] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const dispatch = useDispatch();
  const storeSession = useStoreSessionSelector();

  const loadData = () => {
    if (shouldExecute) {
      setLoading(true);
      const payload = {
        token: storeSession.tradeApi.accessToken,
      };

      tradeApi
        .exchangeListGet(payload)
        .then((data) => {
          const zignalyIndex = data.findIndex((e) => e.name.toLowerCase() === "zignaly");
          if (zignalyIndex) {
            // Move zignaly to first place
            const zignaly = data.splice(zignalyIndex, 1)[0];
            data.unshift(zignaly);
          }
          setExchanges(data);
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(loadData, [storeSession.tradeApi.accessToken, shouldExecute]);

  return {
    exchanges: exchanges,
    exchangesLoading: loading,
  };
};

export default useExchangeList;
