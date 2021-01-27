import React, {FC} from 'react';

export interface FormValues {
  validators: Array<{
    amount: string;
    nodeIdentifier: string;
  }>;
}

interface ComponentProps {
  submitting: boolean;
}

const BulkPurchaseConfirmationServicesModalFields: FC<ComponentProps> = ({submitting}) => {
  return <div className="BulkPurchaseConfirmationServicesModalFields">{submitting} Hello World</div>;
};

export default BulkPurchaseConfirmationServicesModalFields;
