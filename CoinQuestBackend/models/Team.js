const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team name is required"],
    trim: true,
    maxlength: [100, "Team name cannot exceed 100 characters"],
    unique: true
  },
  description: {
    type: String,
    default: "",
    maxlength: [500, "Description cannot exceed 500 characters"],
    trim: true
  },
  avatar: {
    type: String,
    default: "",
    validate: {
      validator: function(v) {
        if (!v) return true; 
        return /^https?:\/\/.+/.test(v);
      },
      message: "Avatar must be a valid URL"
    }
  },
  votes: {
    type: Number,
    default: 0,
    min: [0, "Votes cannot be negative"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: "general",
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true 
});

teamSchema.index({ votes: -1 }); 
teamSchema.index({ name: 1 }); 
teamSchema.index({ isActive: 1 }); 

teamSchema.virtual('votePercentage').get(function() {
  return this.votes;
});

teamSchema.statics.getLeaderboard = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ votes: -1 })
    .limit(limit)
    .select('name description avatar votes');
};

teamSchema.statics.getTotalVotes = async function() {
  const result = await this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, totalVotes: { $sum: '$votes' } } }
  ]);
  return result.length > 0 ? result[0].totalVotes : 0;
};

teamSchema.methods.incrementVote = async function() {
  this.votes += 1;
  return await this.save();
};

teamSchema.methods.decrementVote = async function() {
  if (this.votes > 0) {
    this.votes -= 1;
  }
  return await this.save();
};

teamSchema.pre('save', function(next) {
  if (this.votes < 0) {
    this.votes = 0;
  }
  next();
});

module.exports = mongoose.model("Team", teamSchema);