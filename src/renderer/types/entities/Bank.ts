import Node from './shared/Node';

export default interface Bank extends Node {
  confirmation_expiration?: string | null;
  trust?: string;
}
