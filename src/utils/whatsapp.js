import { businessData } from '../data/business';

export function createWhatsAppURL(vehicleName = "", travelDetails = null) {
  let message = "Hi Suyambu Travels,\n\nI would like to enquire about a booking.";
  
  if (vehicleName || travelDetails) {
    message = "Hi Suyambu Travels,\n\nI would like to enquire about a booking.";
    
    if (vehicleName) {
      message += `\n\nVehicle: ${vehicleName}`;
    }
    
    if (travelDetails) {
      if (travelDetails.date) message += `\nTravel Date: ${travelDetails.date}`;
      if (travelDetails.pickup) message += `\nPickup: ${travelDetails.pickup}`;
      if (travelDetails.destination) message += `\nDestination: ${travelDetails.destination}`;
    }
    
    message += `\n\nPlease share availability and fare details.`;
  }

  return `https://wa.me/${businessData.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
