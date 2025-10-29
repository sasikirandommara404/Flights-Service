import logger from '../../logger.js'
import {
  searchAmadeusFlights,
  getFlightOfferPrices,
  getFlightDetailsByOfferId
} from './amadeusApi.js'

export const FlightOfferService = async (params)=>{
  try{
    if(!params){
      return 'Invalid Data Entered'
    }
    const flights = await searchAmadeusFlights(params)
    if(!flights){
      return 'Failed To Fetch flights for selected Destination Location'
    }
    return flights
  }catch(err){
    return err.message
  }

}
export const FlightPriceOfferService = async (flightDetails) => {
  if (!flightDetails) {
    return { success: false, error: { code: 'INVALID_DATA', message: 'No flight details provided' } };
  }

  try {
    logger.info('Flight details received:', flightDetails);

    const flightPrice = await getFlightOfferPrices(flightDetails);

    logger.info('Flight Price response:', flightPrice);

    // Ensure we always return an object with success/data or success/error
    if (!flightPrice || typeof flightPrice !== 'object') {
      return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Invalid flight price response' } };
    }

    return flightPrice; // flightPrice already has { success, data } or { success, error }

  } catch (err) {
    logger.error('FlightPriceOfferService error:', err);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: err.message } };
  }
};

export const getFlightDetailsByFlightOfferId = async(flightOfferId)=>{
  try{
    if(!flightOfferId){
      return 'Invalid Flight Offer Id'
    }
    const flightDetails = await getFlightDetailsByOfferId(flightOfferId)
    if(!flightDetails){
      return 'Failed To Fetch flight details for selected Flight Offer Id'
    }
    return flightDetails
  }catch(err){
    return err.message
  }
}
