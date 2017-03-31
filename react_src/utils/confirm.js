import Confirmation from '../components/Common/Confirmation';
import AlertError from '../components/Common/AlertError';
import { createConfirmation } from 'react-confirm';

const defaultConfirmation = createConfirmation(Confirmation);
const defaultAlertError = createConfirmation(AlertError);

export function confirm(message, options = {}) {
   return defaultConfirmation({ message, ...options });
}

export function alertError(title, message) {
   return defaultAlertError({title, message});
}
