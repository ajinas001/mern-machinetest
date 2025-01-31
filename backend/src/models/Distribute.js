import mongoose from "mongoose";

const DistributionSchema = new mongoose.Schema({
  agent: {
    name: String,
    email: String,
    mobile: String,
  },
  data: [
    {
      type: mongoose.Schema.Types.Mixed, 
    },
  ],
});

const Distribution = mongoose.model("Distribution", DistributionSchema);
export default Distribution;
