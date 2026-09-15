"use strict";
/**
 * @sak-erp/hr-module
 * Standalone HR & Payroll Management System
 *
 * A comprehensive, industry-standard HR module that can be integrated into any application.
 * Supports multi-region compliance (UAE, India, Global) with customizable workflows.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePayslipFile = exports.generatePayslipHTML = exports.calculateBonus = exports.calculateLeaveEncashmentTax = exports.generatePFChallan = exports.generateForm16 = exports.calculateGratuity = exports.calculateTDS = exports.calculateProfessionalTax = exports.calculateESI = exports.calculatePF = exports.generateMOLReport = exports.calculateNoticePeriod = exports.getMaternityLeaveEntitlement = exports.calculateSickLeaveBalance = exports.calculateAnnualLeaveEntitlement = exports.validateEmiratesId = exports.generateWPSSIF = exports.calculateLeaveEncashment = exports.calculateEndOfServiceBenefits = exports.IndiaConfig = exports.UAEConfig = void 0;
// Export types
__exportStar(require("./types"), exports);
// Export regional configs
var uae_1 = require("./config/uae");
Object.defineProperty(exports, "UAEConfig", { enumerable: true, get: function () { return uae_1.UAEConfig; } });
var india_1 = require("./config/india");
Object.defineProperty(exports, "IndiaConfig", { enumerable: true, get: function () { return india_1.IndiaConfig; } });
// Export UAE compliance utilities
var uae_compliance_1 = require("./utils/uae-compliance");
Object.defineProperty(exports, "calculateEndOfServiceBenefits", { enumerable: true, get: function () { return uae_compliance_1.calculateEndOfServiceBenefits; } });
Object.defineProperty(exports, "calculateLeaveEncashment", { enumerable: true, get: function () { return uae_compliance_1.calculateLeaveEncashment; } });
Object.defineProperty(exports, "generateWPSSIF", { enumerable: true, get: function () { return uae_compliance_1.generateWPSSIF; } });
Object.defineProperty(exports, "validateEmiratesId", { enumerable: true, get: function () { return uae_compliance_1.validateEmiratesId; } });
Object.defineProperty(exports, "calculateAnnualLeaveEntitlement", { enumerable: true, get: function () { return uae_compliance_1.calculateAnnualLeaveEntitlement; } });
Object.defineProperty(exports, "calculateSickLeaveBalance", { enumerable: true, get: function () { return uae_compliance_1.calculateSickLeaveBalance; } });
Object.defineProperty(exports, "getMaternityLeaveEntitlement", { enumerable: true, get: function () { return uae_compliance_1.getMaternityLeaveEntitlement; } });
Object.defineProperty(exports, "calculateNoticePeriod", { enumerable: true, get: function () { return uae_compliance_1.calculateNoticePeriod; } });
Object.defineProperty(exports, "generateMOLReport", { enumerable: true, get: function () { return uae_compliance_1.generateMOLReport; } });
// Export India compliance utilities
var india_compliance_1 = require("./utils/india-compliance");
Object.defineProperty(exports, "calculatePF", { enumerable: true, get: function () { return india_compliance_1.calculatePF; } });
Object.defineProperty(exports, "calculateESI", { enumerable: true, get: function () { return india_compliance_1.calculateESI; } });
Object.defineProperty(exports, "calculateProfessionalTax", { enumerable: true, get: function () { return india_compliance_1.calculateProfessionalTax; } });
Object.defineProperty(exports, "calculateTDS", { enumerable: true, get: function () { return india_compliance_1.calculateTDS; } });
Object.defineProperty(exports, "calculateGratuity", { enumerable: true, get: function () { return india_compliance_1.calculateGratuity; } });
Object.defineProperty(exports, "generateForm16", { enumerable: true, get: function () { return india_compliance_1.generateForm16; } });
Object.defineProperty(exports, "generatePFChallan", { enumerable: true, get: function () { return india_compliance_1.generatePFChallan; } });
Object.defineProperty(exports, "calculateLeaveEncashmentTax", { enumerable: true, get: function () { return india_compliance_1.calculateLeaveEncashmentTax; } });
Object.defineProperty(exports, "calculateBonus", { enumerable: true, get: function () { return india_compliance_1.calculateBonus; } });
// Export payslip generator
var payslip_generator_1 = require("./utils/payslip-generator");
Object.defineProperty(exports, "generatePayslipHTML", { enumerable: true, get: function () { return payslip_generator_1.generatePayslipHTML; } });
Object.defineProperty(exports, "generatePayslipFile", { enumerable: true, get: function () { return payslip_generator_1.generatePayslipFile; } });
