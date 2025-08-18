import { PrismaClient, ValueType } from "../src/generated/prisma";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const hashedPassword = crypto.createHash("sha256").update("root").digest("hex");

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
      surname: "User",
    },
  });

  const thing1 = await prisma.thing.create({
    data: {
      title: "Smart Home System",
      description: "IoT system for monitoring home environment",
      userId: adminUser.id,
      topics: {
        create: [
          {
            title: "Living Room Environment",
            subject: "Environmental Monitoring",
            location: "Living Room",
            description: "Temperature and humidity monitoring in living room",
            sensors: {
              create: [
                {
                  value_type: ValueType.Analog,
                  unit: "°C",
                  flip_value: false,
                  model: "DHT22",
                  observations: {
                    create: [
                      { value: 22.5, created_at: new Date("2025-08-15T10:00:00Z") },
                      { value: 23.1, created_at: new Date("2025-08-15T11:00:00Z") },
                      { value: 22.8, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 24.2, created_at: new Date("2025-08-15T13:00:00Z") },
                      { value: 23.7, created_at: new Date("2025-08-15T14:00:00Z") },
                    ],
                  },
                },
                {
                  value_type: ValueType.Analog,
                  unit: "%RH",
                  flip_value: false,
                  model: "DHT22",
                  observations: {
                    create: [
                      { value: 45.2, created_at: new Date("2025-08-15T10:00:00Z") },
                      { value: 46.8, created_at: new Date("2025-08-15T11:00:00Z") },
                      { value: 44.1, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 47.3, created_at: new Date("2025-08-15T13:00:00Z") },
                      { value: 45.9, created_at: new Date("2025-08-15T14:00:00Z") },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Kitchen Security",
            subject: "Motion Detection",
            location: "Kitchen",
            description: "Motion and door sensors for kitchen security",
            sensors: {
              create: [
                {
                  value_type: ValueType.Digital,
                  unit: "boolean",
                  flip_value: false,
                  model: "PIR-HC-SR501",
                  observations: {
                    create: [
                      { value: 0, created_at: new Date("2025-08-15T08:00:00Z") },
                      { value: 1, created_at: new Date("2025-08-15T08:30:00Z") },
                      { value: 0, created_at: new Date("2025-08-15T09:00:00Z") },
                      { value: 1, created_at: new Date("2025-08-15T12:15:00Z") },
                      { value: 0, created_at: new Date("2025-08-15T12:45:00Z") },
                    ],
                  },
                },
                {
                  value_type: ValueType.Digital,
                  unit: "boolean",
                  flip_value: true,
                  model: "Reed-Switch-MC-38",
                  observations: {
                    create: [
                      { value: 1, created_at: new Date("2025-08-15T08:00:00Z") },
                      { value: 0, created_at: new Date("2025-08-15T08:05:00Z") },
                      { value: 1, created_at: new Date("2025-08-15T08:10:00Z") },
                      { value: 0, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 1, created_at: new Date("2025-08-15T12:05:00Z") },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const thing2 = await prisma.thing.create({
    data: {
      title: "Greenhouse Monitoring",
      description: "Agricultural IoT system for greenhouse management",
      userId: adminUser.id,
      topics: {
        create: [
          {
            title: "Soil Conditions",
            subject: "Soil Monitoring",
            location: "Greenhouse Section A",
            description: "Monitoring soil moisture and pH levels",
            sensors: {
              create: [
                {
                  value_type: ValueType.Analog,
                  unit: "%",
                  flip_value: false,
                  model: "Capacitive-Soil-Moisture",
                  observations: {
                    create: [
                      { value: 65.4, created_at: new Date("2025-08-15T06:00:00Z") },
                      { value: 63.2, created_at: new Date("2025-08-15T09:00:00Z") },
                      { value: 61.8, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 59.7, created_at: new Date("2025-08-15T15:00:00Z") },
                      { value: 62.1, created_at: new Date("2025-08-15T18:00:00Z") },
                    ],
                  },
                },
                {
                  value_type: ValueType.Analog,
                  unit: "pH",
                  flip_value: false,
                  model: "pH-Sensor-SEN0161",
                  observations: {
                    create: [
                      { value: 6.8, created_at: new Date("2025-08-15T06:00:00Z") },
                      { value: 6.7, created_at: new Date("2025-08-15T09:00:00Z") },
                      { value: 6.9, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 7.0, created_at: new Date("2025-08-15T15:00:00Z") },
                      { value: 6.8, created_at: new Date("2025-08-15T18:00:00Z") },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Climate Control",
            subject: "Environmental Control",
            location: "Greenhouse Main Area",
            description: "Temperature and ventilation control system",
            sensors: {
              create: [
                {
                  value_type: ValueType.Analog,
                  unit: "°C",
                  flip_value: false,
                  model: "DS18B20",
                  observations: {
                    create: [
                      { value: 26.3, created_at: new Date("2025-08-15T06:00:00Z") },
                      { value: 28.7, created_at: new Date("2025-08-15T09:00:00Z") },
                      { value: 31.2, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 29.8, created_at: new Date("2025-08-15T15:00:00Z") },
                      { value: 27.5, created_at: new Date("2025-08-15T18:00:00Z") },
                    ],
                  },
                },
                {
                  value_type: ValueType.Digital,
                  unit: "boolean",
                  flip_value: false,
                  model: "Ventilation-Fan-Relay",
                  observations: {
                    create: [
                      { value: 0, created_at: new Date("2025-08-15T06:00:00Z") },
                      { value: 0, created_at: new Date("2025-08-15T09:00:00Z") },
                      { value: 1, created_at: new Date("2025-08-15T12:00:00Z") },
                      { value: 1, created_at: new Date("2025-08-15T15:00:00Z") },
                      { value: 0, created_at: new Date("2025-08-15T18:00:00Z") },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeding finished.");
  console.log("Created:", { adminUser, thing1, thing2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
