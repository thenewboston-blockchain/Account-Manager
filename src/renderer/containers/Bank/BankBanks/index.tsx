import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankBanks} from '@renderer/dispatchers/banks';
import useAddress from '@renderer/hooks/useAddress';
import {getBankBanks} from '@renderer/selectors';
import {unsetBankBanks} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types/store';

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

const BankBanks: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankBanksObject = useSelector(getBankBanks);
  const bankBanks = bankBanksObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankBanks(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankBanks({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  const bankBanksTableData = useMemo<PageTableData[]>(
    () =>
      bankBanks?.results.map((bank) => ({
        key: bank.node_identifier,
        [TableKeys.accountNumber]: bank.account_number,
        [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
        [TableKeys.ipAddress]: bank.ip_address,
        [TableKeys.nodeIdentifier]: bank.node_identifier,
        [TableKeys.port]: bank.port,
        [TableKeys.protocol]: bank.protocol,
        [TableKeys.trust]: bank.trust,
        [TableKeys.version]: bank.version,
      })) || [],
    [bankBanks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBanksTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.defaultTransactionFee]: 'Default Tx Fee',
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
          <PageTable items={pageTableItems} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default BankBanks;
