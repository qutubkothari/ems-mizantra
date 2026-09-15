/**
 * @sak-erp/hr-module
 * Standalone HR & Payroll Management System
 *
 * A comprehensive, industry-standard HR module that can be integrated into any application.
 * Supports multi-region compliance (UAE, India, Global) with customizable workflows.
 */
export * from './types';
export { UAEConfig } from './config/uae';
export { IndiaConfig } from './config/india';
export { calculateEndOfServiceBenefits, calculateLeaveEncashment, generateWPSSIF, validateEmiratesId, calculateAnnualLeaveEntitlement, calculateSickLeaveBalance, getMaternityLeaveEntitlement, calculateNoticePeriod, generateMOLReport } from './utils/uae-compliance';
export { calculatePF, calculateESI, calculateProfessionalTax, calculateTDS, calculateGratuity, generateForm16, generatePFChallan, calculateLeaveEncashmentTax, calculateBonus } from './utils/india-compliance';
export { generatePayslipHTML, generatePayslipFile } from './utils/payslip-generator';
//# sourceMappingURL=index.d.ts.map