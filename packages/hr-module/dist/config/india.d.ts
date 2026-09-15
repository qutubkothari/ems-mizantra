/**
 * India Regional Configuration
 *
 * Compliant with Indian labour laws and statutory requirements
 */
import { HRModuleConfig } from '../types';
export declare const IndiaConfig: HRModuleConfig;
/**
 * India Salary Components Template
 */
export declare const IndiaSalaryComponents: {
    basic: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_percentage: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
    hra: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_percentage: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
        tax_exemption: string;
    };
    da: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_percentage: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
    lta: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
    medical: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
    special: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_percentage: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
    telephone: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
    transport: {
        name: string;
        is_taxable: boolean;
        is_mandatory: boolean;
        typical_amount: number;
        pf_applicable: boolean;
        esi_applicable: boolean;
    };
};
/**
 * India Public Holidays (2024-25) - Tentative
 * Varies by state and company policy
 */
export declare const IndiaPublicHolidays: {
    date: string;
    name: string;
}[];
/**
 * State-wise Minimum Wages (Sample - 2024)
 * Should be updated regularly as per government notifications
 */
export declare const IndiaMinimumWages: {
    MH: {
        unskilled: number;
        semiskilled: number;
        skilled: number;
        highlySkilled: number;
    };
    DL: {
        unskilled: number;
        semiskilled: number;
        skilled: number;
        highlySkilled: number;
    };
    KA: {
        unskilled: number;
        semiskilled: number;
        skilled: number;
        highlySkilled: number;
    };
    TN: {
        unskilled: number;
        semiskilled: number;
        skilled: number;
        highlySkilled: number;
    };
    GJ: {
        unskilled: number;
        semiskilled: number;
        skilled: number;
        highlySkilled: number;
    };
};
/**
 * Professional Tax Slabs by State
 */
export declare const ProfessionalTaxSlabs: {
    MH: {
        slabs: {
            min: number;
            max: number;
            tax: number;
        }[];
        annual_max: number;
    };
    KA: {
        slabs: {
            min: number;
            max: number;
            tax: number;
        }[];
    };
    WB: {
        slabs: {
            min: number;
            max: number;
            tax: number;
        }[];
    };
};
/**
 * PF Rules
 */
export declare const PFRules: {
    applicability: {
        employee_threshold: number;
        wage_ceiling: number;
        voluntary_above_ceiling: boolean;
    };
    contribution: {
        employee: number;
        employer: number;
        eps_ceiling: number;
        vpf_allowed: boolean;
    };
    administration: {
        due_date: number;
        uan_required: boolean;
        ecr_filing: string;
        portal: string;
    };
};
/**
 * ESI Rules
 */
export declare const ESIRules: {
    applicability: {
        wage_ceiling: number;
        employee_threshold: number;
    };
    contribution: {
        employee: number;
        employer: number;
    };
    benefits: {
        medical: string;
        sickness: string;
        maternity: string;
        disablement: string;
        dependents: string;
    };
    administration: {
        due_date: number;
        esic_registration: string;
        portal: string;
    };
};
/**
 * TDS Rules (FY 2024-25)
 */
export declare const TDSRules: {
    new_regime: {
        slabs: {
            min: number;
            max: number;
            rate: number;
        }[];
        rebate_87a: {
            applicable_upto: number;
            amount: number;
        };
    };
    old_regime: {
        slabs: {
            min: number;
            max: number;
            rate: number;
        }[];
        rebate_87a: {
            applicable_upto: number;
            amount: number;
        };
        deductions: {
            section_80c: {
                max: number;
            };
            section_80d: {
                max: number;
            };
            section_80g: {
                type: string;
            };
            hra_exemption: boolean;
            lta_exemption: boolean;
        };
    };
    surcharge: {
        min: number;
        max: number;
        rate: number;
    }[];
    cess: number;
};
/**
 * Gratuity Rules (Payment of Gratuity Act, 1972)
 */
export declare const GratuityRules: {
    eligibility: {
        minimum_service: number;
        exception: string;
    };
    calculation: {
        formula: string;
        components: string;
        maximum: number;
    };
    payment: {
        timeline: string;
        tax: {
            exempt_limit: number;
            taxable: string;
        };
    };
};
/**
 * Bonus Rules (Payment of Bonus Act, 1965)
 */
export declare const BonusRules: {
    applicability: {
        employee_threshold: number;
        salary_limit: number;
    };
    calculation: {
        minimum: number;
        maximum: number;
        wage_ceiling: number;
        profit_sharing: boolean;
    };
    payment: {
        timeline: string;
    };
};
/**
 * Maternity Benefit Rules
 */
export declare const MaternityRules: {
    duration: {
        first_two_children: number;
        after_two_children: number;
    };
    wages: {
        rate: number;
        calculation: string;
    };
    notice: {
        before_delivery: number;
        after_delivery: number;
    };
};
//# sourceMappingURL=india.d.ts.map