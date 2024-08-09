import React, { useState } from 'react';

import EnterpriseTypeForm from '@/components/form/EnterpriseTypeForm';
import HomeTypeForm from '@/components/form/HomeTypeForm';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import SolutionServiceForm from './SolutionServiceForm';

type AddLeadProps = {
  type: 'Client' | 'Prospect';
  bType: 'HOME' | 'ENTERPRISE' | 'SOLUTIONS';
  onClose: () => void;
};

export function AddLeadsForm({ type, bType, onClose }: AddLeadProps) {
  const [businessType, setBusinessType] = useState<
    'home' | 'enterprise' | 'solutions'
  >('home');

  const handleBusinessTypeChange = (value: string) => {
    setBusinessType(value as 'home' | 'enterprise' | 'solutions');
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Service Type</h2>
        <RadioGroup
          defaultValue="home"
          onValueChange={handleBusinessTypeChange}
          className="flex md:flex-row flex-col md:space-x-8 py-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="home" />
            <Label htmlFor="home">HOME</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enterprise" id="enterprise" />
            <Label htmlFor="enterprise">ENTERPRISE</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="solutions" id="solutions" />
            <Label htmlFor="solutions">SOLUTIONS</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="w-full">
        {businessType === 'home' && (
          <HomeTypeForm type={type} bType={bType} onClose={onClose} />
        )}
        {businessType === 'enterprise' && (
          <EnterpriseTypeForm type={type} bType={bType} onClose={onClose} />
        )}
        {businessType === 'solutions' && (
          <SolutionServiceForm type={type} bType={bType} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default AddLeadsForm;
