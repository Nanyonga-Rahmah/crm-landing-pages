import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IEmployee } from '../Tables/EmployeesTable';
import { DeptForm } from './AssignDeptForm';

export interface AssignDemoProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: IEmployee;
}

export function AssignDemo({ isOpen, onClose, employee }: AssignDemoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Assign Department</DialogTitle>
          <DialogDescription>
            Assign members to the department by selecting the department
          </DialogDescription>
        </DialogHeader>
        <DeptForm employee={employee} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
