/**
 * UAE Labour Law Compliance Utilities
 *
 * Implements calculations as per:
 * - UAE Labour Law (Federal Decree-Law No. 33 of 2021)
 * - WPS (Wage Protection System) compliance
 * - End of Service Benefits calculation
 */
import { EndOfServiceBenefits, WPSReport, Payslip } from '../types';
/**
 * Calculate End of Service Benefits (Gratuity) as per UAE Labour Law
 *
 * Rules:
 * - Less than 1 year: No gratuity
 * - 1-5 years: 21 days' basic salary per year
 * - More than 5 years: 21 days for first 5 years + 30 days for each additional year
 * - Maximum: 2 years' basic salary
 *
 * @param dateOfJoining - Employee joining date (YYYY-MM-DD)
 * @param dateOfLeaving - Employee leaving date (YYYY-MM-DD)
 * @param lastBasicSalary - Last drawn basic salary (monthly)
 * @returns End of service benefits calculation
 */
export declare function calculateEndOfServiceBenefits(dateOfJoining: string, dateOfLeaving: string, lastBasicSalary: number): EndOfServiceBenefits;
/**
 * Calculate Leave Encashment for UAE
 *
 * Rules:
 * - Annual Leave: 30 days per year after 1 year of service
 * - Unused leave can be encashed on termination
 * - Pro-rata calculation for incomplete years
 *
 * @param dateOfJoining - Employee joining date
 * @param dateOfLeaving - Employee leaving date
 * @param unusedLeaveDays - Number of unused leave days
 * @param dailyWage - Daily wage rate
 * @returns Leave encashment amount
 */
export declare function calculateLeaveEncashment(dateOfJoining: string, dateOfLeaving: string, unusedLeaveDays: number, dailyWage: number): number;
/**
 * Generate WPS (Wage Protection System) SIF File
 *
 * SIF Format specifications:
 * - Fixed-width text file format
 * - Required for salary payments through UAE banks
 * - Contains employee salary details in specific format
 *
 * @param payslips - Array of payslips for the month
 * @param establishmentId - MOL Establishment ID
 * @param routingCode - Bank routing code
 * @returns WPS SIF file content
 */
export declare function generateWPSSIF(payslips: Payslip[], establishmentId: string, routingCode: string, month: string): string;
/**
 * Validate Emirates ID
 *
 * Emirates ID format: 784-YYYY-NNNNNNN-C
 * - 784: Country code for UAE
 * - YYYY: Year of birth
 * - NNNNNNN: Unique sequence number
 * - C: Check digit
 *
 * @param emiratesId - Emirates ID to validate
 * @returns true if valid, false otherwise
 */
export declare function validateEmiratesId(emiratesId: string): boolean;
/**
 * Calculate Annual Leave Entitlement for UAE
 *
 * Rules:
 * - 30 calendar days per year after 1 year of service
 * - 2 days per month for the first year (pro-rata)
 * - Service less than 6 months: no leave entitlement
 *
 * @param dateOfJoining - Employee joining date
 * @param asOfDate - Calculate leave as of this date (default: today)
 * @returns Number of leave days entitled
 */
export declare function calculateAnnualLeaveEntitlement(dateOfJoining: string, asOfDate?: string): number;
/**
 * Calculate Sick Leave Entitlement for UAE
 *
 * Rules:
 * - 90 days per year (after probation)
 * - First 15 days: Full pay
 * - Next 30 days: Half pay
 * - Remaining 45 days: Unpaid
 *
 * @param dateOfJoining - Employee joining date
 * @param daysTaken - Sick leave days already taken this year
 * @returns Remaining sick leave breakdown
 */
export declare function calculateSickLeaveBalance(dateOfJoining: string, daysTaken: number): {
    fullPay: number;
    halfPay: number;
    unpaid: number;
    total: number;
};
/**
 * Calculate Maternity Leave Entitlement for UAE
 *
 * Rules:
 * - 60 days maternity leave
 * - First 45 days: Full pay
 * - Last 15 days: Half pay
 * - Additional 45 days unpaid (if needed for mother/child illness)
 *
 * @returns Maternity leave entitlement
 */
export declare function getMaternityLeaveEntitlement(): {
    fullPay: number;
    halfPay: number;
    unpaidExtension: number;
    total: number;
};
/**
 * Calculate Notice Period for UAE
 *
 * Rules (Limited Term Contract):
 * - Minimum 30 days' notice
 * - Maximum 90 days' notice
 * - Notice can be given by either party
 *
 * @param contractType - 'limited' or 'unlimited'
 * @param yearsOfService - Years of service
 * @returns Notice period in days
 */
export declare function calculateNoticePeriod(contractType: 'limited' | 'unlimited', yearsOfService: number): number;
/**
 * Generate MOL WPS Report
 *
 * Creates a comprehensive report for Ministry of Labour compliance
 *
 * @param month - Report month (YYYY-MM)
 * @param payslips - Array of payslips
 * @param establishmentId - MOL Establishment ID
 * @returns WPS Report object
 */
export declare function generateMOLReport(month: string, payslips: Payslip[], establishmentId: string): WPSReport;
//# sourceMappingURL=uae-compliance.d.ts.map