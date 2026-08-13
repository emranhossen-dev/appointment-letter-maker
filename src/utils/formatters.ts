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

export const formatDynamicOpening = (
  rawOpening: string | undefined,
  data: {
    company: { name?: string };
    employee: { designation?: string; department?: string; joiningDate?: string };
    style: { language?: 'en' | 'bn' };
  }
): string => {
  const { company, employee, style } = data;
  const isBn = style.language === 'bn';
  const compName = company.name?.trim() || (isBn ? 'কোম্পানি' : 'Company');
  const desig = employee.designation?.trim() || (isBn ? 'কর্মকর্তা' : 'Officer');
  const joinDate = formatDateDisplay(employee.joiningDate || '', isBn ? 'bn' : 'en');

  if (!rawOpening || rawOpening.trim() === '') {
    if (isBn) {
      return `${compName}-এর নির্বাহী নেতৃত্বের পক্ষ থেকে আপনাকে ${desig} পদে নিয়োগপত্র প্রদান করতে পেরে আমরা আনন্দিত।${joinDate ? ' আগামী ' + joinDate + ' তারিখ হতে আপনার যোগদান কার্যকর হবে।' : ''} নিয়োগের মূল শর্তাবলী ও সুবিধাসমূহ নিম্নে তুলে ধরা হলো:`;
    }
    return `On behalf of the executive leadership of ${compName}, it is our privilege to formalize your appointment as ${desig}.${joinDate ? ' Effective from ' + joinDate + ',' : ''} your employment terms, obligations, and financial compensation plan are outlined below:`;
  }

  let text = rawOpening;

  if (employee.designation?.trim()) {
    text = text
      .replace(/Content Writer/gi, employee.designation)
      .replace(/Senior Full Stack Software Engineer/gi, employee.designation)
      .replace(/Senior Hand Stitcher/gi, employee.designation)
      .replace(/Senior Business Development Manager/gi, employee.designation)
      .replace(/সিনিয়র বিজনেস ডেভেলপমেন্ট ম্যানেজার/g, employee.designation);
  }

  text = text
    .replace(/ in the Digital Marketing department/gi, '')
    .replace(/ in Digital Marketing/gi, '');

  if (company.name?.trim()) {
    text = text
      .replace(/Nexus Innovation Technologies Ltd\./g, company.name)
      .replace(/Nexus Innovation Technologies/g, company.name)
      .replace(/প্রগতি কনসালটিং ও টেকনোলজিস লিঃ/g, company.name)
      .replace(/FOOD FOR HEALTH/g, company.name)
      .replace(/Food for Health/g, company.name)
      .replace(/CREATIVE DECORE/g, company.name)
      .replace(/Creative Decore/g, company.name);
  }

  return text;
};

export const formatDynamicSubject = (
  rawSubject: string | undefined,
  data: {
    employee: { designation?: string };
    style: { language?: 'en' | 'bn' };
  }
): string => {
  const { employee, style } = data;
  const isBn = style.language === 'bn';
  const desig = employee.designation?.trim() || (isBn ? 'পদবী' : 'POSITION');

  if (!rawSubject || rawSubject.trim() === '') {
    return isBn
      ? `নিয়োগপত্র প্রদান সংক্রান্ত - ${desig}`
      : `LETTER OF APPOINTMENT FOR THE POSITION OF ${desig.toUpperCase()}`;
  }

  let text = rawSubject;
  if (employee.designation?.trim()) {
    text = text
      .replace(/CONTENT WRITER/gi, employee.designation.toUpperCase())
      .replace(/Content Writer/gi, employee.designation)
      .replace(/SENIOR FULL STACK SOFTWARE ENGINEER/gi, employee.designation.toUpperCase())
      .replace(/Senior Full Stack Software Engineer/gi, employee.designation)
      .replace(/SENIOR HAND STITCHER/gi, employee.designation.toUpperCase())
      .replace(/Senior Hand Stitcher/gi, employee.designation);
  }
  return text;
};
