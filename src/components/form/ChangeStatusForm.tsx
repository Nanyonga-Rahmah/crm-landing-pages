import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import ClosedLeadForm from './ClosedForm';
import LeadStatusForm from './LeadStatusForm';
import QualifiedLeadForm from './QualifiedLeadForm';

type ChangeStatusFormProps = {
  leadId?: string;
  onClose: () => void;
  businessType?: string;
};

export function ChangeStatusForm({
  leadId,
  onClose,
  businessType,
}: ChangeStatusFormProps) {
  const [status, setStatus] = useState<'LEAD' | 'QUALIFIED' | 'CLOSED'>('LEAD');

  const handleStatusChange = (value: string) => {
    setStatus(value as 'LEAD' | 'QUALIFIED' | 'CLOSED');
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <RadioGroup
          defaultValue="LEAD"
          onValueChange={handleStatusChange}
          className="flex flex-col md:flex-row md:space-x-8 py-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LEAD" id="lead" />
            <Label htmlFor="lead">LEAD</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="QUALIFIED" id="qualified" />
            <Label htmlFor="qualified">QUALIFIED LEAD</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CLOSED" id="closed" />
            <Label htmlFor="closed">CLOSED</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="w-full">
        {status === 'LEAD' && (
          <LeadStatusForm leadId={leadId} onClose={onClose} />
        )}
        {status === 'QUALIFIED' && (
          <QualifiedLeadForm leadId={leadId} onClose={onClose} />
        )}
        {status === 'CLOSED' && (
          <ClosedLeadForm
            leadId={leadId}
            onClose={onClose}
            businessType={businessType}
          />
        )}
      </div>
    </div>
  );
}

export default ChangeStatusForm;
