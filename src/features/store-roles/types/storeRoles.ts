export interface StoreRolesForm {
  storeDetails: {
    storeName: string;
    submitter: string;
    role: string;
  };

  usedCars: {
    usedManager?: boolean;
    usedManagerName?: string;

    dedicatedMerchandiser?: boolean;
    merchandiserName?: string;
    merchandiserRoles?: string[];

    usedBuyer?: boolean;
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

export interface PersonRole {
  name: string;
  role: string;
}