import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Team from "../models/team.js";
import Equipment from "../models/equipment.js";
import Request from "../models/request.js";
import User from "../models/user.js";

dotenv.config();

async function seed() {
  await connectDB();

  // Avoid seeding if data exists
  const teamCount = await Team.countDocuments();
  if (teamCount > 0) {
    console.log("Seed skipped: teams already present");
    process.exit(0);
  }

  // Create sample users
  const alice = await User.create({ name: "Alice", email: "alice@example.com", password: "pass" });
  const bob = await User.create({ name: "Bob", email: "bob@example.com", password: "pass" });

  // Create teams
  const mech = await Team.create({ name: "Mechanics", members: [alice._id] });
  const it = await Team.create({ name: "IT Support", members: [bob._id] });

  // Create equipment
  const eq1 = await Equipment.create({ name: "CNC Machine 01", serialNumber: "CNC-001", category: "CNC", department: "Production", ownerName: "John", purchaseDate: new Date("2020-05-20"), warrantyInfo: "3 years", location: "Factory Floor", maintenanceTeam: mech._id });

  const eq2 = await Equipment.create({ name: "Laptop 123", serialNumber: "LT-123", category: "Laptop", department: "Engineering", ownerName: "Sara", purchaseDate: new Date("2022-02-10"), warrantyInfo: "1 year", location: "Office 3", maintenanceTeam: it._id });

  // Create requests
  await Request.create({ subject: "Leaking oil", equipmentId: eq1._id, type: "Corrective", status: "New", createdBy: alice._id });

  await Request.create({ subject: "Routine checkup", equipmentId: eq1._id, type: "Preventive", status: "New", scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), createdBy: bob._id });

  console.log("Seeding complete");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
