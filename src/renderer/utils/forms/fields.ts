import {REQUIRED_FIELD_ERROR} from '@renderer/constants/form-validation';
import {Dict, ManagedNode, Nickname} from '@renderer/types';
import yup from './yup';

export const getAddressFormField = (managedNodes: Dict<ManagedNode>, errorMessage: string) =>
  yup.string().when(['ipAddress', 'port'], {
    is: (ipAddress, port) =>
      !!Object.values(managedNodes).find(
        (managedNode) => managedNode.ip_address === ipAddress && managedNode.port === port,
      ),
    otherwise: yup.string(),
    then: yup.string().required(errorMessage),
  });

const genericDomainAddressRegex = /([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/;
export const getDomainAddressField = () =>
  yup
    .string()
    .required(REQUIRED_FIELD_ERROR)
    .matches(genericDomainAddressRegex, {excludeEmptyString: true, message: 'IPv4 or IPv6 addresses only'});

export const getNicknameField = (managedNodes?: Dict<Nickname>, ownNickname?: string) => {
  if (managedNodes) {
    const usedNicknames = Object.values(managedNodes)
      .filter(({nickname}) => (ownNickname ? ownNickname !== nickname : !!nickname))
      .map(({nickname}) => nickname);

    return yup
      .string()
      .matches(/[\S]/, 'Must contain non-whitespace characters.')
      .max(64, 'Nickname must not be more than 64 characters')
      .notOneOf(usedNicknames, 'That nickname is already taken');
  }

  return yup
    .string()
    .matches(/[\S]/, 'Must contain non-whitespace characters.')
    .max(64, 'Nickname must not be more than 64 characters');
};

export const getPortField = () => yup.number().integer().required(REQUIRED_FIELD_ERROR);

export const getProtocolField = () => yup.string().required(REQUIRED_FIELD_ERROR);
