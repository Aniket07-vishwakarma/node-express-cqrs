const userModel = require("../models/user.model");
const { Kafka, logLevel } = require("kafkajs");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const userResponse = await userModel.findById({ id });
    res.status(200).json({
      user: userResponse,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, gender, age, country } = req.body;

    const userInfo = await userModel.find({ name });
    console.log({ userInfo });

    if (userInfo.length) {
      res.status(409).json({ ...userInfo, msg: "User already available." });
    } else {
      const kafka = new Kafka({
        logLevel: logLevel.DEBUG,
        clientId: "my-app",
        brokers: ["localhost:9092"],
        // brokers: ["kafka1:9092", "kafka2:9092"],
      });

      const producer = await kafka.producer();
      await producer.connect();

      const newUser = new userModel({ name, gender, age, country });
      const response = await newUser.save();

      await producer.send({
        topic: "item-events",
        messages: [
          {
            value: JSON.stringify({
              message: "new user has been created!!",
              user: { name, gender, age, country },
            }),
          },
        ],
      });

      await producer.disconnect();

      const consumer = await kafka.consumer({ groupId: "test-group" });
      await consumer.connect();
      await consumer.subscribe({ topic: "item-events", fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: JSON.parse(message.value.toString()),
          });
        },
      });

      await consumer.disconnect();

      res.status(200).json({
        msg: "New User Created!",
        user: response,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserById,
  createUser,
};
