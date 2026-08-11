export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship' | 'ফুল-টাইম' | 'পার্ট-টাইম' | 'চুক্তিভিত্তিক' | 'ইন্টার্নশিপ';

export interface CompanyInfo {
  name: string;
  tagline?: string;
  logoUrl?: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxId?: string;
  signatoryName: string;
  signatoryTitle: string;
  signatureUrl?: string;
  stampUrl?: string;
}

export interface EmployeeInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  employeeId: string;
  designation: string;
  department: string;
  workLocation: string;
  employmentType: EmploymentType;
  issueDate: string;
  joiningDate: string;
  reportingManager: string;
  probationPeriod: string;
  noticePeriod: string;
}

export interface CompensationComponent {
  id: string;
  name: string;
  amount: number;
  type: 'allowance' | 'deduction';
}

export interface CompensationDetails {
  currency: string;
  currencySymbol: string;
  baseSalary: number;
  salaryFrequency: 'monthly' | 'annually';
  components: CompensationComponent[];
  showTable: boolean;
}

export interface TermsClause {
  id: string;
  title: string;
  content: string;
}

export type TemplateId = 'corporate' | 'classic' | 'startup' | 'executive' | 'food_for_health' | 'creative_decore' | 'custom_company';

export interface BatchEmployeeInput {
  id: string;
  name: string;
  designation: string;
  department?: string;
  baseSalary: number;
  issueDate: string;
  joiningDate: string;
}

export interface TemplateStyle {
  templateId: TemplateId;
  primaryColor: string; // Hex color string e.g. #2563eb
  fontFamily: 'sans' | 'serif' | 'bangla';
  fontSize: 'sm' | 'base' | 'lg';
  showWatermark: boolean;
  showStamp: boolean;
  showHeaderLine: boolean;
  language: 'en' | 'bn';
}

export interface AppointmentLetterData {
  company: CompanyInfo;
  employee: EmployeeInfo;
  compensation: CompensationDetails;
  clauses: TermsClause[];
  style: TemplateStyle;
  customSubject?: string;
  customGreeting?: string;
  customOpeningParagraph?: string;
  customClosing?: string;
  batchEmployees?: BatchEmployeeInput[];
}
