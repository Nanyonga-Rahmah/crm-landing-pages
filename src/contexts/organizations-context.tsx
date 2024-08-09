import React, { createContext, FC, ReactNode, useState } from 'react';

interface Address {
  street: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  region: string;
  postalCode: number;
}

interface IUserOrganization {
  id: string;
  userId: string;
  organizationId: string;
  userType: string;
}

export interface IOrganization {
  name: string;
  id: string;
  Address: Address;
  organizationEmail: string;
  phoneNumber: string;
  description: string;
  userOrganizations: IUserOrganization[];
}

interface OrganizationContextType {
  selectedOrganization: IOrganization | null;
  selectOrganization: (organization: IOrganization) => void;
}

export const OrganizationContext = createContext<
  OrganizationContextType | undefined
>(undefined);

interface OrganizationProviderProps {
  children: ReactNode;
}

export const OrganizationProvider: FC<OrganizationProviderProps> = ({
  children,
}) => {
  const [selectedOrganization, setSelectedOrganization] =
    useState<IOrganization | null>(null);

  const selectOrganization = (organization: IOrganization) => {
    setSelectedOrganization(organization);
  };

  return (
    <OrganizationContext.Provider
      value={{ selectedOrganization, selectOrganization }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
