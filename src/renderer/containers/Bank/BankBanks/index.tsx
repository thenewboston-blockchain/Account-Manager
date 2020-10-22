import React, {FC, useCallback, useMemo, useState} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import {Loader} from '@renderer/components/FormElements';
import Icon, {IconType} from '@renderer/components/Icon';
import NodeLink from '@renderer/components/NodeLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import {BANK_BANKS} from '@renderer/constants';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ManagedNode, Node} from '@renderer/types';

import './BankBanks.scss';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  defaultTransactionFee,
  protocol,
  ipAddress,
  port,
  trust,
  version,
}

interface ComponentProps {
  managedBank?: ManagedNode;
}

const BankBanks: FC<ComponentProps> = ({managedBank}) => {
  const address = useAddress();
  const {count, currentPage, loading, results: bankBanks, setPage, totalPages} = usePaginatedNetworkDataFetcher<Node>(
    BANK_BANKS,
    address,
  );
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustBank, setEditTrustBank] = useState<Node | null>(null);

  const hasSigningKey = useMemo(() => !!managedBank?.nid_signing_key.length, [managedBank]);

  const handleEditTrustButton = useCallback(
    (bank: Node) => (): void => {
      setEditTrustBank(bank);
      toggleEditTrustModal();
    },
    [setEditTrustBank, toggleEditTrustModal],
  );

  const bankBanksTableData = useMemo<PageTableData[]>(
    () =>
      bankBanks.map((bank) => ({
        key: bank.node_identifier,
        [TableKeys.accountNumber]: <AccountLink accountNumber={bank.account_number} />,
        [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={bank} urlBase="bank" />,
        [TableKeys.nodeIdentifier]: bank.node_identifier,
        [TableKeys.port]: bank.port,
        [TableKeys.protocol]: bank.protocol,
        [TableKeys.trust]: (
          <div className="BankBanks__trust-cell">
            {bank.trust}{' '}
            {hasSigningKey ? (
              <Icon
                className="BankBanks__edit-trust-icon"
                icon={IconType.pencil}
                onClick={handleEditTrustButton(bank)}
                size={15}
                totalSize={18}
              />
            ) : null}
          </div>
        ),
        [TableKeys.version]: bank.version,
      })) || [],
    [bankBanks, handleEditTrustButton, hasSigningKey],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBanksTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.defaultTransactionFee]: 'Tx Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'Network ID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
        [TableKeys.trust]: 'Trust',
        [TableKeys.version]: 'Version',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.accountNumber,
        TableKeys.defaultTransactionFee,
        TableKeys.protocol,
        TableKeys.ipAddress,
        TableKeys.port,
        TableKeys.trust,
        TableKeys.version,
      ],
    }),
    [bankBanksTableData],
  );

  return (
    <div className="BankBanks">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
          <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
          {editTrustModalIsOpen && !!editTrustBank && !!managedBank && (
            <EditTrustModal
              close={toggleEditTrustModal}
              requestingNode={managedBank}
              targetIdentifier={editTrustBank.node_identifier}
              targetType="banks"
              trust={editTrustBank.trust}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BankBanks;
