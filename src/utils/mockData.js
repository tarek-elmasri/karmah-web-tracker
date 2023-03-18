export const mockPlans = [
  {
    id: 1,
    startDate: "04-03-2023",
    endDate: "06-08-2023",
    days: 3,
    area: {
      id: 1,
      name: "الرياض - الاحساء - الجنوب - الدمام",
    },
    user: {
      id: 1,
      name: "tarek",
    },
    plan_accounts: [
      {
        id: 1,
        name: "riyadh acc",
      },
      {
        id: 2,
        name: "riyadh acc2",
      },
    ],
  },
  {
    id: 2,
    startDate: "08-03-2023",
    endDate: "02-06-2023",
    days: 6,
    area: {
      id: 2,
      name: "jedda",
    },
    user: {
      id: 1,
      name: "tarek",
    },
    plan_accounts: [
      {
        id: 2,
        name: "jedda acc",
      },
      {
        id: 3,
        name: "jedda acc2",
      },
    ],
  },
];

export const fetchAreas = async () => {
  const areas = [
    {
      id: 1,
      name: "الدمام - الاحساء - الخبر",
      accounts: [
        {
          id: 1,
          name: "اكونت 1",
        },
        {
          id: 2,
          name: "كونت 2",
        },
      ],
    },
    {
      id: 2,
      name: "الرياض - القصيم",
      accounts: [
        {
          id: 3,
          name: "اكونت 3",
        },
        {
          id: 4,
          name: "كونت 4",
        },
      ],
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(areas);
    }, 1000);
  });
};
