const APP = 'app';
const BANKS = 'banks';
const VALIDATORS = 'validators';

export const ACCOUNTS = 'accounts';
export const CONFIGS = 'configs';

// App
export const ACTIVE_BANK = `${APP}/activeBank`;
export const ACTIVE_PRIMARY_VALIDATOR = `${APP}/activePrimaryValidator`;

// Banks
export const BANK_ACCOUNTS = `${BANKS}/${ACCOUNTS}`;
export const BANK_CONFIGS = `${BANKS}/${CONFIGS}`;

// Validators
export const VALIDATOR_ACCOUNTS = `${VALIDATORS}/${ACCOUNTS}`;
export const VALIDATOR_CONFIGS = `${VALIDATORS}/${CONFIGS}`;
