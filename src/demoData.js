export const seedTransactions = [
    {
        id: 'Q0000416',
        reference: 'PICHITEED01400438',
        ownerId: 'user-123',
        payFrom: 'Account Title 5015103698305 CNY',
        payeeName: 'Payee, OtherBank',
        bank: 'CHINA CONSTRUCTION BANK CORPORATION, SINGAPORE BRANCH',
        currency: 'CNY',
        amount: 100.0,
        date: '2023-06-19',
        status: 'PENDING_AUTH',
        utr: '121d34d0-4053-40fc-ad91-27c6fd65e919'
    },
    {
        id: 'Q0000417',
        reference: 'REF-002',
        ownerId: 'user-123',
        payFrom: 'Account Title 1234567890 CNY',
        payeeName: 'Alice Lee',
        bank: 'SCBLNXSXSHA CN',
        currency: 'CNY',
        amount: 350.0,
        date: '2023-06-18',
        status: 'DRAFT'
    },
    {
        id: 'Q0000418',
        reference: 'REF-003',
        ownerId: 'user-123',
        payFrom: 'Account Title 9876543210 CNY',
        payeeName: 'Bob Chen',
        bank: 'ICBC CN',
        currency: 'CNY',
        amount: 100.0,
        date: '2023-06-17',
        status: 'AUTHORIZED'
    }
];

export const seedBatches = [
    {
        id: 'C0000003',
        ownerId: 'user-123',
        createdBy: 'TESTUSER',
        createdAt: '2023-06-19T14:28:34Z',
        count: 3,
        largest: 100.0,
        total: 300.0,
        currency: 'CNY',
        status: 'REJECTED'
    },
    {
        id: 'C0000004',
        ownerId: 'user-123',
        createdBy: 'TESTUSER',
        createdAt: '2023-06-19T14:27:59Z',
        count: 1,
        largest: 100.0,
        total: 100.0,
        currency: 'CNY',
        status: 'AUTHORIZED'
    },
    {
        id: 'C0000005',
        ownerId: 'user-123',
        createdBy: 'TESTUSER',
        createdAt: '2023-06-19T14:25:59Z',
        count: 1,
        largest: 100.0,
        total: 100.0,
        currency: 'CNY',
        status: 'AUTHORIZED'
    },
    {
        id: 'C0000006',
        ownerId: 'user-123',
        createdBy: 'TESTUSER',
        createdAt: '2023-06-19T14:22:59Z',
        count: 1,
        largest: 100.0,
        total: 100.0,
        currency: 'CNY',
        status: 'BATCHED'
    }
];