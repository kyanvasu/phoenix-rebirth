import { NextRequest, NextResponse } from "next/server";
import { Worker } from "node:worker_threads";

const THREAD_TIMEOUT = 60 * 1000; // 60 seconds

async function Thread({
  execute,
  workerData,
}: {
  execute: string;
  workerData: any;
}) {
  return new Promise((resolve) => {
    const baseline = (fn: string) => `
      const { parentPort, workerData } = require('node:worker_threads');

      const FN = ${fn};

      FN(parentPort, workerData)
        .then((data) => parentPort.postMessage(data))
        .catch((err) => console.log('Thread error: ', error));`;

    const worker = new Worker(baseline(atob(execute)), {
      workerData: JSON.parse(atob(workerData)),
      eval: true,
    });

    worker.addListener("message", (msg) => resolve(msg));

    // kill thread after 60 seconds
    setTimeout(async () => await worker.terminate(), THREAD_TIMEOUT);
  });
}

export async function POST(request: NextRequest) {
  try {
    const { execute, workerData } = await request.json();

    const response = await Thread({ execute, workerData });

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing application",
      },
      { status: 500 },
    );
  }
}
