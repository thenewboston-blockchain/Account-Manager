const APP = 'app';
export const BANKS = 'banks';
export const NOTIFICATIONS = 'notifications';
export const SOCKETS = 'sockets';
export const VALIDATORS = 'validators';

export const ACCOUNTS = 'accounts';
export const BANK_TRANSACTIONS = 'bank_transactions';
export const BLOCKS = 'blocks';
export const CONFIGS = 'configs';
export const CONFIRMATION_BLOCKS = 'confirmation_blocks';
export const INVALID_BLOCKS = 'invalid_blocks';
export const VALIDATOR_CONFIRMATION_SERVICES = 'validator_confirmation_services';

// App
export const MANAGED_ACCOUNTS = `${APP}/managed_accounts`;
export const MANAGED_BANKS = `${APP}/managed_banks`;
export const MANAGED_FRIENDS = `${APP}/managed_friends`;
export const MANAGED_VALIDATORS = `${APP}/managed_validators`;

// Banks
export const BANK_ACCOUNTS = `${BANKS}/${ACCOUNTS}`;
export const BANK_BANKS = `${BANKS}/${BANKS}`;
export const BANK_BANK_TRANSACTIONS = `${BANKS}/${BANK_TRANSACTIONS}`;
export const BANK_BLOCKS = `${BANKS}/${BLOCKS}`;
export const BANK_CONFIGS = `${BANKS}/${CONFIGS}`;
export const BANK_CONFIRMATION_BLOCKS = `${BANKS}/${CONFIRMATION_BLOCKS}`;
export const BANK_INVALID_BLOCKS = `${BANKS}/${INVALID_BLOCKS}`;
export const BANK_VALIDATORS = `${BANKS}/${VALIDATORS}`;
export const BANK_VALIDATOR_CONFIRMATION_SERVICES = `${BANKS}/${VALIDATOR_CONFIRMATION_SERVICES}`;

// Sockets (crawl & clean)
export const CRAWL_SOCKETS = `${SOCKETS}/crawl`;
export const CLEAN_SOCKETS = `${SOCKETS}/clean`;

// Validators
export const VALIDATOR_ACCOUNTS = `${VALIDATORS}/${ACCOUNTS}`;
export const VALIDATOR_BANKS = `${VALIDATORS}/${BANKS}`;
export const VALIDATOR_CONFIGS = `${VALIDATORS}/${CONFIGS}`;
export const VALIDATOR_VALIDATORS = `${VALIDATORS}/${VALIDATORS}`;

// Account Balances
export const ACCOUNT_BALANCES = 'account_balances';

// Managed Account Balances
export const MANAGED_ACCOUNT_BALANCES = 'managed_account_balances';
