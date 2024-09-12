import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY || "";
const machine = process.env.MACHINE || "";
const project = process.env.PROJECT || "";
const branch = process.env.BRANCH || "";
const language = process.env.LANGUAGE || "";
const entity = process.env.FILE_PATH || "";
const cursor = toNumber(process.env.CURSOR);
const lines = toNumber(process.env.LINES);
const plugin = process.env.PLUGIN || "";
const interval = toNumber(process.env.INTERVAL);

const workMin = toNumber(process.env.WORK_MIN);
const workMax = toNumber(process.env.WORK_MAX);
const pauseMin = toNumber(process.env.PAUSE_MIN);
const pauseMax = toNumber(process.env.PAUSE_MAX);

function toNumber(value: string | undefined): number {
  return value !== undefined && !isNaN(+value) ? +value : 0;
}

async function sendFakeHeartbeat() {
  const fakeData = {
    project: project,
    branch: branch,
    language: language,
    type: "file",
    entity: entity,
    time: Date.now() / 1000,
    lineno: cursor,
    cursorpos: cursor,
    lines: lines,
    is_write: true,
    plugin: plugin,
  };

  await axios
    .post("https://wakatime.com/api/v1/users/current/heartbeats", fakeData, {
      headers: {
        Authorization: `Basic ${btoa(apiKey + ":")}`,
        "Content-Type": "application/json",
        "X-Machine-Name": machine,
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log("Fake heartbeat sent successfully");
      } else {
        throw new Error(`HTTP error! ${response}`);
      }
    })
    .catch((error) => {
      console.error("Error sending fake heartbeat:", error);
    });
}

function startSending() {
  let send = true;
  let iteral = 1;
  let count = random(workMin, workMax);

  sendFakeHeartbeat();
  setInterval(() => {
    if (send) {
      sendFakeHeartbeat();
    }

    console.log(iteral + "/" + count, send ? "working" : "pause");

    iteral++;

    if (iteral >= count) {
      send = !send;
      if (send) {
        iteral = 1;
        count = random(workMin, workMax);
      } else {
        iteral = 1;
        count = random(pauseMin, pauseMax);
      }
    }
  }, interval);
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * max) + min;
}

startSending();
