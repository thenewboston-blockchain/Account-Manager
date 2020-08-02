import Node from './Node';

export default interface Validator extends Node {
  daily_confirmation_rate: string | null;
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_identifier: string;
  trust?: string;
}
