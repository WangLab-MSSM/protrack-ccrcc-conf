export default {
    cohort: [
      { value: 1001, label: "ccRCC", color: "#29ECEA", show: true },
      { value: 1002, label: "nonCCRCC", color: "#D81B60", show: true },
    ],
    fromCohort: [
      { value: 2001, label: "discovery", color: "#1E88E5", show: true },
      { value: 2002, label: "confirmatory", color: "#004D40", show: true },
      { value: 2003, label: "nonCCRCC", color: "#D81B60", show: true },
    ],
    tumorClass: [
      { value: 3001, label: "ccRCC", color: "#29ECEA", show: true },
      { value: 3002, label: "AML", color: "#F7CBAD", show: true },
      { value: 3003, label: "BHD", color: "#F3B084", show: true },
      { value: 3004, label: "ChRCC", color: "#CB93FF", show: true },
      { value: 3005, label: "ESCRCC", color: "#BE9004", show: true },
      { value: 3006, label: "MEST", color: "#005A9C", show: true },
      { value: 3007, label: "MTOR Mutated RCC", color: "#C45613", show: true },
      { value: 3008, label: "MTSCC-variant", color: "#FEC108", show: true },
      { value: 3009, label: "ND", color: "#056608", show: true },
      { value: 3010, label: "Oncocytoma type1", color: "#FEC9FF", show: true },
      { value: 3011, label: "Oncocytoma type2", color: "#FD91FF", show: true },
      { value: 3012, label: "Oncocytoma variant", color: "#FC53FF", show: true },
      { value: 3013, label: "PRCC", color: "#F7FB9F", show: true },
      { value: 3014, label: "PRCC type1", color: "#FFFF0B", show: true },
      { value: 3015, label: "PUC", color: "#4A0D4B", show: true },
      { value: 3016, label: "TRCC", color: "#FFE799", show: true },
      { value: 3017, label: "unRCC", color: "#DC143C", show: true },
    ],
    Age: [
      { value: 4001, label: "<54.0 (25%)", color: "#A9D6E5", show: true },
      { value: 4002, label: "54.0-62.0 (25%-50%)", color: "#61A5C2", show: true },
      { value: 4003, label: "62.0-69.0(50%-75%)", color: "#2C7DA0", show: true },
      { value: 4004, label: ">=69.0 (>75%)", color: "#014F86", show: true },
    ],
    Gender: [
        { value: 5001, label: "Female", color: "#d55e00", show: true },
        { value: 5002, label: "Male", color: "#0072b2", show: true },
    ],
    consent_race: [
      { value: 6001, label: "Asian", color: "#1081CF", show: true },
      {
        value: 6002,
        label: "Black or African American",
        color: "#37FC24",
        show: true,
      },
      { value: 6005, label: "White", color: "#E20A23", show: true },
      { value: 6004, label: "Not Reported", color: "#ebebeb", show: true },
    ],
    "Vital status": [
      { value: 7001, label: "Deceased", color: "#580581", show: true },
      { value: 7002, label: "Living", color: "#5F8FEB", show: true },
    ],
    Hypertension: [
      { value: 8001, label: "True", color: "#4949FF", show: true },
      { value: 8002, label: "False", color: "#ebebeb", show: true },
    ],
    "Tumor grade": [
      { value: 9001, label: "G1", color: "#dcebca", show: true },
      { value: 9002, label: "G2", color: "#b5c99a", show: true },
      { value: 9003, label: "G3", color: "#849669", show: true },
      { value: 9004, label: "G4", color: "#606f49", show: true },
      { value: 9005, label: "GX", color: "#ebebeb", show: true },
    ],
    BMI: [
      { value: 10003, label: "<18.5", color: "#F1CCCA", show: true },
      { value: 10001, label: "18.5 - 25", color: "#D49DA1", show: true },
      { value: 10002, label: "25 - 30", color: "#C5858C", show: true },
      { value: 10004, label: ">=30", color: "#B76E78", show: true },
    ],
    Weight_at_surgery: [
      { value: 11003, label: "<75.0 (25%)", color: "#B7E4C7", show: true },
      {
        value: 11001,
        label: "75.0-89.0 (25%-50%)",
        color: "#74C69D",
        show: true,
      },
      {
        value: 11002,
        label: "89.0-104.5(50%-75%)",
        color: "#40916C",
        show: true,
      },
      { value: 11004, label: ">=104.5 (>75%)", color: "#1B4332", show: true },
    ],
    "Alcohol consumption": [
      { value: 12001, label: "drinker", color: "#f08080", show: true },
      { value: 12003, label: "past drinker", color: "#ffdab9", show: true },
      { value: 12002, label: "non-drinker", color: "#ffff17", show: true },
      { value: 12004, label: "not reported", color: "#ebebeb", show: true },
    ],
    "Smoking status": [
      { value: 13001, label: "current smoker", color: "#C04F3B", show: true },
      { value: 13004, label: "past smoker", color: "#580605", show: true },
      { value: 13002, label: "non-smoker", color: "#1A7ED4", show: true },
      { value: 13003, label: "not reported", color: "#ebebeb", show: true },
    ],
    Country: [
      { value: 14001, label: "Poland", color: "#136F63", show: true },
      { value: 14002, label: "Ukraine", color: "#E0CA3C", show: true },
      { value: 14003, label: "United States", color: "#F34213", show: true },
      { value: 14004, label: "Vietnam", color: "#3E2F5B", show: true },
      { value: 14005, label: "other", color: "#ebebeb", show: true },
    ],
    "Tumor stage": [
      { value: 15001, label: "Stage I", color: "#eabffa", show: true },
      { value: 15002, label: "Stage II", color: "#cb5df1", show: true },
      { value: 15003, label: "Stage III", color: "#8c07dd", show: true },
      { value: 15004, label: "Stage IV", color: "#58148e", show: true },
      { value: 15005, label: "other", color: "#ebebeb", show: true },
    ],
    methyl_type2: [
      { value: 16002, label: "1.0", color: "#58148e", show: true },
      { value: 16003, label: "2.0", color: "#8AE1FC", show: true },
      { value: 16004, label: "3.0", color: "#B28B84", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    im_type: [
      { value: 17002, label: "im1", color: "#294C60", show: true },
      { value: 17003, label: "im2", color: "#B6465F", show: true },
      { value: 17004, label: "im3", color: "#FFEFD3", show: true },
      { value: 17005, label: "im4", color: "#FFC49B", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    im_type_discovery: [
      { value: 18002, label: "CD8+ inflamed", color: "#FF0000", show: true },
      { value: 18003, label: "CD8- inflamed", color: "#ADD8E6", show: true },
      {
        value: 18004,
        label: "Metabolic immune-desert",
        color: "#98f367",
        show: true,
      },
      { value: 18005, label: "VEGF immune-desert", color: "#FFA500", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    "wgii high": [
      { value: 18001, label: "True", color: "#11C863", show: true },
      { value: 18002, label: "False", color: "#ebebeb", show: true },
    ],
    BAP1: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    FLCN: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    MET: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    MTOR: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    PBRM1: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    SETD2: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    TP53: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    TSC1: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    TSC2: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    VHL: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    CCND1: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#412234", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    gain_chr7: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#F9AB55", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    gain_chr17: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#F9AB55", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    loss_chr1: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#69A197", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    loss_chr3p: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#69A197", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
    loss_chr14q: [
      { value: 18002, label: "0.0", color: "#ebebeb", show: true },
      { value: 18003, label: "1.0", color: "#69A197", show: true },
      { value: null, label: "", color: "#ebebeb", show: true },
    ],
  };
  