import type { CompensationDetails } from '../types/appointment';

export const formatCurrency = (amount: number, symbol: string = '৳'): string => {
  return `${symbol} ${amount.toLocaleString('en-US')}`;
};

export const calculateCompensationTotals = (compensation: CompensationDetails) => {
  const base = compensation.baseSalary || 0;
  
  const totalAllowances = compensation.components
    .filter(c => c.type === 'allowance')
    .reduce((sum, c) => sum + (c.amount || 0), 0);

  const totalDeductions = compensation.components
    .filter(c => c.type === 'deduction')
    .reduce((sum, c) => sum + (c.amount || 0), 0);

  const grossSalary = base + totalAllowances;
  const netSalary = grossSalary - totalDeductions;
  
  const annualGross = compensation.salaryFrequency === 'monthly' ? grossSalary * 12 : grossSalary;

  return {
    base,
    totalAllowances,
    totalDeductions,
    grossSalary,
    netSalary,
    annualGross,
  };
};

export const formatDateDisplay = (dateString: string, lang: 'en' | 'bn' = 'en'): string => {
  if (!dateString) return '';
  
  try {
    let date: Date;
    const ymdMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymdMatch) {
      const [, y, m, d] = ymdMatch;
      date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) return dateString;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (lang === 'bn') {
      return date.toLocaleDateString('bn-BD', options);
    }
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
};
