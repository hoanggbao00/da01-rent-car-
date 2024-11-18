'use client';

import React, { useState } from 'react';
import { CompanyDetails } from './CompanyDetails';
import { Flex } from '@mantine/core';
import { LoginDetails } from './LoginDetails';
import { IReqProviderProps } from '@/models/req.model';

const initialCompanyDetails: Partial<IReqProviderProps> = {
  profileUrl: '',
  companyName: '',
  businessRegistrationNumber: '',
  contactName: '',
  phone: '',
  email: '',
  region_code: -1,
};

export const ProvidersAccountCreation = () => {
  const [companyDetails, setCompanyDetails] = useState<
    Partial<IReqProviderProps>
  >(initialCompanyDetails);
  const [page, setPage] = useState<number>(1);

  return (
    <Flex
      direction="column"
      mx="auto"
      p="xl"
      style={{
        maxWidth: '70%',
      }}
    >
      {page === 1 && (
        <CompanyDetails
          companyDetails={companyDetails}
          setCompanyDetails={setCompanyDetails}
          next={() => setPage(2)}
        />
      )}
      {page === 2 && (
        <LoginDetails
          companyDetails={companyDetails}
          setCompanyDetails={setCompanyDetails}
          prev={() => setPage(1)}
        />
      )}
    </Flex>
  );
};
