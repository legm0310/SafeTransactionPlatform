import { contractGetterSDK, contractGetterWeb3 } from "./contract";

export const getEscrowCreateEvents = async (sdk, eventName, buyerAdress) => {
  const contract = await contractGetterSDK(sdk);
  const options = {
    order: "asc",
    filters: {
      buyer: buyerAdress,
    },
  };
  const events = await contract?.events.getEvents(eventName, options);

  return events;
};

export const getEventsFromWeb3js = async (eventName, buyerAdress) => {
  try {
    const contract = contractGetterWeb3();
    const events = await contract.getPastEvents(eventName, {
      filter: { buyer: buyerAdress },
      fromBlock: 0,
      toBlock: "latest",
    });
    // console.log(events);
    return events;
  } catch (error) {
    console.error(error);
  }
};
