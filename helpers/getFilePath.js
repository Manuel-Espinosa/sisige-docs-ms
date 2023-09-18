export const getFilePath = (fileName) => {
    // Define a mapping of file names to file paths
    const fileMappings = {
      "SGI_G3_3.1_INSTRUM_DIDAC_PLANES_2015_2022": "./templates/SGI_G3_3.1_INSTRUM_DIDAC_PLANES_2015_2022.pdf",
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
  