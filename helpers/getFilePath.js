export const getFilePath = (fileName) => {
  // Define a mapping of file names to file paths
  const fileMappings = {
    "SGI_G3_3.1_INSTRUM_DIDAC_PLANES_2015_2022":
      "./templates/SGI_G3_3.1_INSTRUM_DIDAC_PLANES_2015_2022.pdf",

    /**Instrumentaciones primer semestre */
    "ACA-0907-I": "./templates/materias/1/ACA-0907/ACA-0907-I.pdf",
    "ACC-0906-I": "./templates/materias/1/ACC-0906/ACC-0906-I.pdf",
    "ACF-0901-I": "./templates/materias/1/ACF-0901/ACF-0901-I.pdf",
    "AED-1285-I": "./templates/materias/1/AED-1285/AED-1285-I.pdf",
    "AEF-1041-I": "./templates/materias/1/AEF-1041/AEF-1041-I.pdf",
    "SCH-1024-I": "./templates/materias/1/SCH-1024/SCH-1024-I.pdf",

    /**Blueprints Instrumentaciones primer semestre */
    "ACA-0907-I-B": "./templates/materias/1/ACA-0907/ACA-0907-I-B.json",

    // Add more file mappings as needed
  };

  // Check if the provided fileName exists in the mapping
  if (fileName in fileMappings) {
    return fileMappings[fileName];
  } else {
    // If the fileName is not found, you can return a default or handle the error as needed
    throw new Error(`File '${fileName}' not found in the mappings.`);
  }
};
