/**
 * UAE/GCC Regional Configuration
 *
 * Compliant with UAE Labour Law (Federal Decree-Law No. 33 of 2021)
 */
import { HRModuleConfig } from '../types';
export declare const UAEConfig: HRModuleConfig;
/**
 * UAE Salary Components Template
 */
export declare const UAESalaryComponents: {
    basic: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_percentage: number;
    };
    hra: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_percentage: number;
    };
    transport: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
    };
    food: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
    };
    telephone: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
    };
    education: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
    };
};
/**
 * UAE Public Holidays (2024-25)
 * Note: Islamic holidays are based on lunar calendar and dates vary
 */
export declare const UAEPublicHolidays: {
    date: string;
    name: string;
}[];
/**
 * End of Service Benefits Calculation Rules
 */
export declare const UAEEndOfServiceRules: {
    lessThan1Year: {
        gratuity: number;
        description: string;
    };
    year1to5: {
        daysPerYear: number;
        description: string;
    };
    moreThan5Years: {
        firstFiveYears: number;
        afterFiveYears: number;
        description: string;
    };
    maximum: {
        years: number;
        description: string;
    };
    calculation: {
        formula: string;
        note: string;
    };
};
/**
 * WPS (Wage Protection System) Configuration
 */
export declare const WPSConfig: {
    enabled: boolean;
    reportFormat: string;
    paymentDeadline: number;
    penaltyForDelay: boolean;
    requirementsByCompanySize: {
        '1-49': string;
        '50+': string;
    };
};
/**
 * Notice Period Rules
 */
export declare const UAENoticePeriodRules: {
    limitedContract: {
        minimum: number;
        maximum: number;
        description: string;
    };
    unlimitedContract: {
        minimum: number;
        maximum: number;
        description: string;
    };
    probation: {
        days: number;
        description: string;
    };
};
//# sourceMappingURL=uae.d.ts.map