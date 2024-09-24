const { Schema, model } = require("mongoose");
const moment = require("moment");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      default: Date.now(),
      set: function (Date) {
        return moment(Date, "DD/MM/YYYY", true).toDate();
      },
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Todo", todoSchema);







// {
//   "title": "Complete React Project",
//   "description": "Finish building the React CRUD app with basic styling and deploy it.",
//   "status": "ongoing",
//   "dueDate": "25/09/2024",
//   "createdBy": "64e85df7c7f1a8b6d81b0b2c",
//   "createdAt": "2024-09-15T08:42:34.947Z",
//   "updatedAt": "2024-09-20T10:15:45.203Z"
// }
