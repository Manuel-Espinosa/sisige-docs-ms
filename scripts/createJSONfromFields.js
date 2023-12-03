const fields =  [
    "AC_1_E",
    "HRS_1_E",
    "IA_1_A",
    "IA_1_B",
    "IA_1_C",
    "IA_1_D",
    "IA_1_F",
    "IA_1_E",
    "EA_1_EF_F1",
    "EA_1_A_F1",
    "EA_1_F1",
    "EA_1_F2",
    "EA_1_F3",
    "EA_1_P_F1",
    "EA_1_P_F2",
    "EA_1_P_F3",
    "EA_1_A_F2",
    "EA_1_A_F3",
    "EA_1_B_F1",
    "EA_1_B_F2",
    "EA_1_B_F3",
    "EA_1_C_F1",
    "EA_1_C_F2",
    "EA_1_C_F3",
    "EA_1_D_F1",
    "EA_1_D_F2",
    "EA_1_E_F1",
    "EA_1_E_F2",
    "EA_1_E_F3",
    "EA_1_F_F1",
    "EA_1_F_F2",
    "EA_1_F_F3",
    "EA_1_EF_F2",
    "EA_1_EF_F3",
    "HRS_2_E",
    "AC_2_E",
    "AC_2",
    "HRS_2",
    "EA_1_PT_F4",
    "EA_1_A_F4",
    "EA_1_B_F4",
    "EA_1_PT_F1",
    "EA_1_A_F8",
    "EA_1_C_F4",
    "EA_1_E_F4",
    "EA_1_F_F4",
    "EA_1_B_F8",
    "EA_1_PT_F2",
    "EA_1_A_F9",
    "EA_1_EF_F4",
    "EA_1_C_F8",
    "EA_1_D_F8",
    "EA_1_E_F8",
    "EA_1_F_F8",
    "EA_1_B_F9",
    "EA_1_PT_F3",
    "EA_1_A_F10",
    "EA_1_D_F3",
    "EA_1_D_F4",
    "EA_2_E_F2",
    "EA_2_E_F3",
    "EA_2_E_F4",
    "AC_3",
    "HRS_3",
    "IA_2_A",
    "IA_2_B",
    "IA_2_C",
    "IA_2_D",
    "IA_2_F",
    "IA_2_E",
    "EA_2_F1",
    "EA_2_F2",
    "EA_2_F3",
    "EA_2_P_F1",
    "EA_2_P_F2",
    "EA_2_P_F3",
    "EA_2_A_F2",
    "EA_2_A_F3",
    "EA_2_B_F1",
    "EA_2_B_F2",
    "EA_2_B_F3",
    "EA_2_C_F1",
    "EA_2_C_F2",
    "EA_2_C_3",
    "EA_2_D_F1",
    "EA_2_D_F2",
    "EA_2_D_F3",
    "EA_2_E_F1",
    "EA_2_F_F1",
    "EA_2_EF_F2",
    "EA_2_EF_F3",
    "EA_2_A_F1",
    "EA_2_EF_F1",
    "EA_2_EF_F4",
    "EA_2_C_F4",
    "EA_2_D_F4",
    "EA_2_B_F4",
    "EA_2_P_F4",
    "EA_2_A_F4",
    "EA_3_F_F1",
    "EA_3_F_F2",
    "EA_3_F_F3",
    "EA_3_F_F4",
    "AC_4",
    "HRS_4",
    "HRS_4_E",
    "AC_4_E",
    "IA_3_A",
    "IA_3_B",
    "IA_3_C",
    "IA_3_D",
    "IA_3_F",
    "IA_3_E",
    "IA_4_A",
    "IA_4_B",
    "IA_4_C",
    "IA_4_D",
    "IA_4_E",
    "IA_4_F",
    "EA_3_F1",
    "EA_3_F2",
    "EA_3_F3",
    "EA_3_P_F1",
    "EA_3_P_F2",
    "EA_3_P_F3",
    "EA_3_A_F2",
    "EA_3_A_F3",
    "EA_3_B_F1",
    "EA_3_B_F2",
    "EA_3_B_F3",
    "EA_3_C_F1",
    "EA_3_C_F2",
    "EA_3_C_F3",
    "EA_3_D_F1",
    "EA_3_D_F2",
    "EA_3_D_F3",
    "EA_3_E_F1",
    "EA_3_E_F2",
    "EA_3_E_F3",
    "EA_3_A_F1",
    "EA_3_C_F4",
    "EA_3_D_F4",
    "EA_3_E_F4",
    "EA_3_B_F4",
    "EA_3_P_F4",
    "EA_3_A_F4",
    "EA_4_F1",
    "EA_4_F2",
    "EA_4_F3",
    "EA_4_P_F1",
    "EA_4_P_F2",
    "EA_4_P_F3",
    "EA_4_P_F4",
    "EA_4_A_F1",
    "EA_4_A_F2",
    "EA_4_A_F3",
    "EA_4_A_F4",
    "EA_4_B_F1",
    "EA_4_B_F2",
    "EA_4_B_F3",
    "EA_4_B_F4",
    "EA_4_C_F1",
    "EA_4_C_F2",
    "EA_4_C_F3",
    "EA_4_C_F4",
    "EA_4_D_F1",
    "EA_4_D_F2",
    "EA_4_D_F4",
    "EA_4_E_F1",
    "EA_4_E_F3",
    "EA_4_E_F4",
    "EA_4_F_F4",
    "EA_4_F_F1",
    "EA_4_F_F2",
    "EA_4_F_F3",
    "AD",
    "AD_E",
    "TP_1",
    "TP_2",
    "TP_3",
    "TP_4",
    "TP_5",
    "TP_6",
    "TP_7",
    "TP_9",
    "TP_10",
    "TP_11",
    "TP_12",
    "TP_13",
    "TP_14",
    "TP_15",
    "TP_16",
    "TP_17",
    "TP_8",
    "TP_18",
    "TR_1",
    "TR_2",
    "TR_4",
    "TR_5",
    "TR_6",
    "TR_7",
    "TR_8",
    "TR_9",
    "TR_10",
    "TR_11",
    "TR_12",
    "TR_13",
    "TR_14",
    "TR_15",
    "TR_16",
    "TR_17",
    "TR_3",
    "TR_18",
    "SD_1",
    "SD_2",
    "SD_4",
    "SD_5",
    "SD_6",
    "SD_7",
    "SD_8",
    "SD_9",
    "SD_10",
    "SD_11",
    "SD_12",
    "SD_13",
    "SD_14",
    "SD_15",
    "SD_16",
    "SD_17",
    "SD_3",
    "SD_18",
    "F_E",
    "ND",
    "NJ",
    "I_J",
    "I_D",
    "AC_1",
    "HRS_1"
]
let doc = {};

// Function to generate a random string of 1 to 3 characters
function getRandomValue() {
    const length = Math.floor(Math.random() * 3) + 1; // Random length from 1 to 3
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

fields.forEach(field => {
    doc[field] = getRandomValue();
});

console.log(JSON.stringify(doc));