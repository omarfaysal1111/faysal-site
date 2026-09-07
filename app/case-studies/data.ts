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
    resultLabel: 'orders in one month from three previously unsold products',
  },
] as const;

export const featuredCaseStudy = caseStudies[0];
