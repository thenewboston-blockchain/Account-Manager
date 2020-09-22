import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import {AddressData} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';

import './NodeLink.scss';

interface ComponentProps {
  node: AddressData;
  urlBase: 'bank' | 'validator';
}

const NodeLink: FC<ComponentProps> = ({node, urlBase}) => {
  return (
    <NavLink className="NodeLink" to={`/${urlBase}/${formatPathFromNode(node)}/overview`}>
      {node.ip_address}
    </NavLink>
  );
};

export default memo(NodeLink);
