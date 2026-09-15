/**
 * India Statutory Compliance Utilities
 *
 * Implements calculations as per:
 * - Employees' Provident Funds and Miscellaneous Provisions Act, 1952 (EPF)
 * - Employees' State Insurance Act, 1948 (ESI)
 * - Professional Tax (PT) - State-wise
 * - Income Tax Act, 1961 (TDS)
 */
import { Form16, PFChallan } from '../types';
/**
 * Calculate Employee Provident Fund (EPF)
 *
 * Rules:
 * - Employee contribution: 12% of Basic + DA
 * - Employer contribution: 12% of Basic + DA
 * - Employer's 12% is split: 3.67% to EPF, 8.33% to EPS (max Rs. 1250)
 * - Wage ceiling: Rs. 15,000 for statutory calculation
 * - Voluntary contribution allowed above ceiling
 *
 * @param basicSalary - Basic salary
 * @param da - Dearness Allowance (default 0)
 * @param options - Configuration options
 * @returns PF calculation breakdown
 */
export declare function calculatePF(basicSalary: number, da?: number, options?: {
    wageRestriction?: boolean;
    voluntaryPfRate?: number;
}): {
    pfWages: number;
    employeeShare: number;
    employerShare: number;
    epsShare: number;
    edliShare: number;
    totalEmployerContribution: number;
    voluntaryPf: number;
};
/**
 * Calculate Employee State Insurance (ESI)
 *
 * Rules:
 * - Applicable if gross wages <= Rs. 21,000 per month
 * - Employee contribution: 0.75% of gross wages
 * - Employer contribution: 3.25% of gross wages
 * - Covers medical benefits for employee and family
 *
 * @param grossWages - Gross salary (all components)
 * @returns ESI calculation breakdown
 */
export declare function calculateESI(grossWages: number): {
    isApplicable: boolean;
    grossWages: number;
    employeeShare: number;
    employerShare: number;
    totalContribution: number;
} | null;
/**
 * Calculate Professional Tax (PT) - State-wise
 *
 * Professional Tax varies by state. This implementation covers major states.
 *
 * @param grossSalary - Gross monthly salary
 * @param state - State code (MH, KA, WB, TN, etc.)
 * @returns Professional tax amount
 */
export declare function calculateProfessionalTax(grossSalary: number, state: string): number;
/**
 * Calculate Tax Deducted at Source (TDS) - FY 2024-25 Rates
 *
 * New Tax Regime (Default from FY 2023-24):
 * - Up to Rs. 3,00,000: Nil
 * - Rs. 3,00,001 to Rs. 6,00,000: 5%
 * - Rs. 6,00,001 to Rs. 9,00,000: 10%
 * - Rs. 9,00,001 to Rs. 12,00,000: 15%
 * - Rs. 12,00,001 to Rs. 15,00,000: 20%
 * - Above Rs. 15,00,000: 30%
 *
 * @param annualIncome - Annual taxable income
 * @param regime - 'new' or 'old' tax regime
 * @param deductions - Deductions under old regime (80C, 80D, etc.)
 * @returns TDS calculation breakdown
 */
export declare function calculateTDS(annualIncome: number, regime?: 'new' | 'old', deductions?: {
    section80C?: number;
    section80D?: number;
    section80G?: number;
    hra?: number;
    lta?: number;
}): {
    taxableIncome: number;
    taxBeforeRebate: number;
    rebate: number;
    surcharge: number;
    cess: number;
    totalTax: number;
    monthlyTDS: number;
};
/**
 * Calculate Gratuity - India
 *
 * Rules:
 * - Applicable after 5 years of continuous service
 * - Formula: (Last drawn salary × 15 days × Years of service) / 26
 * - Maximum: Rs. 20,00,000
 * - Last drawn salary = Basic + DA
 *
 * @param basicSalary - Last drawn basic salary
 * @param da - Dearness Allowance
 * @param yearsOfService - Years of continuous service
 * @returns Gratuity amount
 */
export declare function calculateGratuity(basicSalary: number, da: number, yearsOfService: number): {
    isEligible: boolean;
    gratuityAmount: number;
    calculation: string;
};
/**
 * Generate Form 16 (TDS Certificate)
 *
 * Form 16 is issued by employer to employee showing TDS deducted
 *
 * @param employeeId - Employee ID
 * @param financialYear - Financial year (e.g., "2024-25")
 * @param quarterlyData - Quarterly income and TDS data
 * @returns Form 16 data structure
 */
export declare function generateForm16(employeeId: string, financialYear: string, pan: string, quarterlyData: Array<{
    quarter: number;
    income: number;
    tds: number;
}>): Form16;
/**
 * Generate PF ECR (Electronic Challan cum Return)
 *
 * @param month - Month (YYYY-MM)
 * @param establishmentId - PF establishment ID
 * @param employees - Array of employee PF data
 * @returns PF Challan data
 */
export declare function generatePFChallan(month: string, establishmentId: string, employees: Array<{
    uan: string;
    name: string;
    grossWages: number;
    basicPlusDa: number;
    ncpDays: number;
}>): PFChallan;
/**
 * Calculate Leave Encashment Tax (India)
 *
 * Leave encashment is tax-exempt up to Rs. 3,00,000
 *
 * @param leaveEncashmentAmount - Leave encashment amount
 * @returns Taxable and exempt amounts
 */
export declare function calculateLeaveEncashmentTax(leaveEncashmentAmount: number): {
    exemptAmount: number;
    taxableAmount: number;
};
/**
 * Calculate Bonus (India - Payment of Bonus Act, 1965)
 *
 * Rules:
 * - Minimum: 8.33% of salary or Rs. 100 (whichever is higher)
 * - Maximum: 20% of salary
 * - Calculation ceiling: Rs. 7,000 or minimum wage (whichever is higher)
 * - Applicable if profit > Rs. 20 lakhs (companies), Rs. 5 lakhs (others)
 *
 * @param basicPlusDa - Basic + DA
 * @param workingDays - Days worked in the year
 * @returns Bonus amount
 */
export declare function calculateBonus(basicPlusDa: number, workingDays?: number): {
    minimumBonus: number;
    maximumBonus: number;
    recommendedBonus: number;
};
//# sourceMappingURL=india-compliance.d.ts.map