/**
 * Payslip Generator Utility
 *
 * Generates professional payslips in HTML and PDF formats
 * with support for multiple regions (UAE, India, Global)
 */
import { Payslip, Employee, HRModuleConfig } from '../types';
/**
 * Generate HTML Payslip
 *
 * @param payslip - Payslip data
 * @param employee - Employee details
 * @param config - HR module configuration
 * @returns HTML string of formatted payslip
 */
export declare function generatePayslipHTML(payslip: Payslip, employee: Employee, config: HRModuleConfig): string;
/**
 * Generate payslip as downloadable file
 *
 * @param payslip - Payslip data
 * @param employee - Employee details
 * @param config - HR module configuration
 * @returns Base64 encoded HTML file
 */
export declare function generatePayslipFile(payslip: Payslip, employee: Employee, config: HRModuleConfig): string;
//# sourceMappingURL=payslip-generator.d.ts.map