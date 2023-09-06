import { spawn } from "node:child_process";
export const execPayload = (scriptToRun: any) => {
  if (scriptToRun.exec !== undefined) {
    let execArray = scriptToRun.exec.split(" ");
    const command = execArray.shift();
    if (!command) {
      process.exit(0);
    }
    spawn(command, execArray, {
      stdio: "inherit",
      shell: true,
    });
  } else {
    spawn("npm.cmd", ["run", scriptToRun.script], {
      stdio: "inherit",
    });
  }
};
