import { contractGetterSDK, contractGetterWeb3 } from "./contract";

export const getEscrowCreateEvents = async (sdk, eventName, buyerAdress) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const options = {
      order: "asc",
      filters: {
        buyer: buyerAdress,
      },
    };
    const events = await contract?.events.getEvents(eventName, options);

    return events;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getCompleteEvents = async (sdk, eventName, buyerAdress) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const options = {
      order: "asc",
      filters: {
        buyer: buyerAdress,
      },
    };
    const events = await contract?.events.getEvents(eventName, options);
    return events;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getReceipt = async (sdk, eventName, filters) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const options = {
      order: "asc",
      filters: filters,
    };
    const events = await contract?.events.getEvents(eventName, options);
    return events;
  } catch (error) {
    console.log(error);
  }
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
export const getEventsOneFromWeb3js = async (eventName, buyerAdress) => {
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
