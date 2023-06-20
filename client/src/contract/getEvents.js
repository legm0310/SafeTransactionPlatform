import { contractGetterSDK, web3Contract } from "./contractCall";

export const getEscrowCreateEvents = async (sdk) => {
  const contract = await contractGetterSDK(sdk);
  const options = {
    fromBlock: 3727000,
    toBlock: 100,
    order: "asc",
  };
  const events = await contract?.events.getEvents("EscrowCreate", options);

  return events;
};

export const getEscrowEventsFromWeb3js = async (buyerAdress) => {
  const contract = web3Contract();
  try {
    const events = await contract.getPastEvents("EscrowCreate", {
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
