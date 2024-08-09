import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { EnterpriseVisit } from './EnterpriseVisit';
import { HomeVisit } from './HomeVistForm';
import { SolutionVisit } from './SolutionsVisitForm';

export function VisitForm({ onClose }: { onClose: () => void }) {
  const [selectedForm, setSelectedForm] = useState('home');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
    onClose();
  };

  return (
    <>
      <RadioGroup
        defaultValue="home"
        className="md:flex grid grid-cols-2"
        onValueChange={setSelectedForm}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="home" id="r1" />
          <Label htmlFor="r1">HOME</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="enterprise" id="r2" />
          <Label htmlFor="r2">ENTERPRISE</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="solutions" id="r3" />
          <Label htmlFor="r3">SOLUTIONS</Label>
        </div>
      </RadioGroup>

      {selectedForm === 'home' && (
        <div>
          <HomeVisit onClose={handleClose} />
        </div>
      )}

      {selectedForm === 'enterprise' && (
        <div>
          <EnterpriseVisit onClose={handleClose} />
        </div>
      )}

      {selectedForm === 'solutions' && (
        <div>
          <SolutionVisit onClose={handleClose} />
        </div>
      )}
    </>
  );
}
