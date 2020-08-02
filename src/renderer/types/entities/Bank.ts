import Node from './Node';

export default interface Bank extends Node {
  confirmation_expiration?: string | null;
  trust?: string;
}
