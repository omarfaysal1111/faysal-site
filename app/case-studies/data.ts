export const caseStudies = [
  {
    slug: 'ai-shopping-assistant',
    number: '01',
    title: 'AI Shopping Assistant for a Luxury Appliance Retailer',
    client: 'Luxury home-appliance retailer',
    location: 'Saudi Arabia',
    disciplines: ['Commerce strategy', 'AI architecture', 'ERP integration'],
    summary:
      'Conversational product discovery connected to ERP data across the retailer’s website and mobile app.',
    result: '150+',
    resultUnit: 'orders',
    resultPeriod: 'in one month',
    resultBaseline: '3 products · 0 sales in the previous 6 months',
  },
  {
    slug: 'rfid-inventory-control',
    number: '02',
    title: 'RFID Inventory Control for a Retail Operator',
    client: 'Retail operator',
    location: 'Egypt',
    disciplines: ['Inventory architecture', 'RFID integration', 'Mobile application'],
    summary:
      'Unit-level inventory control integrating UHF RFID hardware directly into a Flutter application over BLE.',
    result: '$0',
    resultUnit: 'shortage',
    resultPeriod: 'from the first month',
    resultBaseline: '$250–500 unexplained shortage per month for 4 months',
  },
  {
    slug: 'offline-first-field-sales',
    number: '03',
    title: 'Offline-First Field Sales for a Cloud ERP',
    client: 'Cloud ERP provider',
    location: 'Field sales operations',
    disciplines: ['Field research', 'Product definition', 'ERP synchronisation'],
    summary:
      'An offline-first mobile workflow for invoicing, collections, returns and customer-account access on sales routes.',
    result: 'Paper',
    resultUnit: 'removed',
    resultPeriod: 'from route transactions',
    resultBaseline: 'Handwritten invoices and delayed ERP entry when connectivity failed',
  },
] as const;

export const featuredCaseStudy = caseStudies[0];

export const portfolioItems = [
  {
    slug: 'guider',
    number: 'P01',
    title: 'Guider',
    descriptor: 'White-label gym management platform',
    type: 'Own product',
    role: 'Product direction, architecture and delivery',
    stack: ['Flutter', 'Springboot', 'AWS' , 'PostgreSQL'],
    markets: 'Egypt · Saudi entry path',
    status: 'Built, pre-pilot',
    summary:
      'A B2B mobile platform that gives gyms a continuous, auditable record of the coach–trainee relationship.',
    icon: '/portfolio/guider/icon.png',
    cover: '/portfolio/guider/dashboard.png',
    appStoreUrl: 'https://apps.apple.com/eg/app/guider-fitcoach/id6771743781',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.fitcoach.guider',
  },
] as const;

export const featuredPortfolioItem = portfolioItems[0];
