import Maintenance from "../models/Maintenance.js";

// Simple reminder checker (hackathon version)
export const checkUpcomingMaintenance = async () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcoming = await Maintenance.find({
    nextDueDate: { $gte: today, $lte: nextWeek }
  });

  upcoming.forEach(record => {
    console.log(
      `Reminder: Maintenance due soon for asset ${record.assetId}`
    );
  });
};
