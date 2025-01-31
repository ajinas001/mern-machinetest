import Distribution from "../models/Distribute.js";

export const saveDistributedData = async (req, res) => {
  try {
    const { distributedData } = req.body;

    // Check if the distributedData is an array
    if (!distributedData || !Array.isArray(distributedData)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    // Loop through each item in the distributedData and check if it already exists
    for (const item of distributedData) {
      const existingData = await Distribution.findOne({
        'agent.name': item.agent.name,
        'agent.email': item.agent.email,
        'agent.mobile': item.agent.mobile,
        'data': item.data,
      });

      // If any data already exists for the same agent and data, skip saving
      if (existingData) {
        return res.status(200).json({ success: false, message: "Duplicate data found for the same agent" });
      }
    }

    // If no duplicates, insert the new data
    const savedData = await Distribution.insertMany(distributedData);
    return res.status(201).json({ success: true, message: "Data saved successfully", data: savedData });

  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// Fetch all distributed data
export const getDistributedData = async (req, res) => {
  try {
    const data = await Distribution.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
