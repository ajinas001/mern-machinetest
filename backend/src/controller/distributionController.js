import Distribution from "../models/Distribute.js";

export const saveDistributedData = async (req, res) => {
  try {
    const { distributedData } = req.body;

   
    if (!distributedData || !Array.isArray(distributedData)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const results = [];
    let changesMade = false; 

    for (const item of distributedData) {
      const { agent, data } = item;

      
      const existingRecord = await Distribution.findOne({
        'agent.name': agent.name,
        'agent.email': agent.email,
        'agent.mobile': agent.mobile,
      });

      if (existingRecord) {
        
        const newData = data.filter(d => !existingRecord.data.includes(d));

        if (newData.length === 0) {
         
          results.push({
            message: `All data for agent ${agent.name} is already distributed.`,
            agent,
            data: existingRecord.data,
            updated: false,
          });
        } else {
          
          const updatedRecord = await Distribution.findOneAndUpdate(
            {
              'agent.name': agent.name,
              'agent.email': agent.email,
              'agent.mobile': agent.mobile,
            },
            {
              $addToSet: { data: { $each: newData } }, // Adds only the new data
            },
            { new: true }
          );

          results.push({
            message: `Data for agent ${agent.name} updated successfully.`,
            agent,
            data: updatedRecord.data,
            updated: true,
          });
          changesMade = true; // Changes were made
        }
      } else {
       
        const newRecord = new Distribution(item);
        const savedRecord = await newRecord.save();
        results.push({
          message: `New data for agent ${agent.name} saved successfully.`,
          agent,
          data: savedRecord.data,
          updated: false,
        });
        changesMade = true; 
      }
    }

    if (!changesMade) {
      return res.status(400).json({
        success: true,
        message: "Same data already distributed. No new data or updates were made.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Data processed successfully",
      data: results,
    });
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
