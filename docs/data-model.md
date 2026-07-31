interface StoreRolesForm {
  storeDetails: {
    storeName: string;
    submitter: string;
    role: string;
  };

  usedCars: {
    usedManager: boolean;
    usedManagerName?: string;

    dedicatedMerchandiser: boolean;
    merchandiserName?: string;
    merchandiserRoles?: string[];

    usedBuyer: boolean;
    usedBuyerName?: string;
    usedBuyerRoles?: string[];

    initialPricing: PersonRole[];
    priceChanges: PersonRole[];
  };

  newCars: {
    ordering: PersonRole[];
    pricing: PersonRole[];
  };

  leadManagement: {
    leadDistribution: string;
    newPaymentPresentation: string;
    usedPaymentPresentation: string;
  };
}

interface PersonRole {
  name: string;
  role: string;
}

## Store List Source

Source:
MS_Form.pdf

Store Name:
- 401 Dixie Hyundai
- 417 Nissan
- Acura of Hamilton
...


components/forms/
├── PersonRoleList.tsx
└── StringList.tsx

features/store-roles/
├── StoreDetailsSection
├── UsedCarsSection
├── NewCarsSection
├── LeadManagementSection
└── TechStackSection
├── components/
├── constants/
├── hooks/
├── services/
│   └── storeRolesMapper.ts
├── types/
└── ...